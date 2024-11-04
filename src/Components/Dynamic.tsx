import React from "react";
import { useState } from "react";

type fieldprop = {
  key: string;
  value: string;
};

const Dynamic = () => {
  const [fields, setFields] = useState<fieldprop[]>([
    { key: "", value: "" },
    { key: "", value: "" },
  ]);

  const [data, setData] = useState<Record<string, { value: string }>[]>([]);

  const handleFieldChange = (
    index: number,
    type: "key" | "value",
    value: string
  ) => {
    const updatedFields = [...fields];
    updatedFields[index][type] = value;
    setFields(updatedFields);
  };

  const addField = () => {
    setFields([...fields, { key: "", value: "" }, { key: "", value: "" }]);
  };

  function deletefield() {
    const updatedFields = fields.slice(0, -2);
    setFields(updatedFields);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formattedData = fields.reduce<Record<string, { value: string }>>(
      (acc, field) => {
        acc[field.key] = { value: field.value };
        return acc;
      },
      {}
    );
    setData([...data, formattedData]);
    console.log([...data, formattedData]);
    const updateIsTo = fields.map((ele) => {
      ele.key = "";
      ele.value = "";
      return ele;
    });
    setFields(updateIsTo);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {fields.map((field, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Enter key"
              value={field.key}
              onChange={(e) => handleFieldChange(index, "key", e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter value"
              value={field.value}
              onChange={(e) =>
                handleFieldChange(index, "value", e.target.value)
              }
            />
          </div>
        ))}
        <button type="button" onClick={addField}>
          Add Field
        </button>

        {fields.length != 2 && (
          <button type="button" onClick={deletefield}>
            Delete Field
          </button>
        )}
        <input type="submit" />
      </form>
    </>
  );
};

export default Dynamic;
