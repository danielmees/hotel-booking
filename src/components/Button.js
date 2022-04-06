import React from 'react';
import './Button.scss';

const Button = ({ label, color, handleClick, disable }) => {
    const className = `btn${color ? ` btn--${color}` : ''}${disable ? ' btn--disable' : ''}`;

    return <button className={className} onClick={handleClick}>
        {label}
    </button>;
};
    


export default Button;