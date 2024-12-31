import chalk from 'chalk';
import { Command } from 'commander';

const program = new Command();

program
  .name('nestjs-admin')
  .description('CLI to generate NestJS admin resources')
  .version('1.0.0');

program
  .command('generate <resource>')
  .description('Generate a new CRUD resource')
  .action((resource) => {
    console.log(chalk.green(`Generating resource: ${resource}`));
  });

program.parse(process.argv);