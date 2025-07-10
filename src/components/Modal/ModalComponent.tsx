import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import { useModalStore } from "../../zustand/useModalStore";
import { Colors } from "../../global/Colors";

export default function ModalComponent() {
  const { showModal, closeModal, onSelectItem, options } = useModalStore((state) => state);

  return (
    <Modal visible={showModal} transparent={true} animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            alignSelf: 'stretch',
            backgroundColor: "white",
            marginHorizontal: 20,
            borderRadius: 10,
            padding: 20,
          }}
        >
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ 
                  padding: 10, 
                  borderBottomWidth: 1, 
                  borderBottomColor: '#ccc'
                }} 
                onPress={() => onSelectItem(item.value)}>
                <Text>{item.label}</Text>
              </TouchableOpacity>
            )}
          />

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <TouchableOpacity
              onPress={() => closeModal()} 
              style={{ 
                marginTop: 20,
                alignItems: 'center', 
                backgroundColor: Colors.PRIMARY, 
                borderRadius: 50, 
                paddingHorizontal: 20,
                paddingVertical: 10
              }}
            >
              <Text style={{ color: Colors.WHITE, fontWeight: 'bold' }}>Confirmar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => closeModal()}
              style={{ 
                marginTop: 20,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: Colors.PRIMARY,
                borderRadius: 50,
                paddingHorizontal: 20,
                paddingVertical: 10
              }}
            >
              <Text style={{ color: Colors.PRIMARY, fontWeight: 'bold' }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}