import chalk from "chalk";
import { Command } from "commander";
import { generateResource } from "./commands/generateResource";
import { generateFrontend } from "./commands/generateFrontend";
import { parseModel } from "./commands/parseModel";

const program = new Command();

program
  .name("nestjs-admin")
  .description("CLI to generate NestJS admin resources")
  .version("1.0.0");

program
  .command("generate resource from <modelPath> called <modelName>")
  .description("Generate CRUD endpoints and UI from a model")
  .action(async (modelPath, modelName) => {
    try {
      console.log(
        chalk.green(`Generating resource for ${modelName} from ${modelPath}`)
      );

      // Step 1: Parse the model to extract fields
      const { fields } = parseModel(modelPath);
      console.log(chalk.blue(`Parsed fields: ${fields.join(", ")}`));

      // Step 2: Generate backend resources
      console.log(chalk.yellow("Generating backend..."));
      await generateResource(modelPath, modelName);

      // Step 3: Generate frontend UI
      console.log(chalk.yellow("Generating frontend UI..."));
      await generateFrontend(modelName, fields);

      console.log(
        chalk.green(
          `Resource generation for ${modelName} completed successfully!`
        )
      );
    } catch (error) {
      console.error(chalk.red("Error generating resource:"), error);
    }
  });

program.parse(process.argv);
