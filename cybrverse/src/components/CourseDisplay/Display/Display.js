// frontend\src\components\Display.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchTopicDetailsByName } from "../../../Api/api"; // Update the API call to fetch by name
import ReactMarkdown from "react-markdown";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./Display.css";

function Display() {
  const { category, topicName } = useParams(); // Get category and topicName from the URL
  const [topic, setTopic] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    const loadTopicDetails = async () => {
      if (topicName) {
        setLoading(true);
        try {
          // Normalize the topic name for API request
          const normalizedTopicName = topicName.replace(/-/g, " ").toLowerCase();
          const data = await fetchTopicDetailsByName(normalizedTopicName); // Fetch topic by normalized name
          setTopic(data);
          setError(null);
        } catch {
          setError("Failed to load topic details. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    };

    loadTopicDetails();

    // Scroll to top after loading the new topic
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  //   console.log("Scroll reset triggered for topic:", topicName); // Debugging log
  }, [topicName]); // Re-run when topicName changes

  const handleCopy = (index) => {
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const renderCodeBlock = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    const codeContent = String(children).replace(/\n$/, "");

    return !inline && match ? (
      <div className="code-block">
        <pre className={className} {...props}>
          <code>{codeContent}</code>
        </pre>
        <CopyToClipboard
          text={codeContent}
          onCopy={() => handleCopy(children.toString())}
        >
          <button className="copy-button" aria-label="Copy code block">
            Copy
          </button>
        </CopyToClipboard>
        {copiedIndex === children.toString() && (
          <span className="copied-text" role="alert">
            Copied!
          </span>
        )}
      </div>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  };

  if (!topicName) return <div className="no-selection">Select a topic.</div>;
  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="topic-content">
      <h1>{topic?.name}</h1>
      <ReactMarkdown components={{ code: renderCodeBlock }}>
        {topic?.description}
      </ReactMarkdown>
      {topic?.videoLink && (
        <div className="video-container">
          <iframe
            src={topic.videoLink}
            title={topic.name}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}
      {topic?.referenceLink && (
        <div>
          <h3>References:</h3>
          <ul>
            {topic.referenceLink.split(",").map((ref, index) => (
              <li key={index}>
                <a href={ref} target="_blank" rel="noopener noreferrer">
                  {ref}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Display;
