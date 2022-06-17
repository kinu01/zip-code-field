import { FC, useState, useEffect, useCallback } from "react";
import { Icon } from "@iconify/react";
import PredictionsWrapper from "./PredictionsWrapper";

import "./styles.css";

const max_length = 5;

export interface ZipCodeField {
  isErr: boolean;
  value: string;
}

export interface ZipCodeInputFieldProps {
  onZipCodeChange?: (field: ZipCodeField) => void;
  useAutoComplete?: boolean;
}

const ZipCodeInputField: FC<ZipCodeInputFieldProps> = ({
  onZipCodeChange,
  useAutoComplete,
}) => {
  const [zipCode, setZipCode] = useState("");
  const [showErr, setShowErr] = useState(false);

  useEffect(() => {
    const isInvalid = zipCode.length < max_length;

    if (!isInvalid) {
      setShowErr(false);
    }
    if (zipCode && isInvalid) {
      setShowErr(true);
    }
    onZipCodeChange?.({ isErr: isInvalid, value: zipCode });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zipCode]);

  const onPredictionSelected = useCallback((prediction: string) => {
    setShowErr(false);
    setZipCode(prediction);
  }, []);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;
    const validValue = event.target.validity.valid;

    setZipCode((prevZip) => (validValue ? value : prevZip));
  };

  const renderInput = () => {
    return (
      <input
        type={"text"}
        pattern="[0-9]*"
        maxLength={max_length}
        placeholder={""}
        name={"zip"}
        id={"zip"}
        autoComplete={"off"}
        value={zipCode}
        onChange={onChange}
      />
    );
  };

  return (
    <div className="zip_code_field center_item">
      <label htmlFor="zip">5-digit ZIP code:</label>
      {useAutoComplete ? (
        <PredictionsWrapper
          value={zipCode}
          onPredictionSelected={onPredictionSelected}
        >
          {renderInput()}
        </PredictionsWrapper>
      ) : (
        renderInput()
      )}
      {showErr ? (
        <Icon
          className="zip_code_field-err_icon"
          color={"red"}
          icon="bx:error"
        />
      ) : null}
    </div>
  );
};

export default ZipCodeInputField;
