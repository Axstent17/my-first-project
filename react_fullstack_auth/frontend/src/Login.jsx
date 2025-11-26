import React, { useState } from 'react';

export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      window.location.href = "/";
    } else {
      alert("Incorrect login!");
    }
  }

  return (
    <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", width: "200px" }}>
      <input placeholder="email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="password" type="password" onChange={e => setPassword(e.target.value)} />
      <button>Login</button>
    </form>
  );
}
