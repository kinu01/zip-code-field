import { useEffect, useRef, useState } from "react";

const options = {
  types: ["(regions)"],
  componentRestrictions: { country: "us" },
};

export interface StructuredPredictions {
  zipCode: string;
  description: string;
}

const usePredictions = (value: string, isAutoCompleteLoaded: boolean) => {
  const [predictions, setPredictions] = useState<StructuredPredictions[]>([]);
  const [predictionsVisible, setPredictionsVisible] = useState(false);

  const autocompleteHandler = useRef<google.maps.places.AutocompleteService>();

  useEffect(() => {
    if (predictionsVisible === false) {
      setPredictionsVisible(true);
      return;
    }
    if (predictionsVisible && value && isAutoCompleteLoaded) {
      onValueChange();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, isAutoCompleteLoaded]);

  const onValueChange = () => {
    if (!autocompleteHandler.current) {
      /*global google*/ // To disable any eslint 'google not defined' errors
      autocompleteHandler.current =
        new google.maps.places.AutocompleteService();
    }

    autocompleteHandler.current.getPlacePredictions(
      {
        input: value,
        types: options.types,
        componentRestrictions: options.componentRestrictions,
      },
      (predictions) => {
        if (predictions?.length > 0) {
          const structuredPredictions = predictions.map((prediction) => ({
            zipCode: prediction.structured_formatting.main_text,
            description: prediction.description,
          })) as StructuredPredictions[];
          setPredictions(structuredPredictions);
        }
      }
    );
  };

  const hidePredictions = () => {
    setPredictions([]);
    setPredictionsVisible(false);
  };

  return { predictions, hidePredictions, predictionsVisible };
};

export default usePredictions;
