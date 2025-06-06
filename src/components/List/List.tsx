import { JSX, ReactNode, useCallback } from "react";
import { FlatList } from "react-native";
import { ListItem } from "./ListItem/ListItem";

interface ListContainerProps<T extends { id: string }> {
  data: T[];
  renderContent: (item: T) => ReactNode;
  onViewItem: (item: T) => void;
  onEditItem: (item: T) => void;
  onDeleteItem: (item: T) => void;
}

export const List = <T extends { id: string }>({
  data,
  renderContent,
  onDeleteItem,
  onEditItem,
  onViewItem
}: ListContainerProps<T>): JSX.Element => {
  

  return (
    <FlatList<T>
      data={data}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }: { item: T }) => (
        <ListItem
          item={item}
          renderContent={renderContent} 
          onDeleteItem={onDeleteItem}
          onEditItem={onEditItem}
          onViewItem={onViewItem}
        />
      )}
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: 20,
      }}
    />
  )
}
