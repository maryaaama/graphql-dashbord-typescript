import React, { useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from "formik";
import { Card, Page, FormLayout ,ContextualSaveBar,Frame} from "@shopify/polaris";
import {TextField,Select} from "@satel/formik-polaris";
import * as yup from 'yup';
import './NewJob.css';
import Skills from "./Skills";
import {useCreateJobMutation} from "../../generated/graphql";
import SkillTest from './SkillTest';

const OPTIONS:{ label: string; value: string }[] = [
  { label: "Select", value: "select" },
  { label: "tehran", value: "tehran" },
  { label: "ahvaz", value: "ahvaz" },
  { label: "shiraz", value: "shiraz" },
  { label: "esfahan", value: "esfahan" },
  { label: "mashhad", value: "mashhad" },
  { label: "tabriz", value: "tabriz" },
  { label: "zanjan", value: "zanjan" },
  { label: "boshehr", value: "boshehr" },
];


const validationSchema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('description is required'),
  city: yup.string().required('City is required'),
  skills: yup.array().min(1).required("required !"),
});


const initialValues: {
  title: string;
  description: string;
  city: string;
  skills: string[];
} = {
  title: "",
  description: "",
  city: "",
  skills: [],
 
}
 export default function NewJob() {

  const [createJob, { error }] = useCreateJobMutation();
  
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (values: any) => {
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
  
        if (data?.createJob.status) {
          console.log('Job created successfully:', data?.createJob.job);
          navigate('./JobList');
        } else {
          console.log('Failed to create job:', data?.createJob.message);
        }
      } catch (error) {
        console.error('GraphQL mutation error:', error);
      }
    },
    [createJob],
  );
  
  return (
   
    <div className="contain">
       <Page fullWidth title="New Job" >
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
      {({ values, dirty ,submitForm}) => (
        <>
            <Form >
                  {dirty ? (
                    <ContextualSaveBar
                      message="maryam alipour"
                      discardAction={{
                        onAction: () => {
                        
                          navigate('/JobList');
                        },
                      }}
                      saveAction={{
                        disabled: !dirty,
                        onAction: submitForm,
                      }}
                    />
                  ) : null}

            <Card>
              <FormLayout>
              <TextField label="Title" name="title" autoComplete="" />
                <TextField label="Description" name="description"  multiline={4} autoComplete=""/>
                  <Select label="city" name="city" options={OPTIONS} />
                  <div className="skills">
                  {/*<Skills  label="Skills" name="skills" />*/}
                  <SkillTest label="Skills" name="skills"></SkillTest>
                   </div>
                   
              </FormLayout>
            </Card>
          </Form>
          <br />
          <Card>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Card>
        </>
      )}
    </Formik>
    </Frame>
    </Page>
    </div>
  );
}









