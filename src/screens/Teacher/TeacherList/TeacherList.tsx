import React from "react";
import Container from "../../../components/Container/Container";
import { FAB } from "../../../components/Button/FAB/FAB";
import { navigate } from "../../../service/NavigationService";
import { useGetAllData } from "../../../hooks/useGetAllData";
import { ITeacher } from "../../../interfaces/ITeacher";
import { getAllTeachers, removeTeacher } from "../../../service/teacherService";
import Loading from "../../../components/Loading/Loading";
import { List } from "../../../components/List/List";
import ListItemTitle from "../../../components/List/ListItemTitle/ListItemTitle";
import ListItemLabel from "../../../components/List/ListItemLabel/ListItemLabel";
import { useDeleteData } from "../../../hooks/useDeleteData";

export default function TeacherList() {
  const { data, isError, isLoading } = useGetAllData<ITeacher>({ queryKeyName: 'teachers', fetchFn: getAllTeachers })
  const { mutate: deleteMutate } = useDeleteData('teachers', removeTeacher);

  if (isLoading) return <Loading />;

  return (
    <Container>
      <List<ITeacher>
        data={data || []}
        renderContent={(item: ITeacher) => (
          <>
            <ListItemTitle
              title={item.name}
            />
            <ListItemLabel
              label={item.cref}
            />
          </>
        )}
        onDeleteItem={(item: ITeacher) => deleteMutate(item.id)}
        onEditItem={(item: ITeacher) => navigate('TeacherForm', { data: item })}
        onViewItem={(item: ITeacher) => navigate('TeacherDetail', { id: item.id })}
      />

      <FAB
        onPressButton={() => navigate('TeacherForm')}
      />
    </Container>
  );
}
