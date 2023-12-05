import { memo, useContext, useEffect, useState } from 'react';
import { Alert, Button, Form, Row } from 'react-bootstrap';
import { setLocalStorage } from '../../utils/localstorage';
import { AppContext } from '../../hooks/useContext';
import { register } from '../../utils/apiHandle';
import { Link, NavLink, Navigate, useNavigate } from 'react-router-dom';
import { TOKEN_KEY } from '../../constans';
import { ACTIONS_AUTHOR } from '../../hooks/useApp';

const Register = () => {
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const [contentAlert, setContentAlert] = useState('');

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (key, value) => {
    setFormValue({
      ...formValue,
      [key]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formValue;
    if (name && email && password) {
      const res = await register({ formValue });
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
      <div className='flex m-b-20'>
        <h3>Sign up</h3>
      </div>

      <Form onSubmit={handleSubmit}>
        <Row className='mb-3'>
          <Form.Group className='mb-3' controlId='formGridAddress1'>
            <Form.Label>name</Form.Label>
            <Form.Control
              value={formValue.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formGridEmail'>
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

        <div className='flex align-item-center flex-space-between'>
          <Button variant='primary' type='submit'>
            Sign up
          </Button>
          <p className='flex align-item-center' style={{ margin: 0 }}>
            <NavLink
              to='/login'
              className={({ isActive, isPending }) =>
                isPending ? 'pending' : isActive ? 'active' : ''
              }
            >
              Login
            </NavLink>
          </p>
        </div>
      </Form>
      {contentAlert && (
        <Alert variant={'danger'} id='alert'>
          {contentAlert}
        </Alert>
      )}
    </div>
  );
};

export default memo(Register);
