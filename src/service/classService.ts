import firestore from '@react-native-firebase/firestore';
import { IClass, IClassResponse } from "../interfaces/IClass";
import { resolveFieldNames } from '../utils/resolveFieldNames';

export async function addClass(data: IClass): Promise<IClass> {
  if (!data) throw new Error('Erro ao tentar criar item');

  try {
    await firestore()
      .collection('classes')
      .add({
        ...data,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

    return data;
  } catch (error) {
    console.log('Error adding class:', error);
    return {} as IClass;
  }
}

export async function getAllClasses(): Promise<IClassResponse[]> {
  try {
    const snapshot = await firestore()
      .collection('classes')
      .orderBy('createdAt', 'desc')
      .get();

    const classesRaw = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as IClass [];

    const [localMap, teacherMap] = await Promise.all([
      resolveFieldNames(classesRaw, 'localId', 'headOffices'),
      resolveFieldNames(classesRaw, 'teacherId', 'teachers')
    ])


    const classesWithNames: IClassResponse[] = classesRaw.map(cls => ({
      ...cls,
      localName: localMap.get(cls.localId) || '',
      teacherName: teacherMap.get(cls.teacherId) || '',
    }));

    return classesWithNames;
  } catch (error) {
    console.log('Error getting classes:', error);
    return [];
  }
}

export async function getClassById(id: string): Promise<IClass> {
  if (!id) throw new Error('Erro ao tentar buscar item');

  try {
    const doc = await firestore()
      .collection('classes')
      .doc(id)
      .get();

    return { id: doc.id, ...doc.data() } as IClass;
  } catch (error) {
    console.log('Error getting class by ID:', error);
    return {} as IClass;
  }
}

export async function updateClass(id: string, data: Partial<IClass>): Promise<IClass> {
  if (!id) throw new Error('Erro ao tentar atualizar item');

  try {
    await firestore()
      .collection('classes')
      .doc(id)
      .update({
        ...data,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });

    return { id, ...data } as IClass;
  } catch (error) {
    console.log('Error updating class:', error);
    return {} as IClass;
  }
}

export async function deleteClass(id: string): Promise<void> {
  if (!id) throw new Error('Erro ao tentar deletar item');

  try {
    await firestore()
      .collection('classes')
      .doc(id)
      .delete();
  } catch (error) {
    console.log('Error deleting class:', error);
  }
}
