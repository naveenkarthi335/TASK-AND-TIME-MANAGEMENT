// src/Components/Footer.js
import React from 'react';
import './Footer.css'; // Keep this if you have additional custom styles

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white mt-auto py-3">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <img src="C:\Users\navee\Downloads\logo.png.jpg" className="footer-logo mb-3" />
            <p>Our Customer Support team is available from Monday to Friday, 05:00 AM - 02:00 PM GMT.</p>
            <p>Please contact us via live chat during work hours.</p>
            <p>Address:</p>
            <p>651 N. Broad Street, Suite 206, Middletown DE, United States.</p>
            <p>Email: support@yourcompany.com</p>
            <p>Phone Number: +1 844-351-3534</p>
          </div>
          <div className="col-md-3">
            <h4>Product</h4>
            <ul className="list-unstyled">
              <li><a href="#features" className="text-white">Time Tracking Features</a></li>
              <li><a href="#how-it-works" className="text-white">How it works</a></li>
              <li><a href="/signup" className="text-white">Sign Up</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h4>Company</h4>
            <ul className="list-unstyled">
              <li><a href="#about-us" className="text-white">About Us</a></li>
              <li><a href="#contact-us" className="text-white">Contact Us</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h4>OUR SOCIAL MEDIA HANDLES</h4>
            <div className="footer-social-icons">
              <a href="#facebook" className="text-white mr-3"><i className="fab fa-facebook"></i></a>
              <a href="#twitter" className="text-white mr-3"><i className="fab fa-twitter"></i></a>
              <a href="#google" className="text-white mr-3"><i className="fab fa-google"></i></a>
              <a href="#youtube" className="text-white mr-3"><i className="fab fa-youtube"></i></a>
              <a href="#linkedin" className="text-white mr-3"><i className="fab fa-linkedin"></i></a>
              <a href="#github" className="text-white mr-3"><i className="fab fa-github"></i></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom text-center mt-3">
          <p>© 2024 YourCompany, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
