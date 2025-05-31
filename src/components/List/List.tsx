import { JSX, ReactNode, useCallback } from "react";
import { FlatList } from "react-native";
import { ListItem } from "./ListItem/ListItem";

interface ListContainerProps<T extends { id: string }> {
  data: T[];
  renderContent: (item: T) => ReactNode;
}

export const List = <T extends { id: string }>({
  data,
  renderContent
}: ListContainerProps<T>): JSX.Element => {
  

  return (
    <FlatList<T>
      data={data}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }: { item: T }) => (
        <ListItem
          item={item}
          renderContent={renderContent} 
        />
      )}
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: 20,
      }}
    />
  )
}
