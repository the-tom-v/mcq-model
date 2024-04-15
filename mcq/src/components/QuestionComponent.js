import React from 'react';

const QuestionComponent = ({ question, selectedAnswer, handleOptionSelect }) => {
  const { id, question: questionText, options } = question;

  return (
    <div>
      <p>{questionText}</p>
      <div>
        {options.map((option) => (
          <label key={option}>
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