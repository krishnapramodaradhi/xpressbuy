import { FaPlus } from 'react-icons/fa6';
import styles from './CategoryFilter.module.css';
import { Fragment } from 'react';

const CategoryFilter = ({ selectedCategories, onRemoveCategoryFilter }) => {
  return (
    <Fragment>
      {selectedCategories && !!selectedCategories.split(',').length && (
        <div className={styles.container}>
          {selectedCategories.split(',').map((cat) => (
            <span key={cat}>
              <span>{cat}</span>
              <span onClick={onRemoveCategoryFilter.bind(null, cat)}>
                <FaPlus />
              </span>
            </span>
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default CategoryFilter;
