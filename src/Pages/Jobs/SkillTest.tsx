import React from 'react';
import { useFormikContext, useField } from 'formik';
import {
  BlockStack,
  Tag,
  Listbox,
  EmptySearchResult,
  Combobox,
  Text,
  AutoSelection,
} from '@shopify/polaris';
import { useState, useCallback, useMemo } from 'react';
import { useSkillsQuery } from "../../generated/graphql";

export default function SkillTest({ label, initialSelectedSkills, ...props }: any) {
  const { setFieldValue, setFieldError } = useFormikContext();
  const [field, meta] = useField(props);
  const [selectedTags, setSelectedTags] = useState<string[]>(['frountend']);
  const [value, setValue] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const { data, refetch } = useSkillsQuery({
    variables: {
      title: value,
      limit: 10,
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
  });

  const name: string = props.name;
  const handleSelectChange = useCallback(
    (value: string[]) => {
      setFieldValue(name, value);
      console.log(value);
    },
    [name, setFieldValue]
  );
  const handleActiveOptionChange = useCallback(
    (activeOption: string) => {
      const activeOptionIsAction = activeOption === value;

      if (!activeOptionIsAction && !selectedTags.includes(activeOption)) {
        setSuggestion(activeOption);
      } else {
        setSuggestion('');
      }
    },
    [value, selectedTags],
  );
  const updateSelection = useCallback(
    (selected: string) => {
      const nextSelectedTags = new Set([...selectedTags]);

      if (nextSelectedTags.has(selected)) {
        nextSelectedTags.delete(selected);
      } else {
        nextSelectedTags.add(selected);
      }
      setSelectedTags([...nextSelectedTags]);
      setValue('');
      setSuggestion('');
      handleSelectChange([...nextSelectedTags]);
    },
    [selectedTags],
  );

  const removeTag = useCallback(
    (tag: string) => () => {
      updateSelection(tag);
    },
    [updateSelection],
  );

  const getAllTags = useCallback(() => {
    let savedTags: string[] = [];

    if (data?.skills?.skills) {
      savedTags = data.skills.skills.map((saveData: any) => saveData.title);
    } else {
      console.log("error");
    }

    const allTags: any = [...new Set([...savedTags, ...selectedTags].sort())];


    return allTags;
  }, [data?.skills, selectedTags]);

  const formatOptionText = useCallback(
    (option: string) => {
      const trimValue = value.trim().toLocaleLowerCase();
      const matchIndex = option.toLocaleLowerCase().indexOf(trimValue);

      if (!value || matchIndex === -1) return option;

      const start = option.slice(0, matchIndex);
      const highlight = option.slice(matchIndex, matchIndex + trimValue.length);
      const end = option.slice(matchIndex + trimValue.length, option.length);

      return (
        <p>
          {start}
          <Text fontWeight="bold" as="span">
            {highlight}
          </Text>
          {end}
        </p>
      );
    },
    [value],
  );

  const escapeSpecialRegExCharacters = useCallback(
    (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
    [],
  );

  const options = useMemo(() => {
    let list;
    const allTags = getAllTags();
    const filterRegex = new RegExp(escapeSpecialRegExCharacters(value), 'i');

    if (value) {
      list = allTags.filter((tag: string) => tag.match(filterRegex));
    } else {
      list = allTags;
    }

    return [...list];
  }, [value, getAllTags, escapeSpecialRegExCharacters]);


  const verticalContentMarkup =
    selectedTags.length > 0 ? (
      <BlockStack gap="500">
        {selectedTags.map((tag) => (
          <Tag key={`option-${tag}`} onRemove={removeTag(tag)}>
            {tag}
          </Tag>
        ))}
      </BlockStack>
    ) : null;

  const optionMarkup =
    options.length > 0
      ? options.map((option) => {
        return (
          <Listbox.Option
            key={option}
            value={option}
            selected={selectedTags.includes(option)}
            accessibilityLabel={option}
          >
            <Listbox.TextOption selected={selectedTags.includes(option)}>
              {formatOptionText(option)}
            </Listbox.TextOption>
          </Listbox.Option>
        );
      })
      : null;

  const noResults = value && !getAllTags().includes(value);

  const actionMarkup = noResults ? (
    <Listbox.Action value={value}>{`Add "${value}"`}</Listbox.Action>
  ) : null;

  const emptyStateMarkup = optionMarkup ? null : (
    <EmptySearchResult
      title=""
      description={`No tags found matching "${value}"`}
    />
  );

  const listboxMarkup =
    optionMarkup || actionMarkup || emptyStateMarkup ? (
      <Listbox
        autoSelection={AutoSelection.None}
        onSelect={updateSelection}
        onActiveOptionChange={handleActiveOptionChange}
      >
        {actionMarkup}
        {optionMarkup}
      </Listbox>
    ) : null;

  return (
    <div style={{ height: '225px' }}>
      <Combobox
        allowMultiple
        activator={
          <Combobox.TextField
            autoComplete="off"
            label={label}
            labelHidden
            value={value}
            suggestion={suggestion}
            placeholder="Search tags"
            verticalContent={verticalContentMarkup}
            onChange={setValue}
          />
        }
      >
        {listboxMarkup}
      </Combobox>
    </div>
  );
}