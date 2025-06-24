import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import ProductCard from './ProductCard'; // Ensure this component is created
import axios from 'axios'; // Import your JSON data


const images = ["/images/first.jpg", "/images/second.jpg", "/images/third.jpg"];
const imagesWithDetails = [
  { src: "/images/ifirst.png", name: "Bracelet", link: "/bracelet" },
  { src: "/images/isecond.png", name: "Mangalsutra", link: "/mangalsutra" },
  { src: "/images/ithird.png", name: "Necklace", link: "/necklace" },
  { src: "/images/ifourth.png", name: "Rings", link: "/rings" },
  { src: "/images/ififth.png", name: "Earrings", link: "/earrings" },
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
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/products');
        const allProducts = res.data;
  
        console.log("🧪 All subcategories:", allProducts.map(p => p.subcategory));
  
        setDateNightProducts(
          allProducts.filter(
            (product) => product.subcategory?.toLowerCase() === "date night"
          )
        );
        setOfficewearProducts(
          allProducts.filter(
            (product) => product.subcategory?.toLowerCase() === "office wear"
          )
        );
        setCoffeerunProducts(
          allProducts.filter(
            (product) => product.subcategory?.toLowerCase() === "coffee run"
          )
        );
      } catch (err) {
        console.error("❌ Error fetching products:", err);
      }
    };
  
    fetchProducts();
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
      <img className="img-con" src={'/images/second.jpg'} alt='image'/>
      <hr className="br" />

      <h3 className="title">CELEB PICKS</h3>
        <div className="container box2">
            <img className="box" src={'/images/c2.jpg'}/>
            <img className="box" src={'/images/c1.jpg'}/>
            <img className="box" src={'/images/c3.jpg'}/>
            
           
            
        </div>
        <div className="container box3">
            <img className="box4" src={'/images/i1.jpg'}/>
            <img className="box4" src={'/images/i2.jpg'}/>
            <img className="box4" src={'/images/i3.jpg'}/>
            <img className="box4" src={'/images/i4.jpg'}/>
            <img className="box4" src={'/images/i5.jpg'}/>
            <img className="box4" src={'/images/i6.jpg'}/>
            
           
            
        </div>
      <hr className="br" />
    </div>
  );
};

export default Home;
