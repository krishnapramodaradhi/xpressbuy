import { Link } from 'react-router-dom';
import styles from './AuthContainer.module.css';
import Banner from './common/Banner';

const AuthContainer = ({
  children,
  redirectMessage,
  href,
  title,
  error,
  formSubmitHandler,
}) => {
  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      {error && <Banner message={error} />}
      <form onSubmit={formSubmitHandler}>
        {children}
        <div>
          <button>Submit</button>
          <p>
          {redirectMessage}
          <Link to={`/${href}`}>{href}</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default AuthContainer;
