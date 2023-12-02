import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider, CSSReset, Box } from '@chakra-ui/react';
import SignIn from './SignIn';
import Home from './Home';
import Register from './Register';
import Diet from './Diet';
import Class from './Class';

const App = () => {
  return (
    <ChakraProvider>
      <CSSReset />
      <Box textAlign="center" fontSize="xl">
        <Router>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/diet" element={<Diet />} />
            <Route path="/class" element={<Class />} />
          </Routes>
        </Router>
      </Box>
    </ChakraProvider>
  );
};


export default App;
