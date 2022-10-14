import { yamlParse } from "https://esm.sh/yaml-cfn@^0.3.1";
import { expandGlob } from "https://deno.land/std@0.159.0/fs/mod.ts";

const quote = (str) => `"${str}"`;

const list = (items, indent = 0) =>
  items
    .map((item) => `${" ".repeat(indent)}- ${item}`)
    .join("\n");

const defineProperties = (props) => {
  let defs = Object.entries(props)
    .map(([property, value]) => {
      if (value === "") value = quote(value);
      if (property === "AllowedValues") {
        return `${property}:\n${list(value, 2)}`;
      }
      return `${property}: ${value}`;
    });
  defs = list(defs);
  return defs;
};

const generateDocs =
  ((fileName, { Description, Parameters, Resources, Outputs }) => {
    const lines = [];

    lines.push(`# ${fileName}`);
    lines.push(Description);

    const requiredParameters = [];
    const optionalParameters = [];
    for (const name in Parameters) {
      const parameter = Parameters[name];
      const type = parameter.Default === undefined
        ? requiredParameters
        : optionalParameters;
      const { Description } = parameter;
      delete parameter.Description;

      type.push(`### ${name}`);
      if (Description) type.push(Description);
      type.push(defineProperties(parameter));
    }

    lines.push("## Required Parameters");
    requiredParameters.forEach((p) => lines.push(p));

    lines.push("## Optional Parameters");
    optionalParameters.forEach((p) => lines.push(p));

    lines.push("## Resources");
    for (const name in Resources) {
      const resource = Resources[name];
      delete resource.Properties;

      lines.push(`### ${name}`);
      lines.push(defineProperties(resource));
    }

    if (Outputs) {
      lines.push("## Outputs");
      for (const name in Outputs) {
        const output = Outputs[name];
        const { Description } = output;
        delete output.Description;
        delete output.Value;

        lines.push(`### ${name}`);
        if (Description) lines.push(Description);
        lines.push(defineProperties(output));
      }
    }

    return lines.filter(Boolean).join("\n\n");
  });

try {
  await Deno.mkdir("docs");
} catch (e) {
  if (e.code !== "EEXIST") {
    throw e;
  }
}

for await (const file of expandGlob("./*.template.yaml")) {
  if (!file.isFile) continue;
  const outputPath = `./docs/${file.name.split(".")[0]}.md`;
  const template = await Deno.readTextFile(file.path).then(yamlParse);
  const docs = generateDocs(file.name, template);

  await Deno.writeTextFile(outputPath, docs);
}
