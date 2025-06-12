import React from "react";
import { ScrollView, Text, View } from "react-native";
import Container from "../../../components/Container/Container";
import Title from "../../../components/Title/Title";
import { Colors } from "../../../global/Colors";
import { RouteProp, useRoute } from "@react-navigation/native";
import { GlobalParamList } from "../../../routes/types";
import { Formik } from "formik";
import { ITeacher } from "../../../interfaces/ITeacher";
import InputContainer from "../../../components/Input/Input";
import { InputTextMemo } from "../../../components/Input/InputText/InputText";
import { FontAwesome5 } from '@expo/vector-icons';
import CustomButton from "../../../components/Button/CustomButton";
import * as Yup from 'yup';
import { crefSchema, emailSchema, nameSchema, phoneSchema } from "../../../utils/inputValidations";
import { useAddData } from "../../../hooks/useAddData";
import { addTeacher, updateTeacher } from "../../../service/teacherService";
import { useUpdateData } from "../../../hooks/useUpdateData";

type TeacherFormRouteProp = RouteProp<GlobalParamList, 'TeacherForm'>;

const createTeacherSchema = Yup.object().shape({
  name: nameSchema,
  cref: crefSchema,
  phone: phoneSchema,
  email: emailSchema,
});


export default function TeacherForm() {
  const { params } = useRoute<TeacherFormRouteProp>();
  
  const existingData = params?.data ?? null;
  const isEditMode = !!existingData;

  const { mutate: addMutate } = useAddData({ mutationName: 'teachers', fetchFn: addTeacher })
  const {mutate: updateMutate } = useUpdateData({ fetchFn: updateTeacher, id: existingData?.id ?? '', mutationName: 'teachers' })

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
        }}
      >
        <View style={{ marginHorizontal: 20 }}>
          <Title
            fontStyle="bold"
            textColor={Colors.PRIMARY}
            title={existingData?.id ? 'Editar informações' : 'Formulário de Cadastro'}
            textSize={24}
          />

          <Formik
            initialValues={{
              name: existingData?.name ?? '',
              email: existingData?.email ?? '',
              cref: existingData?.cref ?? '',
              phone: existingData?.phone ?? '',
            } as ITeacher}
            onSubmit={(values: ITeacher) => {
              const payload = { ...values, id: existingData?.id ?? '' }
              isEditMode ? updateMutate({ id: existingData?.id ?? '', data: payload }) : addMutate(values);
            }}
            validationSchema={createTeacherSchema}
          >
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              touched
            }) => (
              <>
                <InputContainer
                  touched={touched.name}
                  error={errors.name}
                  leftIcon={<FontAwesome5 name="user" size={20} color={Colors.PRIMARY} />}
                  children={
                    <InputTextMemo
                      inputValue={values.name}
                      inputName='name'
                      onTextChange={handleChange('name')}
                      placeholderColorText={Colors.PRIMARY}
                      placeholderText='Digite o nome do professor'
                      inputTextType='default'
                    />
                  }
                />

                <InputContainer
                  touched={touched.email}
                  error={errors.email}
                  leftIcon={<FontAwesome5 name="user" size={20} color={Colors.PRIMARY} />}
                  children={
                    <InputTextMemo
                      inputValue={values.email}
                      inputName='email'
                      onTextChange={handleChange('email')}
                      placeholderColorText={Colors.PRIMARY}
                      placeholderText='Digite o e-mail do professor'
                      inputTextType='default'
                    />
                  }
                />
                <InputContainer
                  touched={touched.phone}
                  error={errors.phone}
                  leftIcon={<FontAwesome5 name="user" size={20} color={Colors.PRIMARY} />}
                  children={
                    <InputTextMemo
                      inputValue={values.phone}
                      inputName='phone'
                      onTextChange={handleChange('phone')}
                      placeholderColorText={Colors.PRIMARY}
                      placeholderText='Digite o telefone do professor'
                      inputTextType='default'
                    />
                  }
                />

                <InputContainer
                  touched={touched.cref}
                  error={errors.cref}
                  leftIcon={<FontAwesome5 name="user" size={20} color={Colors.PRIMARY} />}
                  children={
                    <InputTextMemo
                      inputValue={values.cref}
                      inputName='cref'
                      onTextChange={handleChange('cref')}
                      placeholderColorText={Colors.PRIMARY}
                      placeholderText='Digite o CREF do professor'
                      inputTextType='default'
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
