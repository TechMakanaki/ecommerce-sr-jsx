// Login.jsx
import React, { useState, useContext } from 'react';
import './CSS/login.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';
import { storeUser } from '../helpers';

const initialUser = { password: '', identifier: '' };

export const Login = () => {
  const [user, setUser] = useState(initialUser);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevents page reload
    const url = 'http://localhost:1337/api/auth/local';
    try {
      if (user.identifier && user.password) {
        const { data } = await axios.post(url, user);
        if (data.jwt) {
          storeUser(data);
          login(data.jwt); // Use the login function from AuthContext
          setUser(initialUser);
          setSuccess('Login successful!');
          setError('');
          navigate('/');
        }
      } else {
        setError('Please fill in both email and password.');
        setSuccess('');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login. Please check your credentials and try again.');
      setSuccess('');
    }
  };

  return (
    <Container className="cont mt-4">
      <Row className="justify-content-center">
        <Card className="p-4" style={{ maxWidth: '500px' }}>
          <form onSubmit={handleLogin}>
            <h3>Sign In</h3>
            <br />
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <div className="mb-3">
              <label>Email address:</label>
              <input
                type="email"
                name="identifier"
                value={user.identifier}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter email"
                required
              />
            </div>
            <div className="mb-3">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter password"
                required
              />
            </div>
            <div className="mb-3">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>
            <div className="d-grid">
              <Button type="submit" className="btn btn-primary">
                Submit
              </Button>
              <h6>
                Click <Link to="/register">Here</Link> to Sign Up
              </h6>
            </div>
            <br />
          </form>
        </Card>
      </Row>
    </Container>
  );
};
