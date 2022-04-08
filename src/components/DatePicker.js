import React from 'react';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import './DatePicker.scss';

const DatePickerWrapper = ({ date, handleChange, placeholderText, minDate }) => (
    <div>
        <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={date}
            onChange={handleChange}
            className='date-picker-input'
            minDate={minDate}
            placeholderText={placeholderText}
        /> 
    </div>
);

export default DatePickerWrapper;
  

  