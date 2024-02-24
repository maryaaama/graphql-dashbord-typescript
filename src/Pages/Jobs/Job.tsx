import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BlockStack,
  Button,
  ButtonGroup,
  Card,
  InlineGrid,
  Text,
  Tag,
  Modal,
  Banner,
} from "@shopify/polaris";
import { useDeleteJobMutation } from "../../generated/graphql";

export default function Job(value: any) {
  console.log("Jobvalue", value);
  console.log("Jobvalue.title", value.value.id);
  console.log(typeof value.value);
  const navigate = useNavigate();
  const [jobId, setJobId] = useState<number>(value.value.id);
  const [deleteJob] = useDeleteJobMutation();
  const [activeModal, setActiveModal] = useState(false);

  const handleChange = useCallback(
    () => setActiveModal(!activeModal),
    [activeModal]
  );
  const handleDeleteAction = useCallback(
    (id: number) => {
      setJobId(id);
      setActiveModal(true);
    },
    [setJobId, setActiveModal]
  );

  const deletHandler = useCallback(async () => {
    try {
      const { data } = await deleteJob({
        variables: {
          id: jobId,
        },
      });
      if (data?.deleteJob?.status) {
        navigate("/");
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
      <Card key={value.value.id} roundedAbove="sm">
        <BlockStack gap="400">
          <BlockStack gap="200">
            <Text as="h2" variant="headingSm">
              {value.value.title}
            </Text>
            <Text as="p" variant="bodyMd">
              {value.value.description}
            </Text>
          </BlockStack>
          <BlockStack gap="200">
            <InlineGrid columns="1fr auto">
              <Text as="h3" variant="headingSm" fontWeight="medium">
                {value.value?.skills?.map((skill: any) => (
                  <Tag key={skill.id}>{skill.title}</Tag>
                ))}
              </Text>
              <ButtonGroup>
                <Button
                  variant="primary"
                  tone="critical"
                  onClick={() => handleDeleteAction(jobId)}
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
                      content: "DELETE",
                      onAction: deletHandler,
                    }}
                    secondaryActions={[
                      {
                        content: "CLOSE",
                        onAction: handleChange,
                      },
                    ]}
                  >
                    <Modal.Section>
                      <Banner tone="warning">
                        <p>Are you sure you want to delete the job?</p>
                      </Banner>
                    </Modal.Section>
                  </Modal>
                )}
                <Button
                  variant="primary"
                  onClick={() => {
                    navigate(`./Job/${jobId}`);
                  }}
                  accessibilityLabel="Edit"
                >
                  Edit
                </Button>
              </ButtonGroup>
            </InlineGrid>
            <Text as="p" variant="bodyMd">
              {value.value.city}
            </Text>
          </BlockStack>
        </BlockStack>
      </Card>
    </>
  );
}
