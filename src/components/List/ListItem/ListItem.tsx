import React, { JSX, ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../global/Colors";
import { FontAwesome5 } from '@expo/vector-icons';
import { navigate } from "../../../service/NavigationService";

interface ItemListProps<T extends { id?: string }> {
  item: T;
  renderContent: (item: T) => ReactNode;
}

function ItemList<T extends { id: string }> ({
  item,
  renderContent
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
              onPress={() => navigate('HeadOfficeDetail', { id: item.id })}
            >
              <FontAwesome5 name="eye" size={20} color={Colors.INFO} /> 
            </TouchableOpacity> 
            <TouchableOpacity
              onPress={() => console.log('Edit item', item.id)}
            >
              <FontAwesome5 name="edit" size={20} color={Colors.WARNING} /> 
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.log('Remove item', item.id)}
            >
              <FontAwesome5 name="trash-alt" size={20} color={Colors.ERROR} />
            </TouchableOpacity> 
          </View>
        </View>
      </View>
  )
}

export const ListItem = React.memo(ItemList) as <T extends { id: string }>(props: ItemListProps<T>) => JSX.Element;
