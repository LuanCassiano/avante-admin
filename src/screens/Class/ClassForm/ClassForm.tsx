import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Container from "../../../components/Container/Container";
import Title from "../../../components/Title/Title";
import { Colors } from "../../../global/Colors";
import { Formik } from "formik";
import { IClass, IClassSchedule } from "../../../interfaces/IClass";
import InputContainer from "../../../components/Input/Input";
import { InputTextMemo } from "../../../components/Input/InputText/InputText";
import { useGetAllData } from "../../../hooks/useGetAllData";
import { IHeadOffice } from "../../../interfaces/IHeadOffice";
import { getAllHeadOfficesService } from "../../../service/headOfficeService";
import ModalComponent from "../../../components/Modal/ModalComponent";
import SelectInput from "../../../components/SelectInput/SelectInput";
import { ITeacher } from "../../../interfaces/ITeacher";
import { getAllTeachers } from "../../../service/teacherService";
import CustomButton from "../../../components/Button/CustomButton";
import { useAddData } from "../../../hooks/useAddData";
import { addClass } from "../../../service/classService";
import * as Yup from 'yup';
import { classHeadOffice, classNameSchema, classTeacher } from "../../../utils/inputValidations";
import { fetchUnavailableSchedulesForTeacher } from "../../../service/teacherSchedule";
import { useUnavailableSchedules } from "../../../hooks/useUnavailableSchedule";

