
import React, { useState , useEffect } from 'react';
import { Formik, Form } from "formik";
import * as yup from 'yup';
import {TextField} from "@satel/formik-polaris";
import { Card, Button} from "@shopify/polaris";
import {useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { LOGIN_USER } from "../../Graphql/Mutations";
import './LogIn.css';

const validationSchema = yup.object({
    email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
    password: yup.string('Enter your password').min(6, 'Password should be of minimum 4 characters length').required('Password is required'),
    
  });

export default function LogIn() {
    const navigate = useNavigate();
    const [loginUser, { loading, error }] = useMutation(LOGIN_USER);

     const initialValues={
          email: 'maryam@example.com',
          password: 'maryam',   
        }

       
       const handleSubmit= async (values) => {
          try {
            const { data } = await loginUser({
              mutation: LOGIN_USER,
              variables: {
                email: values.email,
                password: values.password,
              },
            });
            console.log('Token:', data.login.token);
            if (data.login.token !== null) {
              navigate('/Users', { token: data.login.token });
            } else {
              alert('ایمیل و پسورد را درست وارد کنید');
              console.log('error');
            }
          } catch (error) {
            console.error('Error:', error);
          }
        
          console.log('values: ', values);
          localStorage.setItem('email',values.email);
          localStorage.setItem('password',values.password);
         
        }
      
        if (loading) return null;
        if (error) return `Error! ${error}`;
        
      
  return (
    <div className='form1'>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, dirty }) => (
        <>
          <Form>
            <Card>
              <TextField name="email" label="Email" />
              <TextField name="password" label="Password" type="password" />
              <Button submit primary > LogIn </Button>
           </Card>
         </Form>
        </>
      )}
      </Formik>
    </div>
       )
    }
