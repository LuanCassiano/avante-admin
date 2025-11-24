import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

import { useModalStore } from '../../zustand/useModalStore';
import { Colors } from '../../global/Colors';

type TSelectInputProps = {
  label: string;
  value: string;
  field: string;
  onChange: (value: string) => void;
  options: { label: string, value: string }[];
  error?: string;
  touched?: boolean;
};

export default function SelectInput({
  label,
  value,
  field,
  onChange,
  options,
  error,
  touched
}: TSelectInputProps) {
  const { openModal } = useModalStore((state) => state);

  const selectedLabel = options.find(option => option.value === value)?.label || 'Selecione uma opção';

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ marginVertical: 10, color: Colors.PRIMARY }}>{label}</Text>
      <TouchableOpacity
        onPress={() => openModal(field, onChange, options)}
        style={{
          padding: 20,
          borderWidth: 1,
          borderColor: error ? Colors.ERROR : Colors.PRIMARY,
          borderRadius: 5,
        }}
      >
        <TextInput
          value={selectedLabel}
          editable={false}
          pointerEvents='none'
          style={{ color: Colors.PRIMARY, fontSize: 16 }}
        />
      </TouchableOpacity>

      {error && touched && (
        <View style={{ marginTop: 5 }}>
          <Text 
            style={{ 
              fontSize: 16,
              color: Colors.ERROR,
              fontWeight: 'bold'
            }}
          >
            {error}
          </Text>
        </View>
      )}
    </View>
  );
}
