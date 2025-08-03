import React, { useState } from 'react';
import './LoginForm.css';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';

function LoginForm({ form, setForm, handleLoginSubmit }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form className="login-form" onSubmit={handleLoginSubmit}>
      <h2>Login to Dress Me</h2>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
        className="login-input"
      />

      <div className="password-wrapper">
        <input
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="login-input"
        />
        <span
          className={`eye-icon ${form.password ? 'visible' : 'hidden'}`}
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <VscEyeClosed size={20} /> : <VscEye size={20} />}
        </span>
      </div>

      <button type="submit" className="login-button">Login</button>
    </form>
  );
}

export default LoginForm;
