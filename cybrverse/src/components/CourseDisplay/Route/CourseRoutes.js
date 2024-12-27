import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Menu from '../Menu/Menu';
import Display from '../Display/Display';

const CourseRoutes = ({ handleSelectTopic, filterTopicsByCategory, selectedCategory, selectedTopic }) => {
  return (
    <Routes>
      <Route path="/courses/basic" element={
        <div>
          <Menu onSelectTopic={(topicName) => handleSelectTopic("basic", topicName)} topics={filterTopicsByCategory("basic")} category="basic" selectedTopic="" />
          <Display selectedTopic={selectedTopic} />
        </div>
      } />
      <Route path="/courses/intermediate" element={
        <div>
          <Menu onSelectTopic={(topicName) => handleSelectTopic("intermediate", topicName)} topics={filterTopicsByCategory("intermediate")} category="intermediate" selectedTopic="" />
          <Display selectedTopic={selectedTopic} />
        </div>
      } />
      <Route path="/courses/advanced" element={
        <div>
          <Menu onSelectTopic={(topicName) => handleSelectTopic("advanced", topicName)} topics={filterTopicsByCategory("advanced")} category="advanced" selectedTopic="" />
          <Display selectedTopic={selectedTopic} />
        </div>
      } />

      {/* Dynamic route for individual topics */}
      <Route path="/courses/:category/:topicName" element={
        <div>
          <Menu onSelectTopic={(topicName) => handleSelectTopic(selectedCategory, topicName)} topics={filterTopicsByCategory(selectedCategory)} category={selectedCategory} selectedTopic={selectedTopic} />
          <Display selectedTopic={selectedTopic} />
        </div>
      } />
    </Routes>
  );
};

export default CourseRoutes;
