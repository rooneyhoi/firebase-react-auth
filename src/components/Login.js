import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

export default function Login() {
  // Form fields
  const emailRef = useRef()
  const passwordRef = useRef()

  // States
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  // Err (fixed): can't perform a React state update on an unmounted component.
  // This happens after login successfully and redirect to Dashboard
  // This is a no-op, but it indicates a memory leak in your application. 
  // To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function  
  useEffect(() => {
    const controller = new AbortController();
    return () => {
      controller.abort();
    }
  }, [])
  
  // To handle login to Firebase
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      navigate('/')
    } catch (err) {
      setError('Failed to log in')      
      console.log(err);      
    }

    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}          
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required></Form.Control>
            </Form.Group>            
            <Button disabled={loading} className="w-100 mt-4" type="submit">Log In</Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  )
}
