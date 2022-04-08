import React, { useState } from 'react';

import Selector from './components/Selector';
import DatePickerWrapper from './components/DatePicker';
import Button from './components/Button';

import './App.scss';

import rooms from './assets/rooms.json';

function App() {
  const [startDate, setStartDate] = useState(null);
  const [minEndDate, setMinEndDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [roomType, setRoomType] = useState('');

  const handleStartDateChange = date => {
    setStartDate(date); 
    const newMinEndDate = new Date(date.valueOf());
    newMinEndDate.setDate(newMinEndDate.getDate() + 1);
    setMinEndDate(newMinEndDate);
  };
  
  return (
    <div className='hotel-booking'>
      <h1>Hotel Booking</h1>
      <section className='search-container'>
        <div className='search-container__date-picker'>
          <DatePickerWrapper date={startDate}
            handleChange={handleStartDateChange}
            placeholderText="Check in date"
            minDate={new Date()}
          />
          &nbsp;-&nbsp;
          <DatePickerWrapper date={endDate}
            handleChange={date => setEndDate(date)}
            placeholderText="Check out date"
            minDate={minEndDate}
          />
        </div>
        <Selector handleChange={option => setRoomType(option.value)} />
        <Button label='Search' 
          disable={!startDate || !endDate || !roomType} 
        />
      </section>
      <section className='hotel-list'>
        <ul>
          <li>
            <span>Room 1</span>
            <Button color='blue' label='Book' />
          </li>
          <li>
            <span>Room 2</span>
            <Button label='Sold out' disable />
          </li>
        </ul>
      </section>
    </div>
  );
}

export default App;
