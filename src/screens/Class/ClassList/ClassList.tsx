import { Text, View } from "react-native";
import Container from "../../../components/Container/Container";
import { FAB } from "../../../components/Button/FAB/FAB";
import { navigate } from "../../../service/NavigationService";
import { useGetAllData } from "../../../hooks/useGetAllData";
import { IClassResponse } from "../../../interfaces/IClass";
import { getAllClasses } from "../../../service/classService";
import Loading from "../../../components/Loading/Loading";
import { List } from "../../../components/List/List";
import ListItemTitle from "../../../components/List/ListItemTitle/ListItemTitle";
import ListItemLabel from "../../../components/List/ListItemLabel/ListItemLabel";
import { Colors } from "../../../global/Colors";

export default function ClassList() {
  const { data, isLoading } = useGetAllData<IClassResponse>({ queryKeyName: 'classes', fetchFn: getAllClasses });

  if (isLoading) return <Loading />

  console.log('data', data);

  return (
    <Container>
      <List<IClassResponse>
        data={data || []}
        renderContent={(item: IClassResponse) => (
          <>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: Colors.PRIMARY, fontWeight: 'bold' }}>Turma: </Text>
              <ListItemLabel label={item.name}/>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: Colors.PRIMARY, fontWeight: 'bold' }}>Local: </Text>
              <ListItemLabel label={item.localName}/>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: Colors.PRIMARY, fontWeight: 'bold' }}>Horário: </Text>
              <ListItemLabel label={item.day} />
              <Text style={{ color: Colors.SECONDARY }}> das </Text>
              <ListItemLabel label={item.startTime} />
              <Text style={{ color: Colors.SECONDARY }}> às </Text>
              <ListItemLabel label={item.endTime} />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: Colors.PRIMARY, fontWeight: 'bold' }}>Professor: </Text>
              <ListItemLabel label={item.teacherName}/>
            </View>
          </>
        )}
        onDeleteItem={() => {}}
        onEditItem={() => {}}
        onViewItem={() => {}}
      />
      <FAB
        onPressButton={() => navigate('ClassForm')}
      />
    </Container>
  )
}