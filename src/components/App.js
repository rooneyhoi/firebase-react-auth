import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthProvider } from '../context/AuthContext';
import Dashboard from './Dashboard';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import Signup from './Signup';
import UpdateProfile from './UpdateProfile';

function App() {
  return (
    
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh"}}>
        <div className="w-100" style={{ maxWidth: "400px"}}>
          <Router>
            <AuthProvider> 
              <Routes>                
                <Route exact path='/' element={<PrivateRoute/>}>
                  <Route exact path='/' element={<Dashboard/>}/>
                </Route>
                <Route path="/update-profile" element={<UpdateProfile />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="//forgot-password" element={<ForgotPassword />} />
              </Routes>
            </AuthProvider> 
          </Router>          
        </div>
      </Container>    
  );
}

export default App;
