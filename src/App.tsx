 import React from 'react';
 import './App.css';
 import {Routes , Route} from 'react-router-dom';
 import Home from './Pages/Home/Home';
 import NewJob from './Pages/Jobs/NewJob';
 import Register from './Pages/Register/Register';
 import JobList from './Pages/Jobs/JobList';
 import Job from './Pages/Jobs/Job';
 import LogIn from './Pages/LogIn/LogIn';
 import {ApolloProvider } from '@apollo/client';
 import {SetClient} from './component/SetClient/SetClient';
 import '@shopify/polaris/build/esm/styles.css';
 import Dashboard from './component/Dashboard/Dashboard';
import EditJob from './Pages/Jobs/EditJob';

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
