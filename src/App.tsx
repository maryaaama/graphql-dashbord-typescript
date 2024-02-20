import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import NewJob from './Pages/Jobs/NewJob'; // Import NewJob once
import Register from './Pages/Register/Register'; // Import Register once
import JobList from './Pages/Jobs/JobList'; // Import JobList once
import Job from './Pages/Jobs/Job'; // Import Job once
import LogIn from './Pages/LogIn/LogIn';
import { ApolloProvider } from '@apollo/client';
import { SetClient } from './component/SetClient/SetClient';
import '@shopify/polaris/build/esm/styles.css';
import Dashboard from './component/Dashboard/Dashboard';
import EditJob from './Pages/Jobs/EditJob';
import { BrowserRouter } from 'react-router-dom';

function App (){ 
  return (
  <>
 <ApolloProvider client={SetClient}>
  <BrowserRouter>
    <Routes>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path='/' element={<Home/>} />
        <Route path="/JobList" element={<JobList />} />
        <Route path="/NewJob/NewJob" element={<NewJob />} />
        <Route path="/NewJob/NewJob/*" element={<JobList />} />
        <Route path="/NewJob/JobList" element={<JobList />} />
        <Route path='/NewJob' element={<NewJob/>} />
        <Route path='/Register' element={<Register/>} />
        <Route path='/LogIn' element={<LogIn/>} />
        <Route path='/Job' element={<Job/>} />
        <Route path='/JobList/Job/:id' element={<EditJob/>} />
        <Route path='/NewJob/JobList/Job/:id' element={<EditJob/>} />
    </Routes>
    </BrowserRouter>
    </ApolloProvider>
  </>

  )
      }    
export default App;
