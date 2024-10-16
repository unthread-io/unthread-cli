export async function Counter_test_1_0({ unthreadClient, input }: any) {
  console.log(input)

  const transaction = await unthreadClient.automations.stores.transaction('test_1');

  await transaction.setValue('key1', 'value1');
  await transaction.setValue('key2', 'value2');

  await transaction.commit();

  console.log(await unthreadClient.automations.stores.getValue('test_1', 'key1'));
}
