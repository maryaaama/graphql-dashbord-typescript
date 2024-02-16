import {useFormikContext, useField } from 'formik';
import React, {useEffect, useState, useCallback, useMemo } from 'react';
import { Tag,Listbox,EmptySearchResult,Combobox,Text,AutoSelection,BlockStack} from '@shopify/polaris';
import { useSkillsQuery} from "../../generated/graphql";



const Skills = ({ label,initialSelectedSkills, ...props }:any) => {
 
    const {setFieldValue , setFieldError} = useFormikContext();
    const [field, meta] = useField(props);

    const [selectedTags, setSelectedTags] = useState(initialSelectedSkills || []);
    const [value, setValue] = useState('');
    const [valueData, setValueData] = useState([]);
    const [suggestion, setSuggestion] = useState('');
   
  const { data,refetch } =useSkillsQuery({
    variables: {
      title:value,
      limit: 10,
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
  });
  
  const name:string=props.name;
  const handleBlur = useCallback(() => {
    field.onBlur({ target: { name } });
  }, [field, name]);
  const handleFocus = useCallback(() => {
    setFieldError(name, "");
  }, [name, setFieldError]);

  const error = useMemo(() => {
    if (meta.error && meta.touched) {
      return meta.error;
    }
    return undefined;
  }, [meta.error, meta.touched]);

    const handleActiveOptionChange = useCallback(
      (activeOption:string) => {
        const activeOptionIsAction = activeOption === value;
       
        if (!activeOptionIsAction && !selectedTags.includes(activeOption)) {
          setSuggestion(activeOption);
        } else {
          setSuggestion('');
        }
      },
      [value, selectedTags],
    );

    const handleSelectChange = useCallback(
      (value:string[]) => {
        setFieldValue(name, value);
        console.log(value);
      },
      [name, setFieldValue]
    );

    const updateSelection :any= useCallback(
      (selected:string[]) => {
        const nextSelectedTags:any = new Set([...selectedTags]);
        if (nextSelectedTags.has(selected)) {
          nextSelectedTags.delete(selected);
        } else {
          nextSelectedTags.add(selected);
        }
        setSelectedTags([...nextSelectedTags]);
    
        setValue('');
        setSuggestion('');
    
        // Call handleSelectChange to update formik field value
        handleSelectChange([...nextSelectedTags]);
      },
      [selectedTags, setValue, setSuggestion, handleSelectChange],
    );
    
    const removeTag = useCallback(
      (tag:any) => () => {
        
        updateSelection(tag);
      },
      [updateSelection],
    );
    const getAllTags = useCallback(() => {
      let savedTags:string[] = [];
      
      if (data?.skills?.skills) {
        savedTags = data.skills.skills.map((saveData:any) => saveData.title);
      } else {
        console.log(error);
      }
    
      const allTags:any = [...new Set([...savedTags, ...selectedTags].sort())];
      setValueData(allTags); // Update the state once with all the titles
    
      return allTags;
    }, [data?.skills, selectedTags, setValueData, error]);
    
   
    const options = useMemo(() => {
      let list;
      const allTags = getAllTags();
     console.log('allTags',allTags)
      const filterRegex = new RegExp(value, 'i');
      if (value) {
        list = allTags.filter((tag:string) => tag.match(filterRegex));
      } else {
        list = allTags;
      }
      return [...list];
    }, [value, getAllTags]);

    const verticalContentMarkup =
    selectedTags.length > 0 ? (
      <BlockStack  gap="500">
        {selectedTags.map((tag:string) => (
          
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
                {option}
               
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
      <div>
        <label htmlFor={props.id || name}>{label}</label>
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
            error={error ? "required !" : false}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
        }
      >
        {listboxMarkup}
      </Combobox>

      </div>
    );
  };
  
  export default Skills;
  