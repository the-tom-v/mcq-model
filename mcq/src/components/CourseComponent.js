import React from 'react';

const CourseComponent = ({ course, setSelectedCourse }) => {
  const handleCourseSelect = () => {
    setSelectedCourse(course);
  };

  return (
    <div onClick={handleCourseSelect} style={{ cursor: 'pointer' }}>
      <h3>{course.name}</h3>
    </div>
  );
};

export default CourseComponent;