import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Main from "./components/Main";
import Dashboard from "./components/Dashboard";
import CertificatePage from "./components/Certificate";
import AdvCertificate from "./components/AdvancedQuiz/certificateadv";
import IntCertificate from "./components/IntermediateQuiz/certificateintermediate";
import BasicQuiz from "./components/BasicQuiz";
import IntermediateQuiz from "./components/IntermediateQuiz";
import AdvancedQuiz from "./components/AdvancedQuiz";
import UserSupport from "./components/UserSupport/UserSupport";
import QuizSelection from "./components/Quizz/QuizSelection";
import Coursepage from "./components/CourseDisplay/Course/Coursepage";
import CTF from "./components/CTF/ctf";

function App() {
  const user = localStorage.getItem("token");
  const [topics, setTopics] = useState([]);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/main" /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/main" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/main" />} />
        <Route path="/main" element={user ? <Main /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/certificate" element={user ? <CertificatePage /> : <Navigate to="/login" />} />
        <Route path="/certificateadv" element={user ? <AdvCertificate /> : <Navigate to="/login" />} />
        <Route path="/certificateint" element={user ? <IntCertificate /> : <Navigate to="/login" />} />
        <Route path="/quizz" element={user ? <QuizSelection /> : <Navigate to="/login" />} />
        <Route path="/basicQuiz" element={user ? <BasicQuiz /> : <Navigate to="/login" />} />
        <Route path="/intermediateQuiz" element={user ? <IntermediateQuiz /> : <Navigate to="/login" />} />
        <Route path="/advancedQuiz" element={user ? <AdvancedQuiz /> : <Navigate to="/login" />} />
        <Route path="/course" element={user ? <Coursepage /> : <Navigate to="/login" />} />
        <Route path="/ctf" element={user ? <CTF /> : <Navigate to="/login" />} />
        <Route path="/support" element={user ? <UserSupport /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
