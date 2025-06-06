import firestore from '@react-native-firebase/firestore';
import { ITeacher } from "../interfaces/ITeacher";

export async function addTeacher(data: ITeacher): Promise<ITeacher> {
  if (!data) throw new Error('Erro ao tentar criar item');

  try {
    await firestore()
      .collection('teachers')
      .add({
        ...data,
        createdAt: firestore.FieldValue.serverTimestamp(),
      })

      return data;
  } catch (error) {
    console.log('Error adding teacher:', error);
    return {} as ITeacher;
  }
}

export async function getAllTeachers(): Promise<ITeacher[]> {
  try {
    const snapshot = await firestore()
      .collection('teachers')
      .orderBy('createdAt', 'desc')
      .get()

    const teachers: ITeacher[] = [];

    snapshot.forEach(doc => {
      const data = doc.data();
      teachers.push({ id: doc.id, ...data } as ITeacher);
    })

    return teachers;
  } catch (error) {
    console.log('Error getting teachers:', error);
    return [];
  }
}

export async function getTeacherById(id: string): Promise<ITeacher> {
  if (!id) throw new Error('Erro ao tentar buscar item');

  try {
    const doc = await firestore()
      .collection('teachers')
      .doc(id)
      .get();

    return { id: doc.id, ...doc.data() } as ITeacher;
  } catch (error) {
    console.log('Error getting teacher by ID:', error);
    return {} as ITeacher;
  }
}

export async function updateTeacher(id: string, data: ITeacher): Promise<ITeacher> {
  if (!id) throw new Error('Erro ao tentar editar item');

  try {
    await firestore()
      .collection('teachers')
      .doc(id)
      .update({
        ...data,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });

    return data;
  } catch (error) {
    console.log('Error update teacher:', error);
    return {} as ITeacher;
  }
}

export async function removeTeacher(id: string): Promise<void> {
  try {
    await firestore()
      .collection('teachers')
      .doc(id)
      .delete()
  } catch (error) {
    console.log('Error delete teacher', error);
  }
}
