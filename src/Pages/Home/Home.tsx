
import { Frame, Navigation } from '@shopify/polaris';
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div>
      <Frame>
        <Navigation location="/">
          <Link to='/CreateUser'>
            <Navigation.Section
              items={[
                { 
                  label: 'createUser',
                  
                },
              ]}
            />
          </Link>
        </Navigation>
      </Frame>
    </div>
  );
}
