import React from 'react';
import './sidebutton.styles.scss';

const SideButton = () => {
    const appearSidemenu = () => {
        
    }

    return (
        <div className='sidebutton' onClick={appearSidemenu}>
            <i class="sidebutton-bar fas fa-bars"></i>
        </div> 
    )
}

export default SideButton;