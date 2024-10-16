import { UnthreadClient, type UnthreadClientOptions } from "@unthread-io/node";
import { exists } from "@std/fs";
import * as esbuild from "esbuild";

export async function deployAutomationFunctions(
  pathToFile: string,
  options: UnthreadClientOptions,
): Promise<any> {
  // check if file or directory exists
  const fileExists = await exists(pathToFile);

  if (!fileExists) {
    console.error(`File "${pathToFile}" does not exist`);
    Deno.exit(1);
  }

  // check if file is a directory
  const fileInfo = await Deno.stat(pathToFile);

  if (fileInfo.isDirectory) {
    console.error(`File "${pathToFile}" is a directory`);
    Deno.exit(1);
  }

  // Use esbuild to bundle the code in the file or directory
  const bundle = await esbuild.build({
    entryPoints: [pathToFile],
    bundle: true,
    minify: false,
    format: "esm",
    packages: "external",
    write: false,
  });

  const unthreadClient = new UnthreadClient(options);

  try {
    const deployResult = await unthreadClient.automations.functions
      .deployNewVersion({
        code: bundle.outputFiles[0].text,
      });

    console.log(
      `Deployed automation functions version ${deployResult.version}`,
    );

    Deno.exit(0);
  } catch (error) {
    console.error(`Failed to deploy automation functions: ${error}`);

    Deno.exit(1);
  }
}
