import * as fs from "fs-extra";
import * as path from "path";
import { parseModel } from "./parseModel";

export async function generateResource(modelPath: string, modelName: string) {
  const { fields } = parseModel(modelPath);
  console.log(`Model Fields: ${fields.join(", ")}`);

  const backendFolder = path.join(process.cwd(), "src", modelName);
  await fs.ensureDir(backendFolder);

  const templatesPath = path.join(__dirname, "../templates/backend");
  const files = ["controller.ts", "service.ts", "module.ts", "dto.ts"];

  for (const file of files) {
    const template = await fs.readFile(path.join(templatesPath, file), "utf-8");
    const content = template
      .replace(/__MODEL__/g, modelName)
      .replace(/__FIELDS__/g, fields.join(", "));
    await fs.outputFile(
      path.join(backendFolder, file.replace(".ts", `.${modelName}.ts`)),
      content
    );
  }
}
