import React from 'react';
import './authpage.styles.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { authService, firebaseInstance } from '../../firebase/firebase.utility';

import AuthForm from '../../components/authform/authform.components';

const AuthPage = () => {
    const onSocialClick = async (event) => {
        const {
            target: {name},
        } = event
        let provider;
        if(name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }
        await authService.signInWithPopup(provider);
    };
    return (
        <div className='authPage__container'>
            <AuthForm />
            <div className='authPage__btns'>
                <button onClick={onSocialClick} name='google' className='authPage__btn'>
                    <FontAwesomeIcon icon={faGoogle} />
                </button>
            </div>
        </div>
    );
};

export default AuthPage;