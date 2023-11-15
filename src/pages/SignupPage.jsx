import { Link } from 'react-router-dom';
import styles from './Signup.module.css';

const SignupPage = () => {
  return (
    <div className={styles.container}>
      <h1>Signup</h1>
      <form>
        <fieldset>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' id='email' />
        </fieldset>
        <fieldset>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' id='password' />
        </fieldset>
        <div>
          <button>Signup</button>
          <p>
            Already have an accounf? <Link to='/login'>Login</Link> instead
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
