import {Frame, Navigation} from '@shopify/polaris';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const token = localStorage.getItem('token');
  return (
    <>
    <Frame>
    
      <Navigation location="/">
      <Link  to='/NewJob'>
        <Navigation.Section
          items={[
            { 
              label: 'NewJob',
              
            },
          ]}
        />
      </Link>
      <Link  to='/'>
        <Navigation.Section
          items={[
            {
              label: 'Home',
              
            },
          ]}
        />
      </Link>
      </Navigation>
    </Frame>
    </>
  );
}