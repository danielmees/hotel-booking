import React, { useState } from 'react';

import Selector from './components/Selector';
import DatePickerWrapper from './components/DatePicker';
import Button from './components/Button';

import './App.scss';

function App() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [roomType, setRoomType] = useState('');

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className='hotel-booking'>
      <h1>Hotel Booking</h1>
      <section className='search-container'>
        <DatePickerWrapper startDate={startDate}
          endDate={endDate}
          onChange={onChange}
        />
        <Selector handleChange={option => setRoomType(option.value)} />
        <Button label='Search' />
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
