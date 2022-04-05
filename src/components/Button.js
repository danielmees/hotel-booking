import React from 'react';
import './Button.scss';

const Button = ({ label, color, handleClick }) => (
    <button className={`btn btn--${color}`} onClick={handleClick}>
        {label}
    </button>
);

export default Button;