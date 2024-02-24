
import React from 'react';
import { Formik, Form } from "formik";
import * as yup from 'yup';
import { TextField } from "@satel/formik-polaris";
import { Card, Button } from "@shopify/polaris";
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from "../../generated/graphql";
import './LogIn.css';

const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(6, 'Password should be of minimum 4 characters length').required('Password is required'),

});

export default function LogIn() {
  const navigate = useNavigate();
  const [loginUser, { loading, error }] = useLoginMutation();

  const initialValues: { email: string; password: string } = {
    email: 'maryam@example.com',
    password: 'maryam',
  }


  const handleSubmit = async (values: any) => {
    try {
      const { data } = await loginUser({
        // mutation: LOGIN_USER,
        variables: {
          email: values.email,
          password: values.password,
        },

      });
      console.log('Token:', data?.login.token);

      if (data && data.login && data.login.token) {
        localStorage.setItem('token', data.login.token);
        localStorage.setItem('user', data.login.user?.email ?? '');
        navigate('/Dashboard');
      } else {
        alert('ایمیل و پسورد را درست وارد کنید');
        console.log('error');
      }

    } catch (error) {
      console.error('Error:', error);
    }

    console.log('values: ', values);
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
                <TextField name="email" label="Email" autoComplete="" />
                <TextField name="password" label="Password" type="password" autoComplete="" />
                <Button submit variant="primary" > LogIn </Button>
              </Card>
            </Form>
          </>
        )}
      </Formik>
    </div>
  )
}
