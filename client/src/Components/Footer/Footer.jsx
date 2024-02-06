import React from "react";
import "./footer.css";

function Footer() {
    return (
        <>
            <footer>
                <div className="footer-section about">
                    <h1 className="logo-text"><span>Logo</span>Here</h1>
                    <p>
                        This is a blog website where you can read and write blogs.
                    </p>
                    <div className="contact">
                        <span><i className="fas fa-phone"></i> &nbsp; 123-456-789</span>
                        <span><i className="fas fa-envelope"></i> &nbsp;</span>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;