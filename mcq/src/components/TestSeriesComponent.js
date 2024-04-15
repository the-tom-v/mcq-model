import React from 'react';

const TestSeriesComponent = ({ testSeries, setSelectedTestSeries }) => {
  const handleTestSeriesSelect = () => {
    setSelectedTestSeries(testSeries);
  };

  return (
    <div onClick={handleTestSeriesSelect} style={{ cursor: 'pointer' }}>
      <h3>{testSeries.name}</h3>
    </div>
  );
};

export default TestSeriesComponent;