import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

export default function ForgotPassword() {
  // Form fields
  const emailRef = useRef()

  // States
  const { resetPassword } = useAuth()
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  // Cancel all subscriptions and asynchronous tasks in a useEffect cleanup function
  // https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort  
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
      setMessage('')
      setError('')
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage('Check your inbox for further instructions')
    } catch (err) {
      setError('Failed to reset password')  
      console.log(err);      
    }

    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Reset Password</h2>
          {error && <Alert variant="danger">{error}</Alert>}          
          {message && <Alert variant="success">{message}</Alert>}          
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>                      
            <Button disabled={loading} className="w-100 mt-4" type="submit">Reset Password</Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Log In</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  )
}
