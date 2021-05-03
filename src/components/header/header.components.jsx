import React from 'react';
import './header.styles.scss';

import { Link } from 'react-router-dom'


const Header = () => {
    return (
    <div className='header'>
        <Link className='header-option' to='/'>함께걷개</Link>
        <Link className='header-option' to='/auth'>로그인</Link>
    </div>
    );
};

export default Header;