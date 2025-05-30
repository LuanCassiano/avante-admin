import React, { useEffect } from "react";
import { FlatList, Text } from "react-native";

import Container from "../../../components/Container/Container";

import { FAB } from "../../../components/Button/FAB/FAB";
import { navigate } from "../../../service/NavigationService";
import { useHeadOffice } from "../../../hooks/useHeadOffice";

export default function HeadOfficeList() {
  const { headOfficeQuery: {
    data,
    isLoading,
    isError
  } } = useHeadOffice();

  return (
    <Container>
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
        }}
        keyExtractor={(item) => item.name}
        data={data}
        renderItem={({ item }) => (
          <Text>{item.name}</Text>
        )}
      />

      <FAB
        onClick={() => navigate('HeadOfficeForm')}
      />
    </Container>
  );
}
