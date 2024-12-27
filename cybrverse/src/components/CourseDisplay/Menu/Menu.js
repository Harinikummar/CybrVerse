// frontend\src\components\Menu.js

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Menu.css";

function Menu({ onSelectTopic, topics, category, selectedTopic }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTopic, setActiveTopic] = useState(selectedTopic);
  const location = useLocation();

  useEffect(() => {
    const pathParts = location.pathname.split('/');
    if (pathParts.length >= 4) {
      setActiveTopic(pathParts[3].replace(/-/g, ' '));
    } else {
      setActiveTopic(""); // Clear active topic when category changes
    }
  }, [location, selectedTopic]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleTopicSelect = (topicName) => {
    setActiveTopic(topicName);
    onSelectTopic(topicName);
    setIsMenuOpen(false); // Close menu on topic selection in mobile view
  };

  // Helper function to format topic name for the URL
  const formatTopicNameForURL = (name) => {
    return name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase(); // Replace spaces with hyphens, remove special characters, and convert to lowercase
  };

  return (
    <div>
      <button
        className="menu-toggle"
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMenuOpen ? "✕" : "☰ Topics"}
      </button>
      <div
        className={`sidebar ${isMenuOpen ? "open" : ""}`}
        aria-hidden={!isMenuOpen}
      >
        <ul className="menu" role="menu">
          {topics.filter(topic => topic.category.toLowerCase() === category.toLowerCase()).map((topic) => (
            <li
              key={topic._id}
              className={`topic ${activeTopic === topic.name ? "active" : ""}`}
              onClick={() => handleTopicSelect(topic.name)}
              role="menuitem"
              aria-selected={activeTopic === topic.name}
            >
              {/* Generate link using formatted topic name */}
              <Link to={`/courses/${topic.category.toLowerCase()}/${formatTopicNameForURL(topic.name)}`}>
                {topic.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Menu;
