import { useContext, useEffect, useState } from 'react';
import { Alert, Button, Form, Row } from 'react-bootstrap';
import { setLocalStorage } from '../../utils/localstorage';
import { AppContext } from '../../hooks/useContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { TOKEN_KEY } from '../../constans';
import { login } from '../../utils/apiHandle';
import { ACTIONS_AUTHOR } from '../../hooks/useApp';

const Login = () => {
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const [contentAlert, setContentAlert] = useState('');
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
  });

  const handleChange = (key, value) => {
    setFormValue({
      ...formValue,
      [key]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formValue;
    if (email && password) {
      const res = await login({ formValue });
      if (!res.status) {
        setContentAlert(res.errors[0]);
        return;
      }
      setLocalStorage(TOKEN_KEY, res.data.token);

      dispatch({
        type: ACTIONS_AUTHOR.AUTHOR,
        payload: res.data,
      });
      navigate('/');
    } else {
      dispatch({
        type: ACTIONS_AUTHOR.AUTHOR,
        payload: null,
      });
    }
  };

  useEffect(() => {
    if (contentAlert) {
      setTimeout(() => {
        setContentAlert('');
      }, 2000);
    }
  }, [contentAlert]);

  return (
    <div style={{}}>
      <div className='flex flex-end m-b-20'>
        <NavLink
          to='/register'
          className={({ isActive, isPending }) =>
            isPending ? 'pending' : isActive ? 'active' : ''
          }
        >
          Register
        </NavLink>
      </div>
      <Form onSubmit={handleSubmit}>
        <Row className='mb-3'>
          <Form.Group controlId='formGridEmail'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              value={formValue.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='formGridPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              value={formValue.password}
              onChange={(e) => handleChange('password', e.target.value)}
            />
          </Form.Group>
        </Row>

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
      {contentAlert && (
        <Alert variant={'danger'} id='alert'>
          {contentAlert}
        </Alert>
      )}
    </div>
  );
};

export default Login;
