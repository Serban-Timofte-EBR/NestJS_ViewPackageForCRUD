import * as fs from "fs-extra";
import * as path from "path";

export async function generateFrontend(modelName: string, fields: string[]) {
  const frontendFolder = path.join(process.cwd(), "generatedUI", modelName);
  await fs.ensureDir(frontendFolder);

  const templatesPath = path.join(__dirname, "../templates/frontend");
  const files = ["Table.jsx", "Form.jsx"];

  for (const file of files) {
    const template = await fs.readFile(path.join(templatesPath, file), "utf-8");
    const content = template
      .replace(/__MODEL__/g, modelName)
      .replace(/__FIELDS__/g, fields.join(", "));
    await fs.outputFile(path.join(frontendFolder, file), content);
  }
}
