import React from 'react';
import './App.css';
import {Routes , Route} from 'react-router-dom';
import Home from './Pages/Home/Home.js';
 import NewJob from './Pages/Jobs/NewJob.js';
 import Users from './Pages/Users/UserList.js';
 import CreateUser from './Pages/NewUser/CreateUser.js';
 import JobList from './Pages/Jobs/JobList.js';
 import LogIn from './Pages/LogIn/LogIn.js';
 import '@shopify/polaris/build/esm/styles.css';
 import {AppProvider} from '@shopify/polaris';
function App (){ 
  return (
  <>
  <AppProvider>
 
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/Users' element={<Users/>} />
        <Route path="/JobList" element={<JobList />} />
        <Route path='/NewJob' element={<NewJob/>} />
        <Route path='/CreateUser' element={<CreateUser/>} />
        <Route path='/LogIn' element={<LogIn/>} />
    </Routes>

  </AppProvider>
  </>

  )
      }    
export default App;
