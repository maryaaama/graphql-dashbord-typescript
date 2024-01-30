 import React from 'react';
 import './App.css';
 import {Routes , Route} from 'react-router-dom';
 import Home from './Pages/Home/Home.js';
 import NewJob from './Pages/Jobs/NewJob.js';
 import Register from './Pages/Register/Register.js';
 import JobList from './Pages/Jobs/JobList.js';
 import Job from './Pages/Jobs/Job.js';
 import LogIn from './Pages/LogIn/LogIn.js';
 import {ApolloProvider } from '@apollo/client';
 import {SetClient} from './component/SetClient/SetClient.js';
 import '@shopify/polaris/build/esm/styles.css';
 import Dashboard from './component/Dashboard/Dashboard.js';
import EditJob from './Pages/Jobs/EditJob.js';

function App (){ 
  return (
  <>
 <ApolloProvider client={SetClient}>
    <Routes>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path='/' element={<Home/>} />
        <Route path="/JobList" element={<JobList />} />
        <Route path='/NewJob' element={<NewJob/>} />
        <Route path='/Register' element={<Register/>} />
        <Route path='/LogIn' element={<LogIn/>} />
        <Route path='/Job' element={<Job/>} />
        <Route path='/JobList/Job/:id' element={<EditJob/>} />
    </Routes>
    </ApolloProvider>
  </>

  )
      }    
export default App;
