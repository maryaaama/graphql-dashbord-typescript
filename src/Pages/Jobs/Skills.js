import {useFormikContext, useField } from 'formik';
import { useQuery } from "@apollo/client";
import React, {useEffect, useState, useCallback, useMemo } from 'react';
import { Tag,Listbox,EmptySearchResult,Combobox,Text,AutoSelection,BlockStack} from '@shopify/polaris';
import { SKILLS } from "../../Graphql/Queries";


const Skills = ({ label, ...props }) => {
    const {setFieldValue , setFieldError} = useFormikContext();
    const [field, meta] = useField(props);

    const [selectedTags, setSelectedTags] = useState(['FrontEnd']);
    const [value, setValue] = useState('');
    const [valueData, setValueData] = useState([]);
    const [suggestion, setSuggestion] = useState('');
   
  const { data,refetch } = useQuery(SKILLS, {
    variables: {
      title:value,
      limit: 10,
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
  });
  
  const name=props.name;
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
      (activeOption) => {
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
      (value) => {
        setFieldValue(props.name, value);
        console.log(value);
      },
      [props.name, setFieldValue]
    );

    const updateSelection = useCallback(
      (selected) => {
        const nextSelectedTags = new Set([...selectedTags]);
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
      (tag) => () => {
        
        updateSelection(tag);
      },
      [updateSelection],
    );

    const getAllTags = useCallback(() => {

      if(data?.skills?.skills){
        const  saveDatas = [... data.skills.skills];

        for (let saveData of saveDatas) {
          setValueData(prevState=>{return[...prevState,saveData.title]})
          }
          
       }else{ console.log('nabod');}
      
       const savedTags = [...valueData]
       console.log('savedTags' ,savedTags);
      return [...new Set([...savedTags, ...selectedTags].sort())];
    }, [data?.skills, selectedTags]);
    
    const options = useMemo(() => {
      let list;
      const allTags = getAllTags();
     console.log('allTags',allTags)
      const filterRegex = new RegExp(value, 'i');
      if (value) {
        list = allTags.filter((tag) => tag.match(filterRegex));
      } else {
        list = allTags;
      }
      return [...list];
    }, [value, getAllTags]);

    const verticalContentMarkup =
    selectedTags.length > 0 ? (
      <BlockStack spacing="extraTight" alignment="center">
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
                {option}
                {/*formatOptionText(option)*/}
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
        <label htmlFor={props.id || props.name}>{label}</label>
        <Combobox
        allowMultiple
        name={props.name}
        label={label}
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
  