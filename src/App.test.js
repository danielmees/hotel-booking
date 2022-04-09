import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import selectEvent from 'react-select-event';
import App from './App';


const renderApp = () => {
  render(<App />);

  const checkInDatePicker = screen.getByPlaceholderText('Check in date');
  const checkOutDatePicker = screen.getByPlaceholderText('Check out date');
  const roomTypeSelector = screen.getByRole('combobox'); 
  const searchButton = screen.getByRole('button', { name: 'Search' });

  return { checkInDatePicker, checkOutDatePicker, roomTypeSelector, searchButton };
}
  

test('prevents room search if dates or room type selection not complete', async () => {
  const { checkInDatePicker, checkOutDatePicker, roomTypeSelector, searchButton } = renderApp();

  userEvent.click(searchButton);
  expect(screen.queryByRole('list')).not.toBeInTheDocument();

  userEvent.type(checkInDatePicker, '17/04/2022');
  userEvent.click(searchButton);
  expect(screen.queryByRole('list')).not.toBeInTheDocument();

  userEvent.type(checkOutDatePicker, '18/04/2022');
  userEvent.click(searchButton);
  expect(screen.queryByRole('list')).not.toBeInTheDocument();

  await selectEvent.select(roomTypeSelector, ['Single']);
  userEvent.click(searchButton);
  expect(screen.queryByRole('list')).toBeInTheDocument();
});

test('prevents invalid check out date', async () => {
  const { checkInDatePicker, checkOutDatePicker, roomTypeSelector, searchButton } = renderApp();

  userEvent.type(checkInDatePicker, '28/08/2022');
  userEvent.type(checkOutDatePicker, '27/08/2022');
  await selectEvent.select(roomTypeSelector, ['Single']);
  userEvent.click(searchButton);
  expect(screen.queryByRole('list')).not.toBeInTheDocument();
});

test('returns correct single rooms with booking status', async () => {
  const { checkInDatePicker, checkOutDatePicker, roomTypeSelector, searchButton } = renderApp();

  userEvent.type(checkInDatePicker, '15/04/2022');
  userEvent.type(checkOutDatePicker, '27/04/2022');
  await selectEvent.select(roomTypeSelector, ['Single']);
  userEvent.click(searchButton);
  expect(screen.queryByRole('list')).toBeInTheDocument();

  expect(screen.queryAllByRole('button', { name: 'Sold out' })).toHaveLength(2);
  const returnedRooms = screen.queryAllByRole('listitem');
  expect(within(returnedRooms[4]).getByText('Room 5')).toBeTruthy;
  expect(within(returnedRooms[4]).getByRole('button', {name: 'Sold out'})).toBeTruthy;
  expect(within(returnedRooms[6]).getByText('Room 7')).toBeTruthy;
  expect(within(returnedRooms[6]).getByRole('button', {name: 'Sold out'})).toBeTruthy;
});

test('returns all single rooms vacant if booking time is after all booked times from data', async () => {
  const { checkInDatePicker, checkOutDatePicker, roomTypeSelector, searchButton } = renderApp();

  userEvent.type(checkInDatePicker, '06/06/2022');
  userEvent.type(checkOutDatePicker, '13/06/2022');
  await selectEvent.select(roomTypeSelector, ['Single']);
  userEvent.click(searchButton);

  expect(screen.queryAllByRole('listitem')).toHaveLength(7);
  expect(screen.queryAllByRole('button', { name: 'Sold out' })).toHaveLength(0);
});

test('returns correct double rooms with booking status', async () => {
  const { checkInDatePicker, checkOutDatePicker, roomTypeSelector, searchButton } = renderApp();

  userEvent.type(checkInDatePicker, '28/04/2022');
  userEvent.type(checkOutDatePicker, '04/05/2022');
  await selectEvent.select(roomTypeSelector, ['Double']);
  userEvent.click(searchButton);
  expect(screen.queryByRole('list')).toBeInTheDocument();

  expect(screen.queryAllByRole('button', { name: 'Sold out' })).toHaveLength(2);
  const returnedRooms = screen.queryAllByRole('listitem');
  expect(within(returnedRooms[0]).getByText('Room 8')).toBeTruthy;
  expect(within(returnedRooms[0]).getByRole('button', {name: 'Sold out'})).toBeTruthy;
  expect(within(returnedRooms[2]).getByText('Room 10')).toBeTruthy;
  expect(within(returnedRooms[2]).getByRole('button', {name: 'Sold out'})).toBeTruthy;
});

test('returns all double rooms vacant if booking time is after all booked times from data', async () => {
  const { checkInDatePicker, checkOutDatePicker, roomTypeSelector, searchButton } = renderApp();

  userEvent.type(checkInDatePicker, '08/06/2022');
  userEvent.type(checkOutDatePicker, '13/06/2022');
  await selectEvent.select(roomTypeSelector, ['Double']);
  userEvent.click(searchButton);

  expect(screen.queryAllByRole('listitem')).toHaveLength(3);
  expect(screen.queryAllByRole('button', { name: 'Sold out' })).toHaveLength(0);
});