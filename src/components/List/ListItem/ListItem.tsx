import React, { JSX, ReactNode } from "react";
import { TouchableOpacity, View } from "react-native";
import { Colors } from "../../../global/Colors";
import { FontAwesome5 } from '@expo/vector-icons';
import { styles } from "./ListItem.styles";

interface ItemListProps<T extends { id?: string }> {
  item: T;
  renderContent: (item: T) => ReactNode;
  onViewItem: (item: T) => void;
  onEditItem: (item: T) => void;
  onDeleteItem: (item: T) => void;
}

function ItemList<T extends { id: string }> ({
  item,
  renderContent,
  onDeleteItem,
  onEditItem,
  onViewItem
}: ItemListProps<T>) {
  return (
    <View style={styles.itemListContainer}>
      <View style={styles.itemListRow}>
        <View>  
          {renderContent(item)}
        </View>

        <View style={styles.itemListActionsContent}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={`view-button-${item.id}`}
            testID={`view-button-${item.id}`}
            onPress={() => onViewItem(item)}
          >
            <FontAwesome5 name="eye" size={20} color={Colors.INFO} /> 
          </TouchableOpacity> 
          <TouchableOpacity
            accessibilityLabel={`edit-button-${item.id}`} 
            accessibilityRole="button"
            testID={`edit-button-${item.id}`}
            onPress={() => onEditItem(item)}
          >
            <FontAwesome5 name="edit" size={20} color={Colors.WARNING} /> 
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityLabel={`delete-button-${item.id}`} 
            accessibilityRole="button"
            testID={`delete-button-${item.id}`}
            onPress={() => onDeleteItem(item)}
          >
            <FontAwesome5 name="trash-alt" size={20} color={Colors.ERROR} />
          </TouchableOpacity> 
        </View>
      </View>
    </View>
  )
}

export const ListItem = React.memo(ItemList) as <T extends { id: string }>(props: ItemListProps<T>) => JSX.Element;
