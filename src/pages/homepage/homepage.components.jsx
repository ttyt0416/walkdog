import React from 'react';
import './homepage.styles.scss';

import SignUp from '../../components/signup/signup.components';

const HomePage = () => {
    return(
        <>
        <h1 className='homepage-title'>함께걷개</h1>
        <SignUp />
        </>
    );
};

export default HomePage;