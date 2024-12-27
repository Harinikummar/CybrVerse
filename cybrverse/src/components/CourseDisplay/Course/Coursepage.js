import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown"; // Import react-markdown
import "./CoursePage.css";

const CoursePage = () => {
  const [selectedLevel, setSelectedLevel] = useState("Basic");
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/topics");
        const filteredTopics = response.data.filter(
          (topic) => topic.category.toLowerCase() === selectedLevel.toLowerCase()
        );
        setTopics(filteredTopics);
      } catch (err) {
        console.error("Error fetching topics:", err.message);
      }
    };
    fetchTopics();
  }, [selectedLevel]);

  const fetchTopicByName = async (topicName) => {
    try {
      const normalizedName = topicName.replace(/\s+/g, "-").toLowerCase();
      const response = await axios.get(`http://localhost:8080/api/topics/name/${normalizedName}`);
      setSelectedTopic(response.data);
    } catch (err) {
      console.error("Error fetching topic by name:", err.message);
    }
  };

  return (
    <div className="course-page">
      <div className="tab-bar">
        {["Basic", "Intermediate", "Advanced"].map((level) => (
          <button
            key={level}
            className={selectedLevel === level ? "active" : ""}
            onClick={() => {
              setSelectedLevel(level);
              setSelectedTopic(null);
            }}
          >
            {level}
          </button>
        ))}
      </div>

      <div className="main-content">
        <div className="sidebar">
          <ul className="topic-list">
            {topics.length > 0 ? (
              topics.map((topic) => (
                <li
                  key={topic._id}
                  onClick={() => fetchTopicByName(topic.name)}
                  className={selectedTopic?.name === topic.name ? "active" : ""}
                >
                  {topic.name}
                </li>
              ))
            ) : (
              <p>No topics available for this level.</p>
            )}
          </ul>
        </div>

        <div className="topic-content">
          {selectedTopic ? (
            <>
              <h1>{selectedTopic.name}</h1>
              <ReactMarkdown>{selectedTopic.description}</ReactMarkdown>
              {selectedTopic.videoLink && (
                <iframe
                  src={selectedTopic.videoLink}
                  title={selectedTopic.name}
                  allowFullScreen
                ></iframe>
              )}
              {selectedTopic.referenceLink && (
                <p>
                  {" "}
                  <a
                    href={selectedTopic.referenceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {selectedTopic.referenceLink}
                  </a>
                </p>
              )}
            </>
          ) : (
            <p>Select a topic from the sidebar.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
