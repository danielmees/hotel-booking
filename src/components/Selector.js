import React from 'react';
import Select from 'react-select';

import './Selector.scss';

const options = [
    { value: 'Single', label: 'Single' },
    { value: 'Double', label: 'Double' },
];
  
const Selector = ({ handleChange }) => (
    <Select options={options} 
        placeholder='Select room type...' 
        onChange={handleChange} 
        className='room-type-selector'
    />
);

export default Selector;