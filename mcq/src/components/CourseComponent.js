// CourseComponent.js
import React from 'react';
import './css/CourseComponent.css'; // Import external CSS file

const CourseComponent = ({ course, setSelectedCourse }) => {
  const handleCourseSelect = () => {
    setSelectedCourse(course);
  };

  return (
    <div onClick={handleCourseSelect} className="course-container"> {/* Add class name */}
      <h3>{course.name}</h3>
    </div>
  );
};

export default CourseComponent;
