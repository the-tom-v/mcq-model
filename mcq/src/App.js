import React, { useState, useEffect } from 'react';
import CourseComponent from './components/CourseComponent.js';
import TestSeriesComponent from './components/TestSeriesComponent.js';
import QuestionComponent from './components/QuestionComponent.js';
import Config from './components/Config.js';






const App = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [testSeries, setTestSeries] = useState([]);
  const [selectedTestSeries, setSelectedTestSeries] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  // Fetch courses
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:5000/courses');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  // Fetch test series for selected course
  useEffect(() => {
    if (selectedCourse) {
      fetchTestSeries(selectedCourse.id);
    }
  }, [selectedCourse]);

  const fetchTestSeries = async (courseId) => {
    try {
      const response = await fetch(`http://localhost:5000/testSeries?courseId=${courseId}`);
      const data = await response.json();
      setTestSeries(data);
    } catch (error) {
      console.error('Error fetching test series:', error);
    }
  };

  // Fetch questions for selected test series
  useEffect(() => {
    if (selectedTestSeries) {
      fetchQuestions(selectedTestSeries.id);
    }
  }, [selectedTestSeries]);

  const fetchQuestions = async (testSeriesId) => {
    try {
      const response = await fetch(`http://localhost:5000/questions?testSeriesId=${testSeriesId}`);
      const data = await response.json();
      // Initialize selected answers for each question to an empty string
      const initialSelectedAnswers = {};
      data.forEach((question) => {
        initialSelectedAnswers[question.id] = '';
      });
      setSelectedAnswers(initialSelectedAnswers);
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  // Handle option selection for a question
  const handleOptionSelect = (questionId, option) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: option });
  };

  // Submit answers
  const handleSubmit = () => {
    // Do something with selected answers, such as sending them to the server
    console.log('Selected Answers:', selectedAnswers);
    // You can also calculate the score or perform any other action here
  };

  return (
    <center>
      
    <div>
      <h1>MCQ Form</h1>
      <div>
        <h2>Courses</h2>
        {courses.map((course) => (
          <CourseComponent
            key={course.id}
            course={course}
            setSelectedCourse={setSelectedCourse}
          />
        ))}
      </div>
      <div>
        <h2>Test Series</h2>
        {testSeries.map((testSeries) => (
          <TestSeriesComponent
            key={testSeries.id}
            testSeries={testSeries}
            setSelectedTestSeries={setSelectedTestSeries}
          />
        ))}
      </div>
      <div>
        <h2>Questions</h2>
        <form onSubmit={handleSubmit}>
          {questions.map((question) => (
            <QuestionComponent
              key={question.id}
              question={question}
              selectedAnswer={selectedAnswers[question.id]}
              handleOptionSelect={handleOptionSelect}
            />
          ))}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
    <div>
      <Config></Config>
    </div>
    <div>
      
    </div>
    </center>
  );
};

export default App;

