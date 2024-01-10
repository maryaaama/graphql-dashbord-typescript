import React, { useState , useEffect , useCallback} from 'react';
import { Formik, Form } from "formik";
import * as yup from 'yup';
import { Card, Button,FormLayout  } from "@shopify/polaris";
import {TextField} from "@satel/formik-polaris";
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { CREATE_USER } from "../../Graphql/Mutations";
import './CreateUser.css';

const validationSchema = yup.object({
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  password: yup.string('Enter your password').min(6, 'Password should be of minimum 4 characters length').required('Password is required'),
  confirmpassword: yup.string('Enter your confirmpassword').min(6, 'confirmpassword should be of minimum 4 characters length').required('confirmpassword is required'),
});

export default function CreateUser() {
  const [createUser, { loading, error  }] = useMutation(CREATE_USER);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

 
 
    const initialValues= {
      email: 'maryam@example.com',
      password: 'maryam',
      confirmpassword: 'maryam',
    };
    

  const handleSubmit =  useCallback(
    
    async (values) => {
      console.log('handelsubmit value',values);
      if (values.password === values.confirmpassword) {

        try {
          const { data } = await createUser({
            mutation: CREATE_USER,
            variables: {
              email: values.email,
              password: values.password,
            },
          });
          console.log('message:', data.createUser.message);
          console.log('status:', data.createUser.status);
          setUsers(values)
          navigate('/LogIn');
         
        } catch (error) {
          console.error('error: ', error);
          alert('error: ' + error);
        }
       
      }
      else{
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
       {({  dirty }) => (
        <>
          <Form>
          <Card sectioned>
          <FormLayout>
            <TextField label="Email" name="email" />
            <TextField label="Password" name="password"  />
            <TextField label="Confirm Password" name="confirmpassword" />
            <Button submit primary > Save </Button>
          </FormLayout>
            </Card>
          </Form>
          </>
        ) }
      </Formik>
     
      </div>  
  );
}
