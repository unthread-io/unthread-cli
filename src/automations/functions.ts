import { UnthreadClient, type UnthreadClientOptions } from "@unthread-io/node";
import fs from "node:fs";
import esbuild from "esbuild";
import process from "node:process";

export async function deployAutomationFunctions(pathToFile: string, options: UnthreadClientOptions): Promise<any> {
  // check if file or directory exists
  const fileExists = fs.existsSync(pathToFile);

  if (!fileExists) {
    console.error(`File "${pathToFile}" does not exist`);
    process.exit(1);
  }

  // check if file is a directory
  const isDirectory = fs.statSync(pathToFile).isDirectory();

  if (isDirectory) {
    console.error(`File "${pathToFile}" is a directory`);
    process.exit(1);
  }

  // Use esbuild to bundle the code in the file or directory
  const bundle = await esbuild.build({
    entryPoints: [pathToFile],
    bundle: true,
    minify: false,
    format: "esm",
    packages: "external",
    write: false
  });

  const unthreadClient = new UnthreadClient(options);

  // First create a new draft
  const result1 = await unthreadClient.post('/automations/functions', {
    code: bundle.outputFiles[0].text,
  });

  if (!result1.ok) {
    if (result1.status === 401) {
      console.error(`Unauthorized: Make sure your API key is valid`);
      process.exit(1);
    }

    const body = await result1.text();

    console.error(`Failed to deploy automation functions: ${body}`);
    process.exit(1);
  }

  const data1 = await result1.json();
  const newVersion = data1.version;

  // Activate the new version
  const result2 = await unthreadClient.post(`/automations/functions/${newVersion}/activate`);

  if (!result2.ok) {
    console.error(`Failed to activate automation functions version ${newVersion}`);
    process.exit(1);
  }

  console.log(`Deployed automation functions version ${newVersion}`);
}
