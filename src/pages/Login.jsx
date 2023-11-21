import Input from '../components/common/Input';
import AuthContainer from '../components/AuthContainer';
import { useEffect, useState } from 'react';
import { db } from '../config/db';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../components/common/Spinner';

const LoginPage = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (location.state?.message) {
      setFormError(location.state.message);
    }
    setTimeout(() => {
      setFormError(null);
    }, 10000);
  }, []);

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
    localStorage.setItem('token', result.data.session.access_token)
    localStorage.setItem('userId', result.data.session.user.id)
    if(location.state?.pathname) {
      navigate(location.state?.pathname, { replace: true })
    } else {
      navigate('/', { replace: true });
    }
  };

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
