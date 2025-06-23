import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import ProductCard from './ProductCard'; // Ensure this component is created
import productsData from './products.json'; // Import your JSON data
import first from './images/first.jpg';
import second from './images/second.jpg';
import third from './images/third.jpg';
import ithird from './images/ithird.png'; 
import ifourth from './images/ifourth.png'; 
import ifirst from './images/ifirst.png';
import isecond from './images/isecond.png';
import ififth from './images/ififth.png';
import celeb1 from './images/c1.jpg';
import celeb2 from './images/c2.jpg';
import celeb3 from './images/c3.jpg';
import celebi1 from './images/i1.jpg';
import celebi2 from './images/i2.jpg';
import celebi3 from './images/i3.jpg';
import celebi4 from './images/i4.jpg';
import celebi5 from './images/i5.jpg';
import celebi6 from './images/i6.jpg';

const images = [first, second, third]; // Array of images for the slideshow
const imagesWithDetails = [
    { src: ifirst, name: "Bracelet", link: "/bracelet" },
    { src: isecond, name: "Mangalsutra", link: "/mangalsutra" },
    { src: ithird, name: "Necklace", link: "/necklace" },
    { src: ifourth, name: "Rings", link: "/rings" },
    { src: ififth, name: "Earrings", link: "/earrings" },
];

const Home = ({onLike,likedProducts}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [dateNightProducts, setDateNightProducts] = useState([]);
  const [officewearProducts, setOfficewearProducts] = useState([]);
  const [coffeerunProducts, setCoffeerunProducts] = useState([]);

  // Slideshow logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000); // Change the large image every 8 seconds

    return () => clearInterval(interval); // Cleanup interval when the component unmounts
  }, []);

  // Filter products by subcategory
  useEffect(() => {
    const filteredProducts = productsData.filter(
      (product) => product.subcategory === "Date Night"
    );
    setDateNightProducts(filteredProducts);
  }, []);

  useEffect(() => {
    const filteredProducts = productsData.filter(
      (product) => product.subcategory === "Office Wear"
    );
    setOfficewearProducts(filteredProducts);
  }, []);

  useEffect(() => {
    const filteredProducts = productsData.filter(
      (product) => product.subcategory === "Coffee Run"
    );
    setCoffeerunProducts(filteredProducts);
  }, []);
  return (
    <div>
      {/* Slideshow Section */}
      <div className="slideshow-container">
        <img
          src={images[currentImageIndex]}
          alt="Slideshow"
          className="slideshow-image"
        />
      </div>

      <hr className="br" />
      <h3 className="title">Find Your Perfect Piece</h3>
      <hr className="br" />

      {/* Horizontal Scrollable Circle Images with Links */}
      <div className="circle-images">
        {imagesWithDetails.map((item, index) => (
          <div key={index} className="circle-image-container">
            <Link to={item.link} className="circle-image-link">
              <img src={item.src} alt={item.name} className="circle-image" />
            </Link>
            <Link to={item.link} className="circle-image-text">
              {item.name}
            </Link>
          </div>
        ))}
      </div>

      {/* Product Grid for Date Night */}
      
      <h3 className="title2">Date Night Collection</h3>
<div className="product-grid">
  {dateNightProducts.map((product) => (
    <ProductCard
  key={product.id}
  product={product}
  onLike={onLike}
  likedProducts={likedProducts}
/>

  ))}
</div>

<h3 className="title2">Office Wear Collection</h3>
<div className="product-grid">
  {officewearProducts.map((product) => (
    <ProductCard
  key={product.id}
  product={product}
  onLike={onLike}
  likedProducts={likedProducts}
/>

  ))}
</div>

<h3 className="title2">Coffee Run  Collection</h3>
<div className="product-grid">
  {coffeerunProducts.map((product) => (
    <ProductCard
  key={product.id}
  product={product}
  onLike={onLike}
  likedProducts={likedProducts}
/>

  ))}
</div>


      <hr className="br" />
      <img className="img-con" src={second} alt='image'/>
      <hr className="br" />

      <h3 className="title">CELEB PICKS</h3>
        <div className="container box2">
            <img className="box" src={celeb2}/>
            <img className="box" src={celeb1}/>
            <img className="box" src={celeb3}/>
            
           
            
        </div>
        <div className="container box3">
            <img className="box4" src={celebi1}/>
            <img className="box4" src={celebi2}/>
            <img className="box4" src={celebi3}/>
            <img className="box4" src={celebi4}/>
            <img className="box4" src={celebi5}/>
            <img className="box4" src={celebi6}/>
            
           
            
        </div>
      <hr className="br" />
    </div>
  );
};

export default Home;
