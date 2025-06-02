import React, { JSX, ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../global/Colors";
import { FontAwesome5 } from '@expo/vector-icons';
import { navigate } from "../../../service/NavigationService";
import { IHeadOffice } from "../../../interfaces/IHeadOffice";

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
    <View
        style={{
          padding: 20,
          marginVertical: 10,
          backgroundColor: '#fff',
          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#ddd',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View>  
            {renderContent(item)}
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: 120,
              gap: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => onViewItem(item)}
            >
              <FontAwesome5 name="eye" size={20} color={Colors.INFO} /> 
            </TouchableOpacity> 
            <TouchableOpacity
              onPress={() => onEditItem(item)}
            >
              <FontAwesome5 name="edit" size={20} color={Colors.WARNING} /> 
            </TouchableOpacity>
            <TouchableOpacity
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
