import React , { useCallback }from 'react'
import { useParams } from 'react-router-dom';
import {useNavigate } from 'react-router-dom';
import { Formik, Form } from "formik";
import { Card, Page, FormLayout ,ContextualSaveBar,Frame} from "@shopify/polaris";
import {TextField,Select} from "@satel/formik-polaris";
import * as yup from 'yup';
import './NewJob.css';
import SkillTest from './SkillTest';
import {useJobQuery,useUpdateJobMutation} from "../../generated/graphql";

const cityOptions:{ label: string; value: string }[] = [
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


const validationSchemaForm = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('description is required'),
  city: yup.string().required('City is required'),
  skills: yup.array().min(1).required("required !"),
});
export default function EditJob() {

  const navigate=useNavigate();
  let params=useParams<any>();
  console.log('params',params)
  const itemID = Number(params.id);
  console.log('itemID',itemID)
  const [updateJob,error] = useUpdateJobMutation();
 
  const { data ,loading ,error: queryError} = useJobQuery( {
    variables: { id: itemID },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
  });
  console.log('data',data);
 
  const value:any = data?.job?.job;
console.log('value.title', value?.title);

const formSkills = (value?.skills || []).map((skill: { title: string } | null) => {
  if (skill && typeof skill.title === 'string') {
    return skill.title.toLowerCase();
  } else {
    return ''; 
  }
});

console.log('formSkills', formSkills);

const initialValuesForm = {
  title: value?.title || "",
  description: value?.description || "",
  city: value?.city || "",
  skills: formSkills || [],
};
  const handleSubmitForm = useCallback(
    async (formValues:any) => {
      try {
        const { data } = await updateJob({
          variables: {
            id: itemID,
            title:formValues.title,
            description:formValues.description,
            city:formValues.city,
            skills:formValues.skills,
          },
        });
        if (data?.updateJob?.status) {
          navigate("/JobList");
        }
      } catch (err) {
        console.log('err',err);
      }
    },
    [updateJob, itemID]
  );

  
  if (loading) {
   
    return <p>Loading...</p>;
  }

  if (queryError) {
    
    return <p>Error fetching data: {queryError.message}</p>;
  }
  
  

  return (
   
    <div className="contain">
     
      <Page fullWidth title="Edit Job">

        <Frame>
        {data && ( 
          <Formik
            initialValues={initialValuesForm}
            validationSchema={validationSchemaForm}
            onSubmit={handleSubmitForm}
          >
            {({ values, dirty, submitForm }) => (
              <>
                <Form>
                  
                    <ContextualSaveBar
                      message="updete Job"
                      discardAction={{
                        onAction: () => {
                          navigate("/JobList");
                        },
                      }}
                      saveAction={{
                        disabled: !dirty,
                        onAction: submitForm,
                      }}
                    />
                  

                  <Card>
                    <FormLayout>
                      <TextField label="Title" name="title" autoComplete=""/>
                      <TextField label="Description" name="description" multiline={4} autoComplete=""/>
                      <Select label="city" name="city" options={cityOptions} />
                      <div className="skills">
                      <SkillTest label="Skills" name="skills" initialSelectedSkills={formSkills} />
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
           )}
        </Frame>
      </Page>
      
    </div>
   
);  
}
