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
        <Selector handleChange={roomType => setRoomType(roomType.value)} />
        <Button label='Search' />
      </section>
      <section className='hotel-list'>
      </section>
    </div>
  );
}

export default App;
