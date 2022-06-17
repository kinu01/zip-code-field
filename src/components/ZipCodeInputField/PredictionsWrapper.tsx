import { FC, useState, useCallback, memo } from "react";
import Script from "react-load-script";
import usePredictions, { StructuredPredictions } from "./usePredictions";

const GOOGLE_PLACES_URL = ` https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&libraries=places`;

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
      <Script url={GOOGLE_PLACES_URL} onLoad={handleScriptLoad} />
      {children}
      <div className="predictions">{predictions.map(renderPrediction)}</div>
    </div>
  );
};

export default memo(PredictionsWrapper);
