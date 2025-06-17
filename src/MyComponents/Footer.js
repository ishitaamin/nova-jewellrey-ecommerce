import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaPinterestP } from "react-icons/fa";

// Category base names for correct URL structure
const footerLinks = [
  {
    title: "Necklace",
    category: "necklace",
    links: ["All Necklaces", "Pendant", "Pearl", "Statement", "Initial", "Emerald", "Layered"],
  },
  {
    title: "Ring",
    category: "ring",
    links: ["All Ring", "Statement", "Pearl", "Minimal", "Stackable", "Couples", "Diamond"],
  },
  {
    title: "Bracelets",
    category: "bracelet",
    links: ["All Bracelets", "Charm", "Chain", "Cuff", "Stone", "Pearl", "Mangalsutra"],
  },
  {
    title: "Mangalsutra",
    category: "mangalsutra",
    links: ["All Mangalsutra", "Diamond", "Initial"],
  },
  {
    title: "Earring",
    category: "earring",
    links: ["All Earring", "Statement", "Stud", "Danglers", "Pearl"],
  },
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        {footerLinks.map((category, index) => (
          <div key={index} className="footer-column">
            <h4 className="footer-title">{category.title}</h4>
            <ul className="footer-links">
              {category.links.map((link, idx) => (
                <li key={idx}>
                  {/* Route to `/category/:categoryName` */}
                  <Link to={`/${category.category}`}>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <p>Follow us on:</p>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer"><FaPinterestP /></a>
        </div>
        <p className="copyright">© {new Date().getFullYear()} Nova. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
