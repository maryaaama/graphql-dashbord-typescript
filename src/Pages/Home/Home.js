/*import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    
     <div className='countainer'>
  <Link to='/CreateUser'> 
      <h1>createUser</h1>
  </Link>
 
   </div>  
  
  )
}
*/
import {Frame, Navigation} from '@shopify/polaris';
import { OrdersMinor} from '@shopify/polaris-icons';
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
export default function Home() {
  return (
    <>
    <Frame>
    
      <Navigation location="/">
      <Link  to='/CreateUser'>
        <Navigation.Section
          items={[
            { 
              label: 'createUser',
              icon: OrdersMinor ,
            },
          ]}
        />
      </Link>
      
      </Navigation>
    </Frame>
    </>
  );
}