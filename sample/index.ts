export async function Send_conversations_to_JIRA_0(options) {
    async function main({
      input,
      unthreadApiClient
    }: any) {
      const {
        conversation: {
          id,
          title,
          initialMessage: {
            text
          }
        }
      } = input;

      const externalTaskRes = await unthreadApiClient.post(`/conversations/${id}/external-tasks`, {
        title: title,
        description: text,
        projectId: '10000',
        providerConfig: {
          jiraIssueTypeName: 'Task'
        }
      });
      const externalTask = await externalTaskRes.json();

      if (!externalTaskRes.ok) {
        throw new Error(`Failed to create issue, status: ${externalTaskRes.status}, response: ${JSON.stringify(externalTask ?? {})}`);
      }

      console.log(`Created issue`, externalTask);
    }

    return await main(options);
  }

export { Counter_test_1_0 } from './counter-test.ts';

  export async function Conversation_custom_fields_test_0(options) {
    async function getCustomFieldsByName(unthreadApiClient, conversation) {
        if (!conversation.ticketTypeId) {
            return {};
        }

        const ticketTypeRes = await unthreadApiClient.get(`/ticket-types/${conversation.ticketTypeId}`);
        const ticketType = await ticketTypeRes.json();

        return (ticketType.fields ?? []).reduce((acc, field) => {
            acc[field.name] = (conversation.ticketTypeFields ?? {})[field.id];

            return acc;
        }, {});
    }

    async function main({ input, unthreadApiClient, state, secrets }) {
        const customFields = await getCustomFieldsByName(unthreadApiClient, input.conversation);

        console.log(customFields);
    }

    return await main(options);
  }

  export async function Manual_input_test_0(options) {
    async function main({ input, unthreadApiClient, state, secrets }) {
        console.log(input)
    }

    return await main(options);
  }

  export async function Trigger_Test_0(options) {
    async function main({ input, unthreadClient, state, secrets }) {
        console.log(new Date().toISOString())

        await new Promise<void>((resolve) => {
            setTimeout(() => resolve(), 1000 * 10);
        });

        console.log(new Date().toISOString())
    }

    return await main(options);
  }
