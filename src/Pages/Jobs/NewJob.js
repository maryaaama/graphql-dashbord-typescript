import React, { useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from "formik";
import { Card, Button, FormLayout ,ContextualSaveBar,Frame} from "@shopify/polaris";
import {TextField,Select} from "@satel/formik-polaris";
import * as yup from 'yup';
import './NewJob.css';
import { useMutation } from '@apollo/client';
import Skills from "./Skills";
import { CREATE_JOB } from "../../Graphql/Mutations";


const OPTIONS = [
  { label: "tehran", value: "tehran" },
  { label: "ahvaz", value: "ahvaz" },
  { label: "shiraz", value: 'shiraz' },
  { label: "esfahan", value: 'esfahan' },
  { label: "mashhad", value: 'mashhad' },
  { label: "tabriz", value: 'tabriz' },
  { label: "zanjan", value: 'zanjan' },
  { label: "boshehr", value: 'boshehr' },
];


const validationSchema = yup.object({
  title: yup.string('Enter your title').required('Title is required'),
  description: yup.string('Enter your description').required('description is required'),
  city: yup.string('Enter your city').required('City is required'),
  skills: yup.array().min(1).required("required !"),
});


const initialValues= {
  title: '',
  description:'',
  city:'',
  skills:[],
 
}
 export default function NewJob() {

  const [createJob, { error }] = useMutation(CREATE_JOB);
  const navigate = useNavigate();
  const handleSubmit =  useCallback(
    
    async (values) => {
      console.log(values);
      try {
        const { data } = await createJob({
          variables: {
            title: values.title,
            description: values.description,
            city: values.city,
            skills: values.skills,
          },
        });
        if (data.createJob.status) {
         console.log('yas');
        }
      } catch {
        console.log(error);
      }
    },
    [createJob, error],
  );
  return (
    <div className="contain">
      <Frame
       logo={{
        width: 86,
        contextualSaveBarSource:
          'https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png',
      }}
      >
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, dirty ,submitForm, isSubmitting}) => (
        <>
            <Form>
                  {dirty ? (
                    <ContextualSaveBar
                      message="Unsaved changes"
                      discardAction={{
                        onAction: () => {
                          navigate("/NewJobs");
                        },
                      }}
                      saveAction={{
                        disabled: !dirty,
                        onAction: submitForm,
                      }}
                    />
                  ) : null}

            <Card sectioned>
              <FormLayout>
                <TextField label="Title" name="title" />
                <TextField label="Description" name="description"  multiline={4}/>
                  <Select label="city" name="city" options={OPTIONS} />
                  <div className="skills">
                  <Skills  label="Skills" name="skills" />
                   </div>
               
              </FormLayout>
            </Card>
          </Form>
          <br />
          <Card subdued sectioned title="Internal Form Values">
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Card>
        </>
      )}
    </Formik>
    </Frame>
    </div>
  );
}

