import { predictImageUrl, predictImageFile } from './AzureService';


// Function to identify a car based on image URL
const identifyCarByUrl = async (imageUrl) => {
  try {
    const predictionResult = await predictImageUrl(imageUrl);
    const highestProbabilityTag = getHighestProbabilityTag(predictionResult.predictions);

    return identifyCarByTag(highestProbabilityTag);
  } catch (error) {
    console.error('Error identifying car:', error);
    throw error;
  }
};

// Function to identify a car based on image file
const identifyCarByFile = async (imageFile) => {
  try {
    const predictionResult = await predictImageFile(imageFile);
    const highestProbabilityTag = getHighestProbabilityTag(predictionResult.predictions);

    return identifyCarByTag(highestProbabilityTag);
  } catch (error) {
    console.error('Error identifying car:', error);
    throw error;
  }
};

// Function to get the tag with the highest probability
const getHighestProbabilityTag = (predictions) => {
  return predictions.reduce((maxTag, prediction) => {
    return prediction.probability > maxTag.probability ? prediction : maxTag;
  }, predictions[0]);
};

// Function to identify a car based on tag name
const identifyCarByTag = async (tag) => {
  const tagMapping = {
    // Define your tag mappings for carbrand and cartype here
    Chevrolet: 'Chevrolet',
    Ford: 'Ford',
    Nissan: 'Nissan',
    Volkswagen: 'Volkswagen',
    Honda: 'Honda',
    Toyota: 'Toyota',
    coupe: 'coupe',
    sedan: 'sedan',
    hatchback: 'hatchback',
    'pickup truck': 'pickup truck',
    suv: 'suv',
    van: 'van',
  };

  const carbrand = tagMapping[tag.tagName] || 'Unknown';
  const cartype = tagMapping[tag.tagName] || 'Unknown';

  return { carbrand, cartype };
};

export { identifyCarByUrl, identifyCarByFile };
