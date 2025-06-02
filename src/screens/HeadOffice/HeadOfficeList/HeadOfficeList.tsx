import React, { useEffect } from "react";

import Container from "../../../components/Container/Container";
import ListItemTitle from "../../../components/List/ListItemTitle/ListItemTitle";
import ListItemLabel from "../../../components/List/ListItemLabel/ListItemLabel";
import Loading from "../../../components/Loading/Loading";
import { FAB } from "../../../components/Button/FAB/FAB";
import { List } from "../../../components/List/List";

import { navigate } from "../../../service/NavigationService";
import { getAllHeadOfficesService, removeHeadOfficeService } from "../../../service/headOfficeService";

import { useToast } from "../../../hooks/useToast";
import { useGetAllData } from "../../../hooks/useGetAllData";

import { IHeadOffice } from "../../../interfaces/IHeadOffice";
import { useDeleteData } from "../../../hooks/useDeleteData";

export default function HeadOfficeList() {
  const { error } = useToast();

  const { data, isError, isLoading } = useGetAllData<IHeadOffice>({ queryKeyName: 'headOffices', fetchFn: getAllHeadOfficesService });
  const { mutate: deleteMutate } = useDeleteData('headOffices', removeHeadOfficeService);

  useEffect(() => {
    if (isError) {
      error('Erro ao carregar informações')
    };
  }, [isError]);
  
  if (isLoading) return <Loading />;

  return (
    <Container>
      <List<IHeadOffice>
        data={data || []}
        renderContent={(item: IHeadOffice) => (
          <>
            <ListItemTitle
              title={item.name}
            />
            <ListItemLabel
              label={item.address}
            />
          </>
        )}
        onDeleteItem={(item: IHeadOffice) => deleteMutate(item.id)}
        onEditItem={(item: IHeadOffice) => navigate('HeadOfficeForm', { data: item })}
        onViewItem={(item: IHeadOffice) => navigate('HeadOfficeDetail', { id: item.id })}
      />

      <FAB
        onPressButton={() => navigate('HeadOfficeForm')}
      />
    </Container>
  );
}
