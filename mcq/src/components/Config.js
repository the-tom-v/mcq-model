/**
 import React from 'react'

const Config = () => {
  return (
    <div>
        <h1>Add Course </h1>
    <div>
        <label>Course</label>
        <input type="text" name="course" id="course"></input>
        <button>Add Course</button>
        </div>
    <div>
    <label>Test Series</label>
        <input type="text" name="course" id="course"></input>
        <button>Add Course</button>
    </div>
        
    </div>
  )
}

export default Config

*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Config = () => {
  const [courseName, setCourseName] = useState('');
  const [courseId, setCourseId] = useState('');
  const [testSeriesName, setTestSeriesName] = useState('');
  const [totalQuestions, setTotalQuestions] = useState('');
  const [duration, setDuration] = useState('');
  
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [testSeries, setTestSeries] = useState([]);
  const [selectedTestSeries, setSelectedTestSeries] = useState('');
  const [courses, setCourses] = useState([''])

  useEffect(() => {
    fetchCourses();
    fetchTestSeries();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchTestSeries = async () => {
    try {
      const response = await axios.get('http://localhost:5000/testSeries');
      setTestSeries(response.data);
    } catch (error) {
      console.error('Error fetching test series:', error);
    }
  };

  const handleAddCourse = () => {
    if (courseName.trim() !== '') {
      axios.post('http://localhost:5000/courses', { name: courseName })
        .then(response => {
          console.log('Course added successfully:', response.data);
          setCourseName('');
          fetchCourses(); 
        })
        .catch(error => {
          console.error('Error adding course:', error);
        });
    } else {
      console.error('Course name cannot be empty!');
    }
  };


  const handleAddTestSeries = () => {
    if (testSeriesName.trim() !== '' && totalQuestions.trim() !== '' && duration.trim() !== '') {
      const parsedTotalQuestions = parseInt(totalQuestions);
      if (!isNaN(parsedTotalQuestions)) {
        axios.post('http://localhost:5000/testSeries', {
          name: testSeriesName,
          courseId,
          totalQuestions: parsedTotalQuestions,
          duration
        })
          .then(response => {
            console.log('Test series added successfully:', response.data);
            setTestSeriesName('');
            setTotalQuestions('');
            setDuration('');
            fetchTestSeries(courseId); 
          })
          .catch(error => {
            console.error('Error adding test series:', error);
          });
      } else {
        console.error('Total Questions must be a valid number!');
      }
    } else {
      console.error('Test series name, total questions, and duration cannot be empty!');
    }
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      testSeriesId: selectedTestSeries,
      question,
      options,
      correctAnswer
    };

    axios.post('http://localhost:5000/questions', newQuestion)
      .then(response => {
        console.log('Question added successfully:', response.data);
        setQuestion('');
        setOptions(['', '', '', '']);
        setCorrectAnswer('');
      })
      .catch(error => {
        console.error('Error adding question:', error);
      });
  };

  return (
    <div>
       <h1>Add Courses</h1>
      <div>
        <label>Course</label>
        <input
          type="text"
          name="course"
          id="course"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
        <button onClick={handleAddCourse}>Add Course</button>
      </div>
      <h1>Add Test Series</h1>
      <div>
        <label>Course</label>
        <select value={courseId} onChange={(e) => setCourseId(e.target.value)}>
          <option value="">Select Course</option>
          {courses.map(course => (
            <option key={course.id} value={course.id}>{course.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Test Series</label>
        <input
          type="text"
          name="testSeries"
          id="testSeries"
          value={testSeriesName}
          onChange={(e) => setTestSeriesName(e.target.value)}
        />
      </div>
      <div>
        <label>Total Questions</label>
        <input
          type="number"
          name="totalQuestions"
          id="totalQuestions"
          value={totalQuestions}
          onChange={(e) => setTotalQuestions(e.target.value)}
        />
      </div>
      <div>
        <label>Duration</label>
        <input
          type="text"
          name="duration"
          id="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>
      <button onClick={handleAddTestSeries}>Add Test Series</button>


    
    
      <h1>Add Question</h1>
      <div>
        <label>Test Series</label>
        <select value={selectedTestSeries} onChange={(e) => setSelectedTestSeries(e.target.value)}>
          <option value="">Select Test Series</option>
          {testSeries.map(series => (
            <option key={series.id} value={series.id}>{series.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Question</label>
        <input
          type="text"
          name="question"
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>
      <div>
        <label>Options</label>
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            name={`option${index + 1}`}
            id={`option${index + 1}`}
            value={option}
            onChange={(e) => {
              const newOptions = [...options];
              newOptions[index] = e.target.value;
              setOptions(newOptions);
            }}
          />
        ))}
      </div>
      <div>
        <label>Correct Answer</label>
        <input
          type="text"
          name="correctAnswer"
          id="correctAnswer"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
        />
      </div>
      <button onClick={handleAddQuestion}>Add Question</button>
    </div>
  );
};

export default Config;


