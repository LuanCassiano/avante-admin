import { Text, View } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";

import { GlobalParamList } from "../../../routes/types";

import { useGetDataById } from "../../../hooks/useGetDataById";

import { getHeadOfficeByIdService } from "../../../service/headOfficeService";

import { IHeadOffice } from "../../../interfaces/IHeadOffice";

import Loading from "../../../components/Loading/Loading";

type HeadOfficeDetailRouteProp = RouteProp<GlobalParamList, "HeadOfficeDetail">;

export default function HeadOfficeDetail() {
  const { params: { id } } = useRoute<HeadOfficeDetailRouteProp>();

  const { data, isLoading } = useGetDataById<IHeadOffice>({ id, queryKeyName: 'headOffices', fetchFn: getHeadOfficeByIdService });

  if (isLoading) return <Loading />;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>{data?.name}</Text>
      <Text>{data?.address}</Text>
      <Text>{data?.addressNumber}</Text>
      <Text>{data?.city}</Text>
    </View>
  );
}

