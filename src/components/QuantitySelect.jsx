import { forwardRef } from 'react';
import { range } from '../utils';
import styles from './QuantitySelect.module.css';

const QuantitySelect = forwardRef((props, ref) => {
  const { id, name, label, minRange = 1, maxRange, value, onChange } = props;
  return (
    <div className={styles.quantity}>
      <label htmlFor={id}>{label}</label>
      <select name={name} id={id} value={value} onChange={onChange} ref={ref}>
        {range(minRange, maxRange).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
    </div>
  );
});

export default QuantitySelect;
