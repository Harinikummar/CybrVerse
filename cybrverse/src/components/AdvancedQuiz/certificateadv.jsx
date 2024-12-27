import React, { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import './styles.css';
import logo from '../images/icon/logo1.png'; // Replace with your logo path
//import qrCode from '../images/icon/qr-code.png'; // Replace with your QR code path

function Certificateadv() {
  const certificateRef = useRef();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");
    if (firstName && lastName) {
      setUserName(`${firstName} ${lastName}`);
    }
  }, []);

  const handleDownload = async () => {
    const element = certificateRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('landscape', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('certificate.pdf');
  };

  return (
    <div className="certificate-page-container">
      <div className="course-details-container">
        <div className="course-details">
          <h2>Course Details</h2>
          <ul>
            <li><strong>Title:</strong> Cybersecurity Advanced</li>
            <li><strong>Level:</strong> Advanced</li>
            <li><strong>Duration:</strong> 20 hours</li>
            <li><strong>Description:</strong> This course covers the foundational knowledge and skills needed for a career in cybersecurity.</li>
          </ul>
          <button onClick={handleDownload} className="download-button">
            Download Certificate
          </button>
        </div>

        <div className="certificate-preview" ref={certificateRef}>
          <div className="certificate-header">
            <img src={logo} alt="Logo" className="certificate-logo" />
          </div>
          <h1>CERTIFICATE OF COMPLETION</h1>
          <p>This certifies that</p>
          <h2>{userName}</h2>
          <p>has passed the Cybersecurity Advanced and is hereby declared a</p>
          <h3>Certified Cybersecurity Student</h3>
          <p>The candidate has completed the course at the Professional level.</p>
          <p className="date">Issued on {new Date().toLocaleDateString()}</p>
          <div className="signature">
            <p>Authorized by : Cybrverse Team</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Certificateadv;
