import * as Yup from 'yup';

enum EFeedbackMessage {
  REQUIRED_EMAIL = 'Insira o e-mail',
  REQUIRED_NAME = 'Insira o nome',
  REQUIRED_CREF = 'Insira o número do CREF',
  REQUIRED_PHONE = 'Insira o número do telefone',
  REQUIRED_PASSWORD = 'Insira sua senha',
  VALID_EMAIL = 'Insira um e-mail válido',
  REQUIRED_ADDRESS = 'Insira o endereço',
  REQUIRED_STREET_NUMBER = 'Insira o número da rua',
  REQUIRED_POSTAL_CODE = 'Insira o CEP',
  REQUIRED_NEIGHBORHOOD = 'Insira o bairro',
  REQUIRED_CITY = 'Insira a cidade',
  REQUIRED_STATE = 'Insira o estado',
}

export const emailSchema = Yup.string()
  .email(EFeedbackMessage.VALID_EMAIL)
  .required(EFeedbackMessage.REQUIRED_EMAIL);

export const passwordSchema = Yup.string().required(EFeedbackMessage.REQUIRED_PASSWORD);

export const nameSchema = Yup.string().required(EFeedbackMessage.REQUIRED_NAME);

export const crefSchema = Yup.string().required(EFeedbackMessage.REQUIRED_CREF);

export const phoneSchema = Yup.string().required(EFeedbackMessage.REQUIRED_PHONE);

export const addressSchema = Yup.string().required(EFeedbackMessage.REQUIRED_ADDRESS);

export const streetNumberSchema = Yup.string().required(EFeedbackMessage.REQUIRED_STREET_NUMBER);

export const postalCodeSchema = Yup.string().required(EFeedbackMessage.REQUIRED_POSTAL_CODE);

export const neighborhoodSchema = Yup.string().required(EFeedbackMessage.REQUIRED_NEIGHBORHOOD);

export const citySchema = Yup.string().required(EFeedbackMessage.REQUIRED_CITY);

export const stateSchema = Yup.string().required(EFeedbackMessage.REQUIRED_STATE);
