
import { Frame, Navigation } from '@shopify/polaris';
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div>
      <Frame>
        <Navigation location="/">
          <Link to='/Register'>
            <Navigation.Section
              items={[
                {
                  label: 'Register',

                },
              ]}
            />
          </Link>
        </Navigation>
      </Frame>
    </div>
  );
}
