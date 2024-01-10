import React from 'react';
import {Page, Grid} from '@shopify/polaris';
import SidBBBar from '../../component/Sidbar/SidBar.js';

export default function Users() {
  return (
    <>
  <Page fullWidth>
    <Grid>
       <Grid.Cell   columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}> <SidBBBar/> </Grid.Cell>
       <Grid.Cell   columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}> </Grid.Cell>
    </Grid>
  </Page>
   
    
    </> 
  )
}