const WEEK_DAYS: IClassSchedule['day'][] = ['segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
const START_TIME: IClassSchedule['startTime'][] = ['10:00', '11:00', '12:00', '17:00', '18:00', '18:30', '19:00', '20:00', '20:30']
const END_TIME: IClassSchedule['endTime'][] = ['11:00', '12:00', '13:00', '18:00', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30']

const createClassSchema = Yup.object().shape({
  name: classNameSchema,
  localId: classHeadOffice,
  teacherId: classTeacher,
})

export default function ClassForm() {
  const [selectedDay, setSelectedDay] = useState<IClassSchedule['day'] | ''>('');
  const [selectStartTime, setSelectStartTime] = useState<IClassSchedule[]>([]);
  const [selectEndTime, setSelectEndTime] = useState<IClassSchedule[]>([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState('');
  const [selectedLocalId, setSelectedLocalId] = useState('');

  const unavailableSchedules = useUnavailableSchedules(selectedTeacherId, selectedLocalId);

  
  const isStartTimeUnavailable = (time: string) => {
    return unavailableSchedules?.some(s => s.day === classSchedule.day && s.startTime === time);
  };
  
  const isEndTimeUnavailable = (time: string) => {
    return unavailableSchedules?.some(s => s.day === classSchedule.day && s.endTime === time);
  };

  const [classSchedule, setClassSchedule] = useState<IClassSchedule>({
    day: 'segunda',
    startTime: '',
    endTime: ''
  });
    
  const { data: headOffices } = useGetAllData<IHeadOffice>({ queryKeyName: 'headOffices', fetchFn: getAllHeadOfficesService });
  const { data: teachers } = useGetAllData<ITeacher>({ queryKeyName: 'teachers', fetchFn: getAllTeachers })
  const { mutate: addMutate } = useAddData({ mutationName: 'classes', fetchFn: addClass })

  const toggleDay = (day: IClassSchedule['day']) => {
    setSelectedDay(prev => (prev === day ? '' : day));
  
    setClassSchedule(prev => ({
      ...prev,
      day: day,
    }));
  };

  const updateTime = (field: 'inicio' | 'fim', value: string) => {
    const updateStartTime = (value: IClassSchedule['startTime']) => {
      const alreadySelected = selectStartTime.some(x => x.startTime === value);

      setClassSchedule(prev => ({
        ...prev,
        startTime: value
      }));

      if(!alreadySelected) {
        setSelectStartTime([{ day: 'segunda', startTime: value, endTime: '11:00' }]);
      }
    };

    const updateEndTime = (value: IClassSchedule['endTime']) => {
      const alreadySelected = selectEndTime.some(x => x.endTime === value);

      setClassSchedule(prev => ({
        ...prev,
        endTime: value,
      }))

      if (!alreadySelected) {
        setSelectEndTime([{ day: '', startTime: '', endTime: value }])
      }
    };

    const fieldHandlers = {
      inicio: updateStartTime,
      fim: updateEndTime,
    };

    fieldHandlers[field](value);
  }

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginHorizontal: 20 }}>
          <Title
            fontStyle="bold"
            textColor={Colors.PRIMARY}
            title={'Formulário de Cadastro'}
            textSize={24}
          />

          <Formik
            initialValues={{
              name: '',
              localId: '',
              teacherId: '',
            } as IClass}
            onSubmit={(values) => {
              const data = { ...values, ...classSchedule}
              addMutate(data);
            }}
            validationSchema={createClassSchema}
          >
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <>
                <InputContainer
                  touched={touched.name}
                  error={errors.name}
                  children={
                    <InputTextMemo
                      inputValue={values.name}
                      inputName='name'
                      onTextChange={handleChange('name')}
                      placeholderColorText={Colors.PRIMARY}
                      placeholderText='Digite o nome da turma'
                      inputTextType='default'
                    />
                  }
                />

                <SelectInput
                  error={errors.localId}
                  touched={touched.localId}
                  label="Local de Treino"
                  value={values.localId}
                  field="localId"
                  onChange={(val: any) => {
                    setFieldValue('localId', val);
                    setSelectedLocalId(val);
                  }}
                  options={headOffices?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  })) || []}
                />

                <SelectInput
                  error={errors.teacherId}
                  touched={touched.teacherId}
                  label="Professor"
                  value={values.teacherId}
                  field="teacherId"
                  onChange={async (val: any) => {
                    setFieldValue('teacherId', val);
                    setSelectedTeacherId(val);
                  }}
                  options={teachers?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  })) || []}
                />

                <View style={{ marginVertical: 10 }}> 
                  <Text style={{ color: Colors.PRIMARY }}>Dias da semana</Text>

                  <FlatList
                    keyExtractor={item => item}
                    data={WEEK_DAYS}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                      const selected = selectedDay === item;
                      return (
                        <TouchableOpacity
                          onPress={() => toggleDay(item)}
                          style={{
                            marginRight: 8, 
                            marginVertical: 10, 
                            borderRadius: 50, 
                            borderWidth: 1, 
                            borderColor: Colors.PRIMARY, 
                            paddingVertical: 3, 
                            paddingHorizontal: 10, 
                            backgroundColor: selected ? Colors.PRIMARY : Colors.WHITE
                          }}
                        >
                          <Text style={{ color: selected ? Colors.WHITE : Colors.PRIMARY, fontWeight: 'bold' }}>{item.toUpperCase()}</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </View>

                <View style={{ marginVertical: 10 }}> 
                  <Text style={{ color: Colors.PRIMARY }}>Início da aula</Text>

                  <FlatList
                    keyExtractor={item => item}
                    data={START_TIME}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                      const selected = selectStartTime.find(x => x.startTime === item);
                      return (
                        <TouchableOpacity
                          disabled={isStartTimeUnavailable(item)}
                          onPress={() => updateTime('inicio', item)}
                          style={{
                            opacity: isStartTimeUnavailable(item) ? 0.4 : 1,
                            marginRight: 8, 
                            marginVertical: 10, 
                            borderRadius: 50, 
                            borderWidth: 1, 
                            borderColor: Colors.PRIMARY, 
                            paddingVertical: 3, 
                            paddingHorizontal: 10, 
                            backgroundColor: selected ? Colors.PRIMARY : Colors.WHITE
                          }}
                        >
                          <Text style={{ color: selected ? Colors.WHITE : Colors.PRIMARY, fontWeight: 'bold' }}>{item.toUpperCase()}</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </View>

                <View style={{ marginVertical: 10 }}> 
                  <Text style={{ color: Colors.PRIMARY }}>Término da aula</Text>

                  <FlatList
                    keyExtractor={item => item}
                    data={END_TIME}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                      const selected = selectEndTime.find(x => x.endTime === item);
                      const disabled = isEndTimeUnavailable(item);

                      return (
                        <TouchableOpacity
                          onPress={() => updateTime('fim', item)}
                          disabled={disabled}
                          style={{ 
                            marginRight: 8,
                            opacity: disabled ? 0.4 : 1,
                            marginVertical: 10, 
                            borderRadius: 50, 
                            borderWidth: 1, 
                            borderColor: Colors.PRIMARY, 
                            paddingVertical: 3, 
                            paddingHorizontal: 10, 
                            backgroundColor: selected ? Colors.PRIMARY : Colors.WHITE
                          }}
                        >
                          <Text style={{ color: selected ? Colors.WHITE : Colors.PRIMARY, fontWeight: 'bold' }}>{item.toUpperCase()}</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </View>

                <CustomButton
                  title='Salvar'
                  buttonBgColor={Colors.PRIMARY}
                  buttonTitleColor={Colors.WHITE}
                  buttonTitleFontStyle="bold"
                  buttonTitleSize={16}
                  onButtonPress={() => handleSubmit()}
                />

                <ModalComponent />
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </Container>
  );
}