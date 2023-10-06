import React from 'react';

import List from '../src/pages/List';
import {fireEvent, render} from '@testing-library/react-native';
import {ROUTE_NAMES} from '../src/utils/constants';

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

describe('Listing page ', () => {
  it('it should go to add todo page', () => {
    const page = render(<List />);
    const addTodoButton = page.getByTestId('addTodoButton');
    fireEvent.press(addTodoButton);
    expect(mockedNavigate).toHaveBeenCalledWith(ROUTE_NAMES.Add);
  });
});
