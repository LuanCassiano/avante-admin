import firestore from '@react-native-firebase/firestore';
import { IHeadOffice } from '../interfaces/IHeadOffice';

export async function addHeadOfficeService(data: IHeadOffice): Promise<IHeadOffice> {
  try {
    await firestore().collection('headOffices').add({
      ...data,
      createdAt: firestore.FieldValue.serverTimestamp(),
    })

    return data;
  } catch (error) {
    console.log('Error adding head office:', error);
    return {} as IHeadOffice;
  }
}

export const getAllHeadOfficesService = async () => {
  try {
    const snapshot = await firestore()
      .collection('headOffices')
      .orderBy('createdAt', 'desc')
      .get();
    const headOffices: IHeadOffice[] = [];
    snapshot.forEach(doc => {
      const data = doc.data(); 
      headOffices.push({ id: doc.id, ...data } as IHeadOffice);
    });
    return headOffices;
  } catch (error) {
    console.log('Error getting head offices:', error);
    return [];
  }
}

export const getHeadOfficeByIdService = async (id: string) => {
  try {
    const doc = await firestore()
      .collection('headOffices')
      .doc(id)
      .get();

      return { id: doc.id, ...doc.data() } as IHeadOffice;
  } catch (error) {
    console.log('Error getting head office by ID:', error);
    return null;
  }
}

export const updateHeadOffice = async (id: string, data: IHeadOffice): Promise<IHeadOffice> => {
  if (!id) throw new Error('Erro ao tentar editar item');

  try {
    await firestore()
      .collection('headOffices')
      .doc(id)
      .update({
        ...data,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });

      return data;
  } catch (error) {
    console.log('Error getting head office by ID:', error);
    return { } as IHeadOffice;
  }
}

export const removeHeadOfficeService = async (id: string): Promise<void> => {
  try {
    await firestore()
      .collection('headOffices')
      .doc(id)
      .delete()
  } catch (error) {
    console.log('Error delete head officE', error);
  }
}
