import React from 'react';
import './header.styles.scss';

import { Link } from 'react-router-dom'


const Header = () => {
    return (
    <div className='header'>
        <Link className='header-option' to='/'>메인</Link>
        <Link className='header-option' to='/signin'>로그인</Link>
        <Link className='header-option' to='/signup'>회원가입</Link>
        <Link className='header-option' to='/filter'>필터</Link>
    </div>
    );
};

export default Header;