import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); 

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://127.0.0.1:8080/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId",res.data.userId);
      localStorage.setItem("firstName", res.data.firstName);
      localStorage.setItem("lastName", res.data.lastName);
      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <div className={styles.password_container}>
              <input
                type={isPasswordVisible ? "text" : "password"} // Toggle input type based on state
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                className={styles.input}
              />
              <div
                className={styles.eye_icon}
                onClick={() => setIsPasswordVisible(!isPasswordVisible)} // Toggle visibility
              >
                {isPasswordVisible ? <FiEye /> : <FiEyeOff />}
              </div>
            </div>
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign In
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <h1>New Here ?</h1>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
