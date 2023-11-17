import Input from '../components/common/Input';
import AuthContainer from '../components/AuthContainer';
import { useEffect, useState } from 'react';
import { db } from '../config/db';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/common/Spinner';

const LoginPage = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  const inputChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const formSubmitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    const result = await db.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (result) {
      setLoading(false);
    }

    if (result.error) {
      setFormError(result.error.message);
      return;
    }

    navigate('/');
  };

  useEffect(() => {
    setTimeout(() => {
      setFormError(null);
    }, 10000);
  }, []);

  if (loading) return <Spinner />;
  return (
    <AuthContainer
      title='Login'
      redirectMessage='New User?'
      href='signup'
      formSubmitHandler={formSubmitHandler}
      error={formError}
    >
      <Input
        type='email'
        name='email'
        id='email'
        label='Email'
        value={values.email}
        onChange={inputChangeHandler}
      />
      <Input
        type='password'
        name='password'
        id='password'
        label='Password'
        value={values.password}
        onChange={inputChangeHandler}
      />
    </AuthContainer>
  );
};

export default LoginPage;
