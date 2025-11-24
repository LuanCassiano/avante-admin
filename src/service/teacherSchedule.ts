import firestore from '@react-native-firebase/firestore';
import { IClassSchedule } from '../interfaces/IClass';

export async function fetchUnavailableSchedulesForTeacher(teacherId: string, localId: string) {
  try {
    const snapshot = await firestore()
      .collection('classes')
      .where('teacherId', '==', teacherId)
      .where('localId', '==', localId)
      .get()

    const schedules: IClassSchedule[] = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        day: data.day,
        startTime: data.startTime,
        endTime: data.endTime
      }
    });

    console.log('data', schedules);

    return schedules
  } catch (error) {
    console.log('Error to return schedules:', error);
  }
}