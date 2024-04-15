// QuestionComponent.js
import React from 'react';
import './css/QuestionComponet.css'; // Import external CSS file

const QuestionComponent = ({ question, selectedAnswer, handleOptionSelect }) => {
  const { id, question: questionText, options } = question;

  return (
    <div className="question-container"> {/* Add class name */}
      <p>{questionText}</p>
      <div>
        {options.map((option) => (
          <label key={option} className="option-container"> {/* Add class name */}
            <input
              type="radio"
              value={option}
              checked={selectedAnswer === option}
              onChange={() => handleOptionSelect(id, option)}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuestionComponent;
