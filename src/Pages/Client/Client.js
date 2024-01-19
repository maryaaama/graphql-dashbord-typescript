import React from 'react';
import {Page, Grid} from '@shopify/polaris';
import Dashboard from '../../component/Dashboard/Dashboard';
import { useCallback, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";


export default function Client() {
  return (
    <>
  <Page fullWidth>
    <Grid>
       <Grid.Cell   columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}> <Dashboard/> </Grid.Cell>

       <Grid.Cell   columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}> </Grid.Cell>
    </Grid>
  </Page>
   
    
    </> 
  )
}