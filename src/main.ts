#!/usr/bin/env node

import * as commander from 'commander';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

import { deployAutomationFunctions } from './automations/functions.ts';

const packageJsonPath = path.resolve(import.meta.dirname, '../deno.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const version = packageJson.version;

// Function to create colored ASCII art
function createColoredAsciiArt() {
  const asciiArt = `
 _   _       _   _                        _ _____  _     _____
| | | |     | | | |                      | /  __ \\| |   |_   _|
| | | |_ __ | |_| |__  _ __ ___  __ _  __| | /  \\/| |     | |
| | | | '_ \\| __| '_ \\| '__/ _ \\/ _\` |/ _\` | |    | |     | |
| |_| | | | | |_| | | | | |  __/ (_| | (_| | \\__/\\| |_____| |_
 \\___/|_| |_|\\__|_| |_|_|  \\___|\\__,_|\\__,_|\\____/\\_____/\\___/


`;

  // TODO: Make colors optional
  const orangeColor = '\x1b[38;5;208m';  // Orange color
  const reset = '\x1b[0m';

  return orangeColor + asciiArt + reset;
}

function addHelpCommand(program: commander.Command, includeAsciiArt: boolean = false) {
  program.command('help', { isDefault: true })
    .description('Display help information')
    .action(() => {
      if (includeAsciiArt) {
        console.log(createColoredAsciiArt());
      }

      program.outputHelp();
    });
}

function createFunctionsProgram() {
  const functionsProgram = new commander.Command();

  functionsProgram.name('functions');
  functionsProgram.description('Automation functions commands');


  addHelpCommand(functionsProgram);

  functionsProgram
    .command('deploy <entrypoint>')
    .description('Deploy a new version of the automation functions')
    .action(async (pathToFile) => {
      // Retrieve global options (API key) from the parent
      const globalOptions = functionsProgram.parent?.parent?.opts()
      const apiKey = process.env.UNTHREAD_API_KEY;
      const baseUrl = globalOptions?.baseUrl ?? process.env.UNTHREAD_API_BASE_URL;

      if (!apiKey) {
        console.error('Missing Unthread API key. Please set the UNTHREAD_API_KEY environment variable.');
        process.exit(1);
      }

      await deployAutomationFunctions(pathToFile, {
        apiKey,
        baseUrl
      });
    });

  return functionsProgram;
}

function createAutomationsProgram() {
  const automationsProgram = new commander.Command();

  automationsProgram.name('automations');
  automationsProgram.description('Automation commands');

  addHelpCommand(automationsProgram);

  automationsProgram
    .addCommand(createFunctionsProgram());

  return automationsProgram;
}

const program = new commander.Command();

// Set the name of the program to 'unthread'
program.name('unthread');

// Add global --api-key option
program
  .option('-k, --api-key <apikey>', 'Unthread API key to authenticate requests')
  .option('-b, --base-url <baseUrl>', 'Unthread API base URL');

addHelpCommand(program, true);

program
  .command('version')
  .description('Display the version of the Unthread CLI')
  .action(() => {
    console.log(`Unthread CLI version: ${version}`);
  });

// Add automations command group
program
  .addCommand(createAutomationsProgram());

program.parse(process.argv);
