import { useQuery } from "@apollo/client";
import { Combobox, Listbox, Stack, Tag, TextContainer } from "@shopify/polaris";
import { useField, useFormikContext } from "formik";
import { useCallback, useMemo, useState } from "react";
import { SKILLS } from "../../Graphql/Queries";

export default function SkillFounder({ label, name }) {
  const [inputValue, setInputValue] = useState("");

  const { setFieldValue, setFieldError } = useFormikContext();

  const { data } = useQuery(SKILLS, {
    variables: {
      title: inputValue,
      limit: 5,
    },
  });
  const [field, meta] = useField(name);
  const [selectedOptions, setSelectedOptions] = useState(field.value);

  console.log();

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
  const updateText = useCallback((value) => {
    setInputValue(value);
  }, []);

  const updateSelection = useCallback(
    (selected) => {
      if (selectedOptions.includes(selected)) {
        setSelectedOptions(
          selectedOptions.filter((option) => option !== selected),
        );
      } else {
        setSelectedOptions([...selectedOptions, selected]);
        setFieldValue(name, [...selectedOptions, selected]);
      }

      updateText("");
    },
    [selectedOptions, updateText],
  );

  const removeTag = useCallback(
    (tag) => () => {
      const options = [...selectedOptions];
      options.splice(options.indexOf(tag), 1);
      setSelectedOptions(options);
    },
    [selectedOptions],
  );
  const tagsMarkup = selectedOptions.map((option) => (
    <Tag key={`option-${option}`} onRemove={removeTag(option)}>
      {option}
    </Tag>
  ));

  const optionsMarkUp = data
    ? data.skills.skills.map((option) => {
        const { title, id } = option;
        return (
          <Listbox.Option
            key={`${title + id}`}
            value={title}
            selected={selectedOptions.includes(title)}
            accessibilityLabel={label}
          >
            {title}
          </Listbox.Option>
        );
      })
    : null;

  const noResults = !selectedOptions.includes(inputValue);
  const actionMarkup = noResults ? (
    <Listbox.Action value={inputValue}>{`Add ${inputValue}`}</Listbox.Action>
  ) : null;

  return (
    <>
      <Combobox
        allowMultiple
        activator={
          <Combobox.TextField
            onChange={updateText}
            label={label}
            value={inputValue}
            name={field.name}
            autoComplete="off"
            error={error ? "required !" : false}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
        }
      >
        {optionsMarkUp ? (
          <Listbox onSelect={updateSelection}>
            {inputValue !== "" ? actionMarkup : null}
            {optionsMarkUp}
          </Listbox>
        ) : null}
      </Combobox>
      
        <div style={{ marginTop: 15 }}>
          <Stack>{tagsMarkup}</Stack>
        </div>
      
    </>
  );
}