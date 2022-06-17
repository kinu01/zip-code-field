import { FC, useState, useCallback } from "react";
import Script from "react-load-script";
import usePredictions, { StructuredPredictions } from "./usePredictions";

interface PredictionsWrapperProps {
  children: JSX.Element;
  value: string;
  onPredictionSelected: (value: string) => void;
}

const PredictionsWrapper: FC<PredictionsWrapperProps> = ({
  children,
  value,
  onPredictionSelected,
}) => {
  const [isAutoCompleteLoaded, setIsAutoCompleteLoaded] = useState(false);

  const { predictions, hidePredictions } = usePredictions(
    value,
    isAutoCompleteLoaded
  );

  const handleScriptLoad = useCallback(() => {
    setIsAutoCompleteLoaded(true);
  }, []);

  const onPredictionClicked = (prediction: StructuredPredictions) => {
    hidePredictions();
    onPredictionSelected(prediction.zipCode);
  };

  const renderPrediction = (
    prediction: StructuredPredictions,
    index: number
  ) => {
    return (
      <div
        className="predictions-item"
        onClick={() => onPredictionClicked(prediction)}
        key={index + ""}
      >
        {prediction.description}
      </div>
    );
  };

  return (
    <div>
      <Script
        url={process.env.REACT_APP_GOOGLE_PLACES_URL}
        onLoad={handleScriptLoad}
      />
      {children}
      <div className="predictions">{predictions.map(renderPrediction)}</div>
    </div>
  );
};

export default PredictionsWrapper;
