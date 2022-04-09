import React, { useState } from 'react';

import Selector from './components/Selector';
import DatePickerWrapper from './components/DatePicker';
import Button from './components/Button';
import { addDays, compareDates } from './utils/date';

import './App.scss';

import rooms from './assets/rooms.json';

function App() {
  const [startDate, setStartDate] = useState(null);
  const [minEndDate, setMinEndDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [roomType, setRoomType] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const handleStartDateChange = date => {
    setStartDate(date); 
    const newMinEndDate = addDays(date, 1);
    setMinEndDate(newMinEndDate);
  };

  const handleSearch = () => {
    if (!startDate || !endDate || !roomType || !rooms) return;

    const searchResult = [];

    rooms.forEach(room => {
      if (room['room-type'] === roomType) {
        let isRoomAvailable = true;
        room.booked.forEach(bookDate => {
          const compareCheckIn = compareDates(startDate, bookDate[1]);
          const compareCheckOut = compareDates(endDate, bookDate[0]);

          if (!(compareCheckIn === 'same' || compareCheckIn === 'after' || compareCheckOut === 'same' || compareCheckOut === 'before')) {
            isRoomAvailable = false;
          }
        });

        if (isRoomAvailable) {
          searchResult.push({ room: room.room, isAvailable: true });
        } else {
          searchResult.push({ room: room.room, isAvailable: false });
        }

        setSearchResult(searchResult);
      }
    });
  }

  const renderSearchResultList = () => {
    if (searchResult.length === 0) {
      return null;
    } else {
      const lists = searchResult.map(room => <li key={room.room}>
        <span>{room.room}</span>
        <Button color='blue' 
          label={room.isAvailable ? 'Book' : 'Sold out'} 
          disable={!room.isAvailable} 
        />
      </li>);
      return <ul>{lists}</ul>;
    }
  }
  
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
          handleClick={handleSearch}
        />
      </section>
      <section className='hotel-list'>
        {renderSearchResultList()}
      </section>
    </div>
  );
}

export default App;
