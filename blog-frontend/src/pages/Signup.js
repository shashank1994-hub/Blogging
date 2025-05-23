import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

const Signup = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await registerUser(form);
      alert("Signup successful");
      navigate("/login");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input name="username" value={form.username} onChange={onChange} placeholder="Username" />
      <input name="email" value={form.email} onChange={onChange} placeholder="Email" />
      <input name="password" value={form.password} onChange={onChange} placeholder="Password" type="password" />
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
