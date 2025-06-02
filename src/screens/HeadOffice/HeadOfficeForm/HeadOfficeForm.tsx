import React, { useRef } from "react";
import { ScrollView, TextInput, View } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

import Container from "../../../components/Container/Container";
import Title from "../../../components/Title/Title";
import { Colors } from "../../../global/Colors";
import InputContainer from "../../../components/Input/Input";
import { InputTextMemo } from "../../../components/Input/InputText/InputText";

import { Formik } from 'formik';

import * as Yup from 'yup';

import CustomButton from "../../../components/Button/CustomButton";

import {
  addressSchema,
  citySchema,
  nameSchema,
  neighborhoodSchema,
  postalCodeSchema,
  stateSchema,
  streetNumberSchema
} from "../../../utils/inputValidations";

import { useAddData } from "../../../hooks/useAddData";

import { addHeadOfficeService, updateHeadOffice } from "../../../service/headOfficeService";
import { RouteProp, useRoute } from "@react-navigation/native";
import { GlobalParamList } from "../../../routes/types";
import { useUpdateData } from "../../../hooks/useUpdateData";
import { IHeadOffice } from "../../../interfaces/IHeadOffice";

const createHeadOfficeSchema = Yup.object().shape({
  address: addressSchema,
  name: nameSchema,
  city: citySchema,
  neighborhood: neighborhoodSchema,
  postalCode: postalCodeSchema,
  state: stateSchema,
  addressNumber: streetNumberSchema,
});

type HeadOfficeFormRouteProp = RouteProp<GlobalParamList, 'HeadOfficeForm'>;

export default function HeadOfficeForm() {
  const { params } = useRoute<HeadOfficeFormRouteProp>();

  const existingData = params?.data ?? null;
  const isEditMode = !!existingData;

  const { mutate: addMutate } = useAddData({ mutationName: 'headOffices', fetchFn: addHeadOfficeService });
  const { mutate: updateMutate } = useUpdateData({ fetchFn: updateHeadOffice, id: existingData?.id ?? '', mutationName: 'headOffices' })

  const refInput = useRef<TextInput | null>(null);

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            marginHorizontal: 20,
          }}
        >
          <Title
            fontStyle="bold"
            textColor={Colors.PRIMARY}
            title={existingData?.id ? 'Editar informações' : 'Formulário de Cadastro'}
            textSize={24}
          />

          <Formik
            initialValues={{
              address: existingData?.address ?? '',
              addressNumber: existingData?.addressNumber ?? '',
              city: existingData?.city ?? '',
              state: existingData?.state ?? '',
              postalCode: existingData?.postalCode ?? '',
              phone: existingData?.phone ?? '',
              neighborhood: existingData?.neighborhood ?? '',
              name: existingData?.name?? '',
            } as IHeadOffice}
            onSubmit={(values: IHeadOffice) => {
              const payload = { ...values, id: existingData?.id ?? '' }
              isEditMode ? updateMutate({ id: existingData?.id ?? '', data: payload }) : addMutate(values);
              
            }}
            validationSchema={createHeadOfficeSchema}
          >
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <InputContainer
                  touched={touched.name}
                  error={errors.name}
                  leftIcon={<FontAwesome5 name="building" size={20} color={Colors.PRIMARY} />}
                  children={
                    <InputTextMemo
                      inputValue={values.name}
                      inputName='name'
                      onTextChange={handleChange('name')}
                      placeholderColorText={Colors.PRIMARY}
                      placeholderText='Digite o nome do Local'
                      inputTextType='default'
                      inputRef={refInput}
                    />
                  }
                />

                <InputContainer
                  touched={touched.address}
                  error={errors.address}
                  leftIcon={<FontAwesome5 name="building" size={20} color={Colors.PRIMARY} />}
                  children={
                    <InputTextMemo
                      inputValue={values.address}
                      inputName='address'
                      onTextChange={handleChange('address')}
                      placeholderColorText={Colors.PRIMARY}
                      placeholderText='Digite o endereço'
                      inputTextType='default'
                      inputRef={refInput}
                    />
                  }
                />

                <InputContainer
                  touched={touched.addressNumber}
                  error={errors.addressNumber}
                  leftIcon={<FontAwesome5 name="building" size={20} color={Colors.PRIMARY} />}
                  children={
                    <InputTextMemo
                      inputValue={values.addressNumber}
                      inputName='addressNumber'
                      onTextChange={handleChange('addressNumber')}
                      placeholderColorText={Colors.PRIMARY}
                      placeholderText='Digite o número do endereço'
                      inputTextType='default'
                      inputRef={refInput}
                    />
                  }
                />

                <InputContainer
                  touched={touched.postalCode}
                  error={errors.postalCode}
                  leftIcon={<FontAwesome5 name="building" size={20} color={Colors.PRIMARY} />}
                  children={
                    <InputTextMemo
                      inputValue={values.postalCode}
                      inputName='postalCode'
                      onTextChange={handleChange('postalCode')}
                      placeholderColorText={Colors.PRIMARY}
                      placeholderText='Digite o CEP'
                      inputTextType='default'
                      inputRef={refInput}
                    />
                  }
                />

                <InputContainer
                  touched={touched.neighborhood}
                  error={errors.neighborhood}
                  leftIcon={<FontAwesome5 name="building" size={20} color={Colors.PRIMARY} />}
                  children={
                    <InputTextMemo
                      inputValue={values.neighborhood}
                      inputName='neighborhood'
                      onTextChange={handleChange('neighborhood')}
                      placeholderColorText={Colors.PRIMARY}
                      placeholderText='Digite o bairro'
                      inputTextType='default'
                      inputRef={refInput}
                    />
                  }
                />

                <InputContainer
                  touched={touched.city}
                  error={errors.city}
                  leftIcon={<FontAwesome5 name="building" size={20} color={Colors.PRIMARY} />}
                  children={
                    <InputTextMemo
                      inputValue={values.city}
                      inputName='city'
                      onTextChange={handleChange('city')}
                      placeholderColorText={Colors.PRIMARY}
                      placeholderText='Digite a cidade'
                      inputTextType='default'
                      inputRef={refInput}
                    />
                  }
                />

                <InputContainer
                  touched={touched.state}
                  error={errors.state}
                  leftIcon={<FontAwesome5 name="building" size={20} color={Colors.PRIMARY} />}
                  children={
                    <InputTextMemo
                      inputValue={values.state}
                      inputName='state'
                      onTextChange={handleChange('state')}
                      placeholderColorText={Colors.PRIMARY}
                      placeholderText='Digite o estado'
                      inputTextType='default'
                      inputRef={refInput}
                    />
                  }
                />

                <InputContainer
                  touched={touched.phone}
                  error={errors.phone}
                  leftIcon={<FontAwesome5 name="building" size={20} color={Colors.PRIMARY} />}
                  children={
                    <InputTextMemo
                      inputValue={values.phone}
                      inputName='phone'
                      onTextChange={handleChange('phone')}
                      placeholderColorText={Colors.PRIMARY}
                      placeholderText='Digite o telefone'
                      inputTextType='default'
                      inputRef={refInput}
                    />
                  }
                />

                <CustomButton
                  title={existingData?.id ? 'Salvar alterações' : 'Cadastrar'}
                  buttonBgColor={Colors.PRIMARY}
                  buttonTitleColor={Colors.WHITE}
                  buttonTitleFontStyle="bold"
                  buttonTitleSize={16}
                  onButtonPress={() => handleSubmit()}
                />
              </>
            )}
          </Formik>
          
        </View>
      </ScrollView>
    </Container>
  );
}
