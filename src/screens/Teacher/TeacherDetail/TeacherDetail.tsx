import { Text, View } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";

import { GlobalParamList } from "../../../routes/types";

import { useGetDataById } from "../../../hooks/useGetDataById";

import Loading from "../../../components/Loading/Loading";
import { getTeacherById } from "../../../service/teacherService";
import { ITeacher } from "../../../interfaces/ITeacher";

type TeacherDetailRouteProp = RouteProp<GlobalParamList, "TeacherDetail">;

export default function TeacherDetail() {
  const { params: { id } } = useRoute<TeacherDetailRouteProp>();

  const { data, isLoading } = useGetDataById<ITeacher>({ id, queryKeyName: 'teachers', fetchFn: getTeacherById });
  
  if (isLoading) return <Loading />;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>{data?.name}</Text>
    </View>
  );
}

