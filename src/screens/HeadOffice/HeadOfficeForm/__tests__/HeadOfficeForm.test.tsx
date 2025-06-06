import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import HeadOfficeForm from '../HeadOfficeForm';
import { useRoute } from '@react-navigation/native';
import { useAddData } from '../../../../hooks/useAddData';
import { useUpdateData } from '../../../../hooks/useUpdateData';

jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(),
}));

jest.mock('../../../../hooks/useAddData', () => ({
  useAddData: jest.fn(),
}));

jest.mock('../../../../hooks/useUpdateData', () => ({
  useUpdateData: jest.fn(),
}));

describe('HeadOfficeForm', () => {
  const mockAddMutate = jest.fn();
  const mockUpdateMutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAddData as jest.Mock).mockReturnValue({ mutate: mockAddMutate });
    (useUpdateData as jest.Mock).mockReturnValue({ mutate: mockUpdateMutate });
  });

  it('renders correctly in add mode', () => {
    (useRoute as jest.Mock).mockReturnValue({ params: {} });

    const { getByPlaceholderText, getByText } = render(<HeadOfficeForm />);

    expect(getByText('Formulário de Cadastro')).toBeTruthy();
    expect(getByPlaceholderText('Digite o nome do Local')).toBeTruthy();
    expect(getByPlaceholderText('Digite o endereço')).toBeTruthy();
    expect(getByPlaceholderText('Digite o número do endereço')).toBeTruthy();
    expect(getByPlaceholderText('Digite o CEP')).toBeTruthy();
    expect(getByPlaceholderText('Digite o bairro')).toBeTruthy();
    expect(getByPlaceholderText('Digite a cidade')).toBeTruthy();
    expect(getByPlaceholderText('Digite o estado')).toBeTruthy();
    expect(getByPlaceholderText('Digite o telefone')).toBeTruthy();
  });

  it('renders correctly in edit mode', () => {
    const mockData = {
      id: '1',
      name: 'Head Office',
      address: '123 Main St',
      addressNumber: '456',
      city: 'City',
      state: 'State',
      postalCode: '12345',
      phone: '123456789',
      neighborhood: 'Neighborhood',
    };

    (useRoute as jest.Mock).mockReturnValue({ params: { data: mockData } });

    const { getByText, getByDisplayValue } = render(<HeadOfficeForm />);

    expect(getByText('Editar informações')).toBeTruthy();
    expect(getByDisplayValue('Head Office')).toBeTruthy();
    expect(getByDisplayValue('123 Main St')).toBeTruthy();
    expect(getByDisplayValue('456')).toBeTruthy();
    expect(getByDisplayValue('City')).toBeTruthy();
    expect(getByDisplayValue('State')).toBeTruthy();
    expect(getByDisplayValue('12345')).toBeTruthy();
    expect(getByDisplayValue('123456789')).toBeTruthy();
    expect(getByDisplayValue('Neighborhood')).toBeTruthy();
  });

  it('submits the form in add mode', async () => {
    (useRoute as jest.Mock).mockReturnValue({ params: {} });

    const mockAddDataMutate = jest.fn();
    (useAddData as jest.Mock).mockReturnValue({
      mutate: mockAddDataMutate,
      isError: false,
      isLoading: false,
    });

    const { getByPlaceholderText, getByText } = render(<HeadOfficeForm />);

    fireEvent.changeText(getByPlaceholderText('Digite o nome do Local'), 'New Head Office');
    fireEvent.changeText(getByPlaceholderText('Digite o endereço'), '456 Elm St');
    fireEvent.changeText(getByPlaceholderText('Digite o número do endereço'), '789');
    fireEvent.changeText(getByPlaceholderText('Digite o CEP'), '67890');
    fireEvent.changeText(getByPlaceholderText('Digite o bairro'), 'New Neighborhood');
    fireEvent.changeText(getByPlaceholderText('Digite a cidade'), 'New City');
    fireEvent.changeText(getByPlaceholderText('Digite o estado'), 'New State');
    fireEvent.changeText(getByPlaceholderText('Digite o telefone'), '987654321');
    
    await act(async () => {
      fireEvent.press(getByText('Cadastrar'));
    });

    expect(mockAddDataMutate).toHaveBeenCalledWith({
      name: 'New Head Office',
      address: '456 Elm St',
      addressNumber: '789',
      postalCode: '67890',
      neighborhood: 'New Neighborhood',
      city: 'New City',
      state: 'New State',
      phone: '987654321',
    });
  });

  it('submits the form in edit mode', async () => {
    const mockData = {
      id: '1',
      name: 'Head Office',
      address: '123 Main St',
      addressNumber: '456',
      city: 'City',
      state: 'State',
      postalCode: '12345',
      phone: '123456789',
      neighborhood: 'Neighborhood',
    };

    (useRoute as jest.Mock).mockReturnValue({ params: { data: mockData } });

    const { getByText, getByPlaceholderText } = render(<HeadOfficeForm />);

    fireEvent.changeText(getByPlaceholderText('Digite o nome do Local'), 'Updated Head Office');

    await act(async () => {
      fireEvent.press(getByText('Salvar alterações'));
    });

    expect(mockUpdateMutate).toHaveBeenCalledWith({
      id: '1',
      data: {
        ...mockData,
        name: 'Updated Head Office',
      },
    });
  });
});
