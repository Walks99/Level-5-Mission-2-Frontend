import React, { useState } from 'react';

function FindSimilarCarsPage() {
  // State to store the prediction result
  const [predictionResult, setPredictionResult] = useState(null);

  // Function to handle image upload and prediction
  const predictCarModel = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the input element for file upload
    const inputElement = document.getElementById('imageUpload');
    // Get the selected file from the input element
    const file = inputElement.files[0];

    if (file) {
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append('carImage', file);

      try {
        // Make a POST request to your backend API
        const response = await fetch('http://localhost:4000/predictCarModel', {
          method: 'POST',
          mode: 'cors', // Include this line to handle CORS
          credentials: 'include', // Include this line if you're sending cookies
          body: formData,
        });

        // Check if the response status is OK (2xx)
        if (response.ok) {
          // Parse the JSON response from the server
          const result = await response.json();
          // Set the prediction result in the component state
          setPredictionResult(result);
        } else {
          // Log an error message if the response status is not OK
          console.error('Error predicting car model:', response.statusText);
        }
      } catch (error) {
        // Log an error message if there is an exception during the request
        console.error('Error predicting car model:', error.message);
      }
    }
  };

  // Function to display the prediction result
  const displayPredictionResult = () => {
    // Check if there is a prediction result to display
    if (predictionResult) {
      // Display the prediction result as a formatted JSON string
      return <p>Prediction Result: {JSON.stringify(predictionResult)}</p>;
    }
    // If there is no prediction result, return null (no display)
    return null;
  };

  // Render the component
  return (
    <div>
      {/* Header */}
      <h1>Find Similar Cars</h1>

      {/* Form for image upload and prediction */}
      <form onSubmit={predictCarModel} encType="multipart/form-data">
        {/* Label for file input */}
        <label htmlFor="imageUpload">Upload a car image:</label>
        {/* File input element */}
        <input type="file" id="imageUpload" accept="image/*" />
        {/* Button to submit the form */}
        <button type="submit">Predict</button>
      </form>

      {/* Display the prediction result */}
      {displayPredictionResult()}
    </div>
  );
}

// Export the component
export default FindSimilarCarsPage;
