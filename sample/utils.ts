import { type UnthreadClient } from "npm:@unthread-io/node";

export async function getConversationById(
  unthreadClient: UnthreadClient,
  conversationId: string,
) {
  const conversation = await unthreadClient.get(
    `/conversations/${conversationId}`,
  );

  console.log(conversation);
}
