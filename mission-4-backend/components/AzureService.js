// AzureService.js
import axios from 'axios';//Import Axios library

// Function to predict using an image URL
export const predictImageUrl = async (imageFile) => {
  const formData = new FormData();
  formData.append('file', imageFile); // The backend expects the file with the key 'file'

  const config = {
    headers: {
      'Prediction-Key': '6069c4165cb44299b658aee370c26755', // Use environment variable
      'Content-Type': 'application/json'
    },
  };

  try {
    const response = await axios.post(
    'https://mission2apicustom-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/a1422baf-1400-46a0-95f3-a9260a24e13b/detect/iterations/Iteration1/url', // Use environment variable for endpoint
      formData,
      config
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data from Azure:', error);
    throw error;
  }
};

// Function to predict using an image file
export const predictImageFile = async (imageFile) => {
  const formData = new FormData();
  formData.append('file', imageFile); // The backend expects the file with the key 'file'

  const config = {
    headers: {
      'Prediction-Key': '6069c4165cb44299b658aee370c26755', // Use environment variable
      'Content-Type': 'application/octet-stream'
    },
  };

  try {
    const response = await axios.post(
    'https://mission2apicustom-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/a1422baf-1400-46a0-95f3-a9260a24e13b/detect/iterations/Iteration1/image', // Use environment variable for endpoint
      formData,
      config
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data from Azure:', error);
    throw error;
  }
};
