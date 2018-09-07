import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ title, id, name, type, value, handleChange }) => (
  <label htmlFor={id}>
    {title}:
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={handleChange}
    />
  </label>
);

Input.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Input;
