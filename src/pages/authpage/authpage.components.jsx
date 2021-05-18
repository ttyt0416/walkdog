import React, { useState } from 'react';
import './authpage.styles.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { authService, firebaseInstance } from '../../firebase/firebase.utility';

const inputStyles = {};

const AuthPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onSocialClick = async (event) => {
        event.preventDefault();
        const {
            target: {name},
        } = event
        let provider;
        if(name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }
        await authService.signInWithPopup(provider);
    };

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
      <div className="authPage__container">
        <form onSubmit={onSubmit} className="authPage__form">
          <input
            name="email"
            type="email"
            placeholder="이메일"
            required
            value={email}
            onChange={onChange}
            className="authPage__input"
          />
          <input
            name="password"
            type="password"
            placeholder="비밀번호"
            required
            value={password}
            className="authPage__input"
            onChange={onChange}
          />
          <div className="authPage__btns">
            <input
              type="submit"
              className="authPage__submit"
              value={newAccount ? "회원가입" : "로그인"}
            />
            {error && <span className="authPage__error">{error}</span>}
            <button
              onClick={onSocialClick}
              name="google"
              className="authPage__btn"
            >
              <FontAwesomeIcon icon={faGoogle} />
               &nbsp;구글로 {newAccount ? "회원가입" : "로그인"}
            </button>
          </div>
          <div onClick={toggleAccount} className="authPage__switch">
            {newAccount ? "로그인" : "회원가입"}
          </div>
        </form>
      </div>
    );
};

export default AuthPage;