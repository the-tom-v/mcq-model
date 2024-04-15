// TestSeriesComponent.js
import React from 'react';
import './css/TestSeriesComponent.css'; // Import external CSS file

const TestSeriesComponent = ({ testSeries, setSelectedTestSeries }) => {
  const handleTestSeriesSelect = () => {
    setSelectedTestSeries(testSeries);
  };

  return (
    <div onClick={handleTestSeriesSelect} className="test-series-container"> {/* Add class name */}
      <h3>{testSeries.name}</h3>
    </div>
  );
};

export default TestSeriesComponent;
