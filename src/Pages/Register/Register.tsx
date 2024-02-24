import React, { useState, useEffect, useCallback } from 'react';
import { Formik, Form } from "formik";
import * as yup from 'yup';
import { Card, Button, FormLayout } from "@shopify/polaris";
import { TextField } from "@satel/formik-polaris";
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { CREATE_USER } from "../../Graphql/Mutations";
import { useCreateUserMutation } from "../../generated/graphql";
import './Register.css';

const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(6, 'Password should be of minimum 4 characters length').required('Password is required'),
  confirmpassword: yup.string().min(6, 'confirmpassword should be of minimum 4 characters length').required('confirmpassword is required'),
});

export default function Register() {
  const [createUser, { loading, error }] = useCreateUserMutation();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);



  const initialValues = {
    email: 'maryam@example.com',
    password: 'maryam',
    confirmpassword: 'maryam',
  };


  const handleSubmit = useCallback(

    async (values: any) => {
      console.log('handelsubmit value', values);
      if (values.password === values.confirmpassword) {

        try {
          const { data } = await createUser({

            variables: {
              email: values.email,
              password: values.password,
            },
          });

          setUsers(values)
          navigate('/LogIn');

        } catch (error) {
          console.error('error: ', error);
          alert('error: ' + error);
        }

      }
      else {
        alert('match password and confirmpassword');
      }
    },
    [createUser, error],
  );

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <div className='form2'>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ dirty }) => (
          <>
            <Form>
              <Card>
                <FormLayout>
                  <TextField label="Email" name="email" autoComplete="" />
                  <TextField label="Password" name="password" autoComplete="" />
                  <TextField label="Confirm Password" name="confirmpassword" autoComplete="" />
                  <Button submit variant="primary" > Save </Button>
                </FormLayout>
              </Card>
            </Form>
          </>
        )}
      </Formik>

    </div>
  );
}
