 import React from 'react';
 import './App.css';
 import {Routes , Route} from 'react-router-dom';
 import Home from './Pages/Home/Home.js';
 import NewJob from './Pages/Jobs/NewJob.js';
 import Register from './Pages/Register/Register.js';
 import JobList from './Pages/Jobs/JobList.js';
 import LogIn from './Pages/LogIn/LogIn.js';
 import {ApolloProvider } from '@apollo/client';
 import {SetClient} from './component/SetClient/SetClient.js';
 import '@shopify/polaris/build/esm/styles.css';
 import Dashboard from './component/Dashboard/Dashboard.js';

function App (){ 
  return (
  <>
 <ApolloProvider client={SetClient}>
    <Routes>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path='/Home' element={<Home/>} />
        <Route path='/Client' element={<Client/>} />
        <Route path="/JobList" element={<JobList />} />
        <Route path='/NewJob' element={<NewJob/>} />
        <Route path='/Register' element={<Register/>} />
        <Route path='/LogIn' element={<LogIn/>} />
    </Routes>
    </ApolloProvider>
  </>

  )
      }    
export default App;
