import React from 'react';
import './header.styles.scss';

import { Link } from 'react-router-dom'

import { authService } from '../../firebase/firebase.utility';

// import AuthPage from '../../pages/authpage/authpage.components';
// import HomePage from '../../pages/homepage/homepage.components';
// import PostingPage from '../../pages/postingpage/postingpage.components';
// import UserPage from '../../pages/userpage/userpage.components';


const Header = ({ refreshUser, isLoggedIn, userObj }) => {
    return (
    <div className='header'>
        <Link className='header__option' to='/'>함께걷개</Link>
        {isLoggedIn ? (
            <>
            <Link className='header__option' to='/user'>회원정보</Link>
            <div className='header__option' onClick={() => authService.signOut()}>로그아웃 </div>
            <Link className='header__option' to='/posting'>글쓰기</Link>
            </>
        ) : ( 
            <Link className='header__option' to='/auth'>로그인</Link>
        )}
        
    </div>
    );
};

export default Header;