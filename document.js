import { yamlParse } from "https://esm.sh/yaml-cfn@^0.3.1";
import { expandGlob } from "https://deno.land/std@0.159.0/fs/mod.ts";

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
      const contents = Object.entries(parameter)
        .map(([property, value]) => `${property}: ${value}`)
        .join("  \n");

      type.push(`### ${name}`);
      type.push(contents);
    }

    lines.push("## Required Parameters");
    requiredParameters.forEach((p) => lines.push(p));

    lines.push("## Optional Parameters");
    optionalParameters.forEach((p) => lines.push(p));

    lines.push("## Resources");
    for (const name in Resources) {
      const resource = Resources[name];
      delete resource.Properties;
      const contents = Object.entries(resource)
        .map(([property, value]) => `${property}: ${value}`)
        .join("  \n");

      lines.push(`### ${name}`);
      lines.push(contents);
    }

    if (Outputs) {
      lines.push("## Outputs");
      const outputs = Object.entries(Outputs)
        .map(([name, output]) => `- ${name}${output.Condition ? "?" : ""}`)
        .join("\n");
      lines.push(outputs);
    }

    return lines.join("\n\n");
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
