import { type UnthreadClient } from "npm:@unthread-io/node";

import { getConversationById } from "./utils.ts";

export async function sampleAutomationFunction(
  { input, unthreadClient }: { input: any; unthreadClient: UnthreadClient },
) {
  const {
    conversation: {
      id,
    },
  } = input;

  const conversation = await getConversationById(unthreadClient, id);

  console.log(conversation);
}
