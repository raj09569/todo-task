import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Add from '../Add'; // Adjust the import path accordingly
import {validateAuth} from '../../../utils/functions';

// Mock AsyncStorage and validateAuth functions
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

jest.mock('../../../utils/functions', () => ({
  randomString: jest.fn(() => 'test-id'), // Mock randomString to return a fixed ID
  validateAuth: jest.fn(),
}));

// Mock the navigation object
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

test('submitting the form with valid data calls the onSubmit function', async () => {
  // Render the component
  const {getByPlaceholderText, getByText} = render(
    <Add route={{params: {}}} navigation={mockedNavigate} />,
  );

  // Fill in the form
  const nameInput = getByPlaceholderText('Name');
  const descriptionInput = getByPlaceholderText('Description');

  fireEvent.changeText(nameInput, 'A test name');
  fireEvent.changeText(descriptionInput, 'A test description');

  // Find and press the submit button
  const submitButton = getByText('Submit');
  fireEvent.press(submitButton);

  // Assertions
  expect(validateAuth).toHaveBeenCalled();
  // expect(mockedNavigate.push).toHaveBeenCalledWith('List');
});
