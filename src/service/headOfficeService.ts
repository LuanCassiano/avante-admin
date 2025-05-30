import firestore from '@react-native-firebase/firestore';
import { IHeadOffice } from '../interfaces/IHeadOffice';

export async function addHeadOfficeService(data: IHeadOffice): Promise<IHeadOffice> {
  try {
    await firestore().collection('headOffices').add(data)

    return data;
  } catch (error) {
    console.log('Error adding head office:', error);
    return {} as IHeadOffice;
  }
}

export const getAllHeadOfficesService = async () => {
  try {
    const snapshot = await firestore().collection('headOffices').get();
    const headOffices: IHeadOffice[] = [];
    snapshot.forEach(doc => {
      headOffices.push({ ...doc.data() } as IHeadOffice);
    });
    return headOffices;
  } catch (error) {
    console.log('Error getting head offices:', error);
    return [];
  }
}
