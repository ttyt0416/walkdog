import React, { useState } from 'react';
import { authService } from '../../firebase/firebase.utility';

import './authform.styles.scss';

const inputStyles = {};

const AuthForm = () => {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <>
      <form onSubmit={onSubmit} className="auth__container">
        <input
          name="email"
          type="email"
          placeholder="이메일"
          required
          value={email}
          onChange={onChange}
          className="auth__input"
        />
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          required
          value={password}
          className="auth__input"
          onChange={onChange}
        />
        <input
          type="submit"
          className="auth__input auth__submit"
          value={newAccount ? "계정생성" : "로그인"}
        />
        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={toggleAccount} className="auth__switch">
        {newAccount ? "로그인" : "계정생성"}
      </span>
    </>
  );
};

export default AuthForm;