import React from 'react';
import {
  BlockStack,
  Button,
  ButtonGroup,
  Card,
  InlineGrid,
  Text,
  Tag
} from '@shopify/polaris';

export default function Job({ value }) {
  console.log('job value',value)
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
                    onClick={() => {}}
                    accessibilityLabel="Delete"
                  >
                    Delete
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {}}
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


