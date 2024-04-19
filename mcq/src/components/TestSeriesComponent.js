// TestSeriesComponent.js
import React, { useState, useEffect } from 'react';
import './css/TestSeriesComponent.css'; // Import external CSS file

const TestSeriesComponent = ({ testSeries, setSelectedTestSeries }) => {
  const [details, setDetails] = useState({ totalQuestions: testSeries.totalQuestions, duration: testSeries.duration});

  useEffect(() => {
    // Fetch test series details
    fetchTestSeriesDetails(testSeries.id);
  }, [testSeries]);

  const fetchTestSeriesDetails = async (testSeriesId) => {
    try {
      const response = await fetch(`http://localhost:5000/testSeriesDetails?testSeriesId=${testSeriesId}`);
      const data = await response.json();
      setDetails(data);
    } catch (error) {
      console.error('Error fetching test series details:', error);
    }
  };

  const handleTestSeriesSelect = () => {
    setSelectedTestSeries(testSeries);
  };

  return (
    <div onClick={handleTestSeriesSelect} className="test-series-container"> {/* Add class name */}
      <h3>{testSeries.name}</h3>
      <p>Total Questions: {details.totalQuestions}</p>
      <p>Duration: {details.duration} minutes</p>
    </div>
  );
};

export default TestSeriesComponent;
