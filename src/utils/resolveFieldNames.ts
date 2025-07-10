import firestore from '@react-native-firebase/firestore';

export async function resolveFieldNames<T extends { [key: string]: any }>(
  items: T[],
  field: keyof T,
  collectionName: string,
  nameField: string = 'name'
): Promise<Map<string, string>> {
  const ids = [...new Set(items.map(item => item[field]).filter(Boolean))];

  const docs = await Promise.all(
    ids.map(id => firestore().collection(collectionName).doc(id).get())
  );

  const result = new Map<string, string>();
  docs.forEach(doc => {
    return result.set(doc.id, doc.data()?.[nameField] || '');
  });

  return result;
}