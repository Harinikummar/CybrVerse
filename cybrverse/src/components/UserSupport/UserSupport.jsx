import React, { useRef } from "react";
import "./UserSupport.css"; // Import CSS file for styling

import emailjs from "@emailjs/browser";

const UserSupport = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_mlyte0h", "template_h69l3jf", form.current, "IHcWnT6seXofVXJvS")
      .then(
        (result) => {
          console.log(result.text);
          e.target.reset();
          alert("Your message has been sent! We will contact you shortly.");
        },
        (error) => {
          console.error("Error:", error.text);
          alert("Failed to send your message. Please try again later.");
        }
      );
  };

  return (
    <div id="support">
    
      <section className="supportPage">
        <h1 className="supportPageTitle">Support</h1>
        <span className="supportDesc">
          If you have any questions or need help, feel free to reach out to us.
        </span>
        <form className="supportForm" ref={form} onSubmit={sendEmail}>
          <input
            type="text"
            className="name"
            placeholder="Your Name"
            name="from_name"
            required
          />
          <br />
          <input
            type="email"
            className="email"
            placeholder="Your Email Address"
            name="from_email"
            required
          />
          <br />
          <textarea
            className="msg"
            name="message"
            rows="10"
            cols="30"
            placeholder="Your Issue"
            required
          ></textarea>
          <br />
          <button type="submit" value={"send"} className="submitBtn">
            Submit
          </button>
          <br />
          
        </form>
      </section>
    </div>
   
  );
};

export default UserSupport;
