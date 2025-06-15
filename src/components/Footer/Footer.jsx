import React from 'react'
import './Footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Latest smartphones, unbeatable prices, and top-notch service delivered with care and speed. Discover innovation, share technology, and upgrade your lifestyle today!</p>

            </div>
            <div className='footer-content-center'>
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li> Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91 9079230480</li>
                    <li>yashcodeone@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className='footer-copyright'> Copyright 2025 - All Right Reserved</p>
    </div>
  )
}

export default Footer