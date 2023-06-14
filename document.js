import { yamlParse } from "https://esm.sh/yaml-cfn@^0.3.1";
import { expandGlob } from "https://deno.land/std@0.159.0/fs/mod.ts";
import { generateDocs } from "https://gist.githubusercontent.com/dawaltconley/673a2e6eb7c45dde66e7ff5d84791f0a/raw/843ee718d456d010e8f99aea37ac2f9c1497875b/index.js";

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
