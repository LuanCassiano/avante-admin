import { useEffect, useState } from "react";
import { IClassSchedule } from "../interfaces/IClass";
import { fetchUnavailableSchedulesForTeacher } from "../service/teacherSchedule";

export function useUnavailableSchedules(teacherId: string, localId: string) {
  const [schedules, setSchedules] = useState<IClassSchedule[] | undefined>([]);

  useEffect(() => {
    async function load() {
      if (teacherId && localId) {
        const result = await fetchUnavailableSchedulesForTeacher(teacherId, localId);
        setSchedules(result);
      }
    }

    load();
  }, [teacherId, localId]);

  return schedules;
}