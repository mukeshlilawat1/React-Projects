import React from 'react';
import "./Header.css";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import { VideoCall, Apps, Notifications } from '@mui/icons-material';

function Header() {
    return (
        <div className='header'>
            <div className='header_left'>
                <MenuIcon />
                <img 
                    className='header_logo' 
                    src='https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg' 
                    alt='youtube' 
                />
            </div>

            <div className='header_input'>
                <input placeholder='Search' type='text' />
                <SearchIcon className='header_inputButton' />
            </div>

            <div className='header_icons'>
                <VideoCall className='header__icon' />
                <Apps className='header__icon' />
                <Notifications className='header__icon' />
                <Avatar 
                    alt='lilawat' 
                    src='https://yt3.ggpht.com/XwuJx_kYo8MUFUqlnYrcd7ef6kNLU_vHAokPMkQmLRLkEXsaJlsGQll6Xva5RhtNl2rR4JW2=s88-c-k-c0x00ffffff-no-rj' 
                />
            </div>
        </div>
    );
}

export default Header;
