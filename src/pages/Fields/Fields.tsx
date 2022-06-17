import React, { useCallback } from "react";
import ZipCodeInputField, {
  ZipCodeField,
} from "../../components/ZipCodeInputField/ZipCodeInputField";

import "./styles.css";

const Fields = () => {
  const onZipCodeChange = useCallback((field: ZipCodeField) => {}, []);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  return (
    <form className="fields" onSubmit={onSubmit}>
      <ZipCodeInputField
        onZipCodeChange={onZipCodeChange}
        useAutoComplete={true}
      />
    </form>
  );
};

export default Fields;
