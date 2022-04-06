import React from 'react';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import './DatePicker.scss';

const DatePickerWrapper = ({ startDate, endDate, onChange }) => (
    <div>
        <DatePicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            className='date-picker-input'
            selectsRange
            minDate={new Date()}
            placeholderText="Select two dates"
        /> 
    </div>
);

export default DatePickerWrapper;
  

  