import { useState } from 'react';
import styles from './Input.module.css';

const Input = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const { label, errorMessage, ...inputProps } = props;

  const onFocusedHandler = () => {
    setIsFocused(true);
  };
  return (
    <fieldset>
      <label htmlFor={inputProps.id}>{label}</label>
      <input
        {...inputProps}
        focused={isFocused.toString()}
        onBlur={onFocusedHandler}
        onFocus={() => inputProps.name === 'confirmPassword' && setIsFocused(true)}
      />
      <span>{errorMessage}</span>
    </fieldset>
  );
};

export default Input;
