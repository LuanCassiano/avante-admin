import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ListItem } from '../ListItem';
import { Text } from 'react-native';

const mockItem = {
  id: '123',
  name: 'Item de Teste'
};

describe('List Item component', () => {
  it('render content from item', () => {
    const { getByText } = render(
      <ListItem
        item={mockItem}
        renderContent={(item) => <Text>{item.name}</Text>}
        onViewItem={() => {}}
        onEditItem={() => {}}
        onDeleteItem={() => {}}
      />
    );

    expect(getByText('Item de Teste')).toBeTruthy();
  });

  it('call onViewItem when press view button', () => {
    const onViewMock = jest.fn();
    const { getAllByRole } = render(
      <ListItem
        item={mockItem}
        renderContent={(item) => <Text>{item.name}</Text>}
        onViewItem={onViewMock}
        onEditItem={() => {}}
        onDeleteItem={() => {}}
      />
    );

    const buttons = getAllByRole('button');
    fireEvent.press(buttons[0]);
    expect(onViewMock).toHaveBeenCalledWith(mockItem);
  });

  it('call onEditItem when press edit button', () => {
    const onEditMock = jest.fn();
    const { getAllByRole } = render(
      <ListItem
        item={mockItem}
        renderContent={(item) => <Text>{item.name}</Text>}
        onViewItem={() => {}}
        onEditItem={onEditMock}
        onDeleteItem={() => {}}
      />
    );

    const buttons = getAllByRole('button');
    fireEvent.press(buttons[1]);
    expect(onEditMock).toHaveBeenCalledWith(mockItem);
  });

  it('call onDeleteItem when press delete button', () => {
    const onDeleteMock = jest.fn();
    const { getAllByRole } = render(
      <ListItem
        item={mockItem}
        renderContent={(item) => <Text>{item.name}</Text>}
        onViewItem={() => {}}
        onEditItem={() => {}}
        onDeleteItem={onDeleteMock}
      />
    );

    const buttons = getAllByRole('button');
    fireEvent.press(buttons[2]);
    expect(onDeleteMock).toHaveBeenCalledWith(mockItem);
  });
});
