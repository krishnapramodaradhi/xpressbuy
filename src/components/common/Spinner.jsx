import styles from './Spinner.module.css';

const Spinner = () => {
  return (
    <>
      <div className={styles.backdrop}></div>
      <div className={styles.container}>
        <div className={styles.ldsEllipsis}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Spinner;
