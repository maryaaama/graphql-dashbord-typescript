import React, { useCallback, useState} from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import {
  BlockStack,
  Button,
  ButtonGroup,
  Card,
  InlineGrid,
  Text,
  Tag,
  Modal,
  Banner
} from '@shopify/polaris';
import {DELETE_JOB} from '../../Graphql/Mutations.js';


export default function Job({ value }) {

  console.log('job value',value);
  
  const navigate = useNavigate();
  const[jobId,setJobId]=useState();
  const [deleteJob]=useMutation(DELETE_JOB);
  const [activeModal, setActiveModal] = useState(false);

  const handleChange = useCallback(() => setActiveModal(!activeModal), [activeModal]); 
  const handleDeleteAction = useCallback((id) => {
    setJobId(id);
    setActiveModal(true);
  }, [setJobId, setActiveModal]);
  
  const deletHandler = useCallback(async () => {
    try {
      const { data } = await deleteJob({
        variables: {
          id: jobId,
        },
      });
      if (data?.deleteJob?.status) {
        navigate("/JobList");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActiveModal(false);
    }
  }, [deleteJob, jobId, navigate, setActiveModal]);
  
  
  return (
    <>
        <Card key={value.id} roundedAbove="sm">
          <BlockStack gap="400">
            <BlockStack gap="200">
              <Text as="h2" variant="headingSm">
                {value.title}
              </Text>
              <Text as="p" variant="bodyMd">
                {value.description}
              </Text>
            </BlockStack>
            <BlockStack gap="200">
            <InlineGrid columns="1fr auto">
              <Text as="h3" variant="headingSm" fontWeight="medium">
               {value.skills.map((skill) => (
               <Tag key={skill.id}>{skill.title}</Tag>
                ))}
               </Text>
                <ButtonGroup>
                <Button
                 variant="primary"
                 tone="critical"
                 onClick={() => handleDeleteAction(value.id)}
                 accessibilityLabel="Delete"
                  >
                 Delete
                 </Button>
                 {activeModal && (
                     <Modal
                     open={activeModal}
                     onClose={handleChange}
                     title="DLETE MODAL"
                     primaryAction={{
                     content: 'DELETE',
                     onAction: deletHandler,
                     }}
                    secondaryActions={[
                    {
                   content: 'CLOSE',
                  onAction: handleChange,
                  },
                   ]}
                 >
               <Modal.Section>
               <Text>
               <Banner  tone="warning">
                <p>
                Are you sure you want to delete the job?
                </p>
               </Banner>
               
             </Text>
            </Modal.Section>
            </Modal>
           )}
                  <Button
                    variant="primary"
                    onClick={() => { navigate(`./Job/${value.id}`)}}
                    accessibilityLabel="Edit"
                  >
                    Edit
                  </Button>
                </ButtonGroup>
              </InlineGrid>
              <Text as="p" variant="bodyMd">
                {value.city}
              </Text>
            </BlockStack>
          </BlockStack>
        </Card>
      
    </>
  );
  
}

