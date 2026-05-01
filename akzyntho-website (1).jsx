import { useState } from 'react';
import { ChevronRight, Play, Zap, Camera, Edit, Package, Brain, ArrowUpRight } from 'lucide-react';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@300;400;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #0d0d0d;
    color: #ffffff;
    font-family: 'Montserrat', sans-serif;
    overflow-x: hidden;
  }

  /* Animated background grid */
  .grid-bg {
    position: fixed;
    inset: 0;
    opacity: 0.08;
    background-image: 
      linear-gradient(0deg, transparent 24%, rgba(255,30,30,.2) 25%, rgba(255,30,30,.2) 26%, transparent 27%, transparent 74%, rgba(255,30,30,.2) 75%, rgba(255,30,30,.2) 76%, transparent 77%, transparent),
      linear-gradient(90deg, transparent 24%, rgba(255,30,30,.2) 25%, rgba(255,30,30,.2) 26%, transparent 27%, transparent 74%, rgba(255,30,30,.2) 75%, rgba(255,30,30,.2) 76%, transparent 77%, transparent);
    background-size: 50px 50px;
    pointer-events: none;
    z-index: 1;
  }

  .container {
    position: relative;
    z-index: 2;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 20px;
  }

  /* Navigation */
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 0;
    border-bottom: 1px solid rgba(255,30,30,0.2);
    position: sticky;
    top: 0;
    backdrop-filter: blur(8px);
    background: rgba(13,13,13,0.95);
    z-index: 100;
  }

  .logo {
    font-family: 'Bebas Neue', monospace;
    font-size: 28px;
    font-weight: 700;
    letter-spacing: 2px;
  }

  .logo .ak {
    color: #ff1e1e;
  }

  .logo .zyntho {
    color: #ffffff;
  }

  .nav-links {
    display: flex;
    gap: 32px;
    list-style: none;
  }

  .nav-links a {
    text-decoration: none;
    color: #999999;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    transition: all 0.3s ease;
    position: relative;
  }

  .nav-links a:hover {
    color: #ff1e1e;
  }

  .nav-links a::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: #ff1e1e;
    transition: width 0.3s ease;
  }

  .nav-links a:hover::after {
    width: 100%;
  }

  /* Hero */
  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 48px;
    padding: 80px 0;
    position: relative;
    overflow: hidden;
  }

  .hero::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(255,30,30,0.15) 0%, transparent 70%);
    border-radius: 50%;
    filter: blur(40px);
  }

  .hero-content {
    position: relative;
    z-index: 3;
    max-width: 700px;
  }

  .hero-label {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    border: 1px solid rgba(255,30,30,0.4);
    border-radius: 0;
    font-size: 11px;
    color: #ff1e1e;
    margin-bottom: 24px;
    background: rgba(255,30,30,0.05);
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }

  .hero h1 {
    font-family: 'Bebas Neue', monospace;
    font-size: clamp(52px, 10vw, 92px);
    font-weight: 400;
    line-height: 1.1;
    margin-bottom: 24px;
    letter-spacing: 3px;
    text-transform: uppercase;
    animation: fadeInUp 0.8s ease-out 0.2s backwards;
  }

  .hero h1 span {
    color: #ff1e1e;
  }

  .hero-desc {
    font-size: 16px;
    color: #cccccc;
    line-height: 1.8;
    margin-bottom: 32px;
    max-width: 600px;
    font-weight: 300;
  }

  .hero-buttons {
    display: flex;
    gap: 16px;
    align-items: center;
    flex-wrap: wrap;
  }

  .btn {
    padding: 14px 32px;
    border-radius: 0;
    font-size: 12px;
    font-weight: 700;
    border: none;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 2px;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: 'Bebas Neue', monospace;
  }

  .btn-primary {
    background: #ff1e1e;
    color: #000000;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 40px rgba(255,30,30,0.4);
  }

  .btn-ghost {
    background: transparent;
    color: #ffffff;
    border: 1.5px solid rgba(255,30,30,0.5);
  }

  .btn-ghost:hover {
    border-color: #ff1e1e;
    color: #ff1e1e;
    background: rgba(255,30,30,0.05);
  }

  /* Services Section */
  .services {
    padding: 120px 0;
  }

  .section-title {
    font-family: 'Bebas Neue', monospace;
    font-size: 52px;
    font-weight: 400;
    margin-bottom: 16px;
    text-align: center;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .section-title span {
    color: #ff1e1e;
  }

  .section-subtitle {
    text-align: center;
    color: #cccccc;
    font-size: 16px;
    margin-bottom: 64px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    font-weight: 300;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
  }

  .service-card {
    padding: 32px;
    border: 1px solid rgba(255,30,30,0.1);
    border-radius: 0;
    background: rgba(26,26,26,0.5);
    backdrop-filter: blur(8px);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .service-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,30,30,0.15) 0%, transparent 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .service-card:hover {
    border-color: #ff1e1e;
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(255,30,30,0.15);
  }

  .service-card:hover::before {
    opacity: 1;
  }

  .service-icon {
    width: 56px;
    height: 56px;
    border-radius: 0;
    background: rgba(255,30,30,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    color: #ff1e1e;
  }

  .service-card h3 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 12px;
    font-family: 'Bebas Neue', monospace;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .service-card p {
    font-size: 14px;
    color: #b0b0b0;
    line-height: 1.7;
    margin-bottom: 16px;
  }

  .service-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #ff1e1e;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .service-link:hover {
    gap: 12px;
  }

  /* YouTube Section */
  .youtube-section {
    padding: 120px 0;
    position: relative;
  }

  .youtube-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: center;
  }

  .youtube-text h2 {
    font-family: 'Bebas Neue', monospace;
    font-size: 52px;
    font-weight: 400;
    margin-bottom: 24px;
    line-height: 1.2;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .youtube-text p {
    font-size: 16px;
    color: #cccccc;
    line-height: 1.8;
    margin-bottom: 32px;
    font-weight: 300;
  }

  .youtube-video {
    position: relative;
    width: 100%;
    aspect-ratio: 16/9;
    border-radius: 0;
    overflow: hidden;
    border: 1px solid rgba(255,30,30,0.2);
  }

  .youtube-video::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,30,30,0.15) 0%, rgba(255,30,30,0.05) 100%);
    z-index: 2;
  }

  .youtube-video img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .play-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 64px;
    height: 64px;
    background: rgba(255,30,30,0.9);
    border-radius: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .play-btn:hover {
    transform: translate(-50%, -50%) scale(1.1);
    background: #ff1e1e;
  }

  .play-btn svg {
    color: #ffffff;
    width: 28px;
    height: 28px;
    fill: currentColor;
  }

  /* Products Section */
  .products {
    padding: 120px 0;
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
  }

  .product-card {
    border: 1px solid rgba(255,30,30,0.1);
    border-radius: 0;
    overflow: hidden;
    background: rgba(26,26,26,0.5);
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .product-card:hover {
    border-color: #ff1e1e;
    transform: translateY(-4px);
  }

  .product-img {
    width: 100%;
    height: 200px;
    background: linear-gradient(135deg, rgba(255,30,30,0.1) 0%, rgba(255,30,30,0.05) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
  }

  .product-info {
    padding: 20px;
  }

  .product-name {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 8px;
    font-family: 'Bebas Neue', monospace;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .product-price {
    font-size: 18px;
    color: #ff1e1e;
    font-weight: 700;
    font-family: 'Bebas Neue', monospace;
  }

  /* AI Features Section */
  .ai-features {
    padding: 120px 0;
    position: relative;
  }

  .ai-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
  }

  .ai-card {
    padding: 32px;
    border: 1px solid rgba(255,30,30,0.2);
    border-radius: 0;
    background: rgba(26,26,26,0.5);
    backdrop-filter: blur(8px);
    transition: all 0.3s ease;
  }

  .ai-card:hover {
    border-color: #ff1e1e;
    box-shadow: 0 20px 40px rgba(255,30,30,0.15);
    transform: translateY(-4px);
  }

  .ai-icon {
    width: 48px;
    height: 48px;
    background: rgba(255,30,30,0.15);
    border-radius: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    color: #ff1e1e;
    font-size: 24px;
  }

  .ai-card h3 {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 12px;
    color: #ffffff;
    font-family: 'Bebas Neue', monospace;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .ai-card p {
    font-size: 14px;
    color: #b0b0b0;
    line-height: 1.7;
  }

  /* CTA Section */
  .cta {
    padding: 80px;
    background: linear-gradient(135deg, rgba(255,30,30,0.1) 0%, rgba(255,30,30,0.05) 100%);
    border: 1px solid rgba(255,30,30,0.2);
    border-radius: 0;
    text-align: center;
    margin: 120px 0;
  }

  .cta h2 {
    font-family: 'Bebas Neue', monospace;
    font-size: 52px;
    font-weight: 400;
    margin-bottom: 20px;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .cta p {
    font-size: 16px;
    color: #cccccc;
    margin-bottom: 32px;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
    font-weight: 300;
  }

  /* Animated Logo */
  .logo-animated {
    font-family: 'Bebas Neue', monospace;
    font-size: 28px;
    font-weight: 700;
    letter-spacing: 2px;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .logo-ak {
    color: #ff1e1e;
    position: relative;
    animation: slideInLeft 0.6s cubic-bezier(0.34,1.56,0.64,1);
  }

  .logo-ak::after {
    content: '';
    position: absolute;
    inset: 0;
    background: #ff1e1e;
    opacity: 0;
    animation: glitch 0.4s infinite;
  }

  .logo-zyntho {
    color: #ffffff;
    position: relative;
    animation: slideInRight 0.8s cubic-bezier(0.34,1.56,0.64,1);
  }

  .logo-zyntho::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 2px;
    background: #ff1e1e;
    animation: draw 1s ease-in-out forwards;
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes glitch {
    0%, 100% { opacity: 0; }
    50% { opacity: 0.1; }
  }

  @keyframes draw {
    to { width: 100%; }
  }

  /* Hero Title Animation */
  .hero h1 {
    animation: fadeInUp 0.8s ease-out 0.2s backwards;
  }

  .hero-desc {
    animation: fadeInUp 0.8s ease-out 0.4s backwards;
  }

  .hero-buttons {
    animation: fadeInUp 0.8s ease-out 0.6s backwards;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Service Cards Stagger */
  .service-card {
    animation: fadeInUp 0.6s ease-out backwards;
  }

  .service-card:nth-child(1) { animation-delay: 0s; }
  .service-card:nth-child(2) { animation-delay: 0.1s; }
  .service-card:nth-child(3) { animation-delay: 0.2s; }
  .service-card:nth-child(4) { animation-delay: 0.3s; }

  /* Glow Effect on Hover */
  .service-card:hover {
    box-shadow: 0 0 20px rgba(255,30,30,0.3), 0 20px 40px rgba(255,30,30,0.15);
  }

  .ai-card:hover {
    box-shadow: 0 0 20px rgba(255,30,30,0.3), 0 20px 40px rgba(255,30,30,0.15);
  }

  /* Section Title Animation */
  .section-title {
    animation: fadeInUp 0.8s ease-out backwards;
  }

  .section-subtitle {
    animation: fadeInUp 0.8s ease-out 0.1s backwards;
  }

  /* Social Links */
  .social-links {
    display: flex;
    gap: 16px;
    justify-content: center;
    margin-top: 24px;
  }

  .social-links a {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255,30,30,0.3);
    color: #ff1e1e;
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 18px;
  }

  .social-links a:hover {
    background: rgba(255,30,30,0.1);
    border-color: #ff1e1e;
    transform: translateY(-2px);
  }

  /* Footer */
  footer {
    border-top: 1px solid rgba(255,30,30,0.1);
    padding: 48px 0;
    color: #999999;
    text-align: center;
    font-size: 13px;
    letter-spacing: 1px;
  }

  /* Values Section */
  .values {
    padding: 120px 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 32px;
    text-align: center;
  }

  .value-item h4 {
    font-family: 'Bebas Neue', monospace;
    font-size: 18px;
    color: #ff1e1e;
    margin-bottom: 8px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  /* Instagram Showcase Section */
  .instagram-section {
    padding: 120px 0;
    position: relative;
  }

  .instagram-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 48px;
  }

  .instagram-post {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    border-radius: 0;
    overflow: hidden;
    border: 1px solid rgba(255,30,30,0.2);
    background: rgba(26,26,26,0.5);
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .instagram-post:hover {
    border-color: #ff1e1e;
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(255,30,30,0.15);
  }

  .instagram-post img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .instagram-post::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,30,30,0.3) 0%, transparent 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 2;
  }

  .instagram-post:hover::before {
    opacity: 1;
  }

  .instagram-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.6);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 3;
  }

  .instagram-post:hover .instagram-overlay {
    opacity: 1;
  }

  .play-icon {
    width: 56px;
    height: 56px;
    background: #ff1e1e;
    border-radius: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
    font-size: 24px;
  }

  .insta-cta {
    text-align: center;
    margin-top: 48px;
  }

  .insta-cta a {
    display: inline-block;
    padding: 14px 32px;
    background: #ff1e1e;
    color: #000;
    text-decoration: none;
    font-family: 'Bebas Neue', monospace;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    transition: all 0.3s ease;
  }

  .insta-cta a:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 40px rgba(255,30,30,0.4);
  }

  /* Contact Section */
  .contact-section {
    padding: 120px 0;
  }

  .contact-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: start;
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .contact-item {
    display: flex;
    gap: 16px;
  }

  .contact-icon {
    width: 48px;
    height: 48px;
    background: rgba(255,30,30,0.15);
    border-radius: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ff1e1e;
    font-size: 20px;
    flex-shrink: 0;
  }

  .contact-details h4 {
    font-family: 'Bebas Neue', monospace;
    font-size: 16px;
    color: #ffffff;
    margin-bottom: 4px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .contact-details p {
    color: #cccccc;
    font-size: 14px;
    font-weight: 300;
  }

  .contact-details a {
    color: #ff1e1e;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .contact-details a:hover {
    text-decoration: underline;
  }

  /* Contact Form */
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .form-group label {
    font-size: 12px;
    color: #ff1e1e;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .form-group input,
  .form-group textarea {
    background: rgba(26,26,26,0.5);
    border: 1px solid rgba(255,30,30,0.2);
    color: #ffffff;
    padding: 12px 16px;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    transition: all 0.3s ease;
  }

  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #ff1e1e;
    box-shadow: 0 0 0 3px rgba(255,30,30,0.1);
  }

  .form-group textarea {
    resize: vertical;
    min-height: 120px;
  }

  .contact-form .btn {
    align-self: flex-start;
    margin-top: 8px;
  }

  /* Responsive Contact */
  @media (max-width: 768px) {
    .contact-content {
      grid-template-columns: 1fr;
      gap: 48px;
    }
  }
`;

export default function AKZynthoWebsite() {
  const [hoveredService, setHoveredService] = useState(null);

  return (
    <>
      <style>{css}</style>
      <div className="grid-bg"></div>

      {/* Navigation */}
      <nav className="container">
        <div className="logo-animated">
          <span className="logo-ak">AK</span><span className="logo-zyntho">ZYNTHO</span>
        </div>
        <ul className="nav-links">
          <li><a href="#services">Services</a></li>
          <li><a href="https://youtube.com/@akzyntho?si=KSe0ky3x17B3y9mm" target="_blank" rel="noopener noreferrer">YouTube</a></li>
          <li><a href="#products">Products</a></li>
          <li><a href="#ai">AI Tools</a></li>
          <li><a href="https://www.instagram.com/akzyntho?igsh=Y3E5c3doYXB4MGN1" target="_blank" rel="noopener noreferrer">Instagram</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero container">
        <div className="hero-content">
          <div className="hero-label">
            <Zap size={14} />
            Visual Creator • Video Editor • Storyteller
          </div>
          <h1>
            Create. <span>Edit.</span> <span>Inspire</span>.
          </h1>
          <p className="hero-desc">
            Turning ideas into visuals. We create stunning video content, handle your creative accounts, and leverage AI to amplify your message across all platforms.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">
              Start Your Project <ArrowUpRight size={16} />
            </button>
            <button className="btn btn-ghost">
              Watch Our Work
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services container">
        <h2 className="section-title">
          Our <span>Services</span>
        </h2>
        <p className="section-subtitle">
          Complete creative solutions for your brand
        </p>
        <div className="services-grid">
          <div className="service-card" onMouseEnter={() => setHoveredService(0)} onMouseLeave={() => setHoveredService(null)}>
            <div className="service-icon"><Edit size={28} /></div>
            <h3>Video Editing</h3>
            <p>Professional editing with color grading, VFX, and motion graphics. Fast turnaround for YouTube and social media.</p>
            <a href="#" className="service-link">Learn More <ChevronRight size={14} /></a>
          </div>

          <div className="service-card" onMouseEnter={() => setHoveredService(1)} onMouseLeave={() => setHoveredService(null)}>
            <div className="service-icon"><Camera size={28} /></div>
            <h3>Photography</h3>
            <p>High-quality content creation and photography. Editing, retouching, and optimization for all platforms.</p>
            <a href="#" className="service-link">Learn More <ChevronRight size={14} /></a>
          </div>

          <div className="service-card" onMouseEnter={() => setHoveredService(2)} onMouseLeave={() => setHoveredService(null)}>
            <div className="service-icon"><Package size={28} /></div>
            <h3>Account Management</h3>
            <p>Complete social media and YouTube management. Strategy, posting, engagement, and growth optimization.</p>
            <a href="#" className="service-link">Learn More <ChevronRight size={14} /></a>
          </div>

          <div className="service-card" onMouseEnter={() => setHoveredService(3)} onMouseLeave={() => setHoveredService(null)}>
            <div className="service-icon"><Brain size={28} /></div>
            <h3>AI Automation</h3>
            <p>Smart captions, thumbnails, and content recommendations. AI-powered tools to scale your growth.</p>
            <a href="#" className="service-link">Learn More <ChevronRight size={14} /></a>
          </div>
        </div>
      </section>

      {/* YouTube Section */}
      <section id="youtube" className="youtube-section container">
        <div className="youtube-content">
          <div className="youtube-text">
            <h2>
              Subscribe to<br /><span style={{ color: '#ff1e1e' }}>AK ZYNTHO</span>
            </h2>
            <p>
              Join thousands of creators learning professional video editing, photography techniques, and creative automation. New content every week designed to level up your skills.
            </p>
            <button className="btn btn-primary">
              <a href="https://youtube.com/@akzyntho?si=KSe0ky3x17B3y9mm" target="_blank" rel="noopener noreferrer" style={{ color: '#000', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Subscribe Now <ArrowUpRight size={16} />
              </a>
            </button>
          </div>
          <div className="youtube-video">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1280 720'%3E%3Crect fill='%231a1a1a' width='1280' height='720'/%3E%3Ctext x='640' y='360' font-size='48' fill='%23ff1e1e' text-anchor='middle' dominant-baseline='middle' font-family='monospace' font-weight='bold'%3EAK ZYNTHO%3C/text%3E%3C/svg%3E" alt="YouTube" />
            <div className="play-btn"><Play /></div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="products container">
        <h2 className="section-title">
          Digital <span>Products</span>
        </h2>
        <p className="section-subtitle">
          Tools and resources for creators
        </p>
        <div className="products-grid">
          <div className="product-card">
            <div className="product-img">🎥</div>
            <div className="product-info">
              <div className="product-name">Preset Pack</div>
              <div className="product-price">₹999</div>
            </div>
          </div>
          <div className="product-card">
            <div className="product-img">✨</div>
            <div className="product-info">
              <div className="product-name">VFX Bundle</div>
              <div className="product-price">₹1,499</div>
            </div>
          </div>
          <div className="product-card">
            <div className="product-img">🎬</div>
            <div className="product-info">
              <div className="product-name">Templates Pack</div>
              <div className="product-price">₹799</div>
            </div>
          </div>
          <div className="product-card">
            <div className="product-img">🎓</div>
            <div className="product-info">
              <div className="product-name">Masterclass</div>
              <div className="product-price">₹2,999</div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section id="ai" className="ai-features container">
        <h2 className="section-title">
          Powered by <span>AI</span>
        </h2>
        <p className="section-subtitle">
          Futuristic tools to automate and amplify your content
        </p>
        <div className="ai-grid">
          <div className="ai-card">
            <div className="ai-icon">🎯</div>
            <h3>Smart Captions</h3>
            <p>AI-generated captions with perfect timing. Auto-translate to 30+ languages instantly.</p>
          </div>
          <div className="ai-card">
            <div className="ai-icon">🖼️</div>
            <h3>Thumbnail Generator</h3>
            <p>AI analyzes your content and generates high-CTR thumbnails. A/B test automatically.</p>
          </div>
          <div className="ai-card">
            <div className="ai-icon">📊</div>
            <h3>Content Analyzer</h3>
            <p>Real-time insights on trending topics, best posting times, and audience engagement.</p>
          </div>
          <div className="ai-card">
            <div className="ai-icon">🔊</div>
            <h3>Voice Enhancement</h3>
            <p>AI removes noise, auto-balances audio, and adds professional production polish.</p>
          </div>
          <div className="ai-card">
            <div className="ai-icon">🎞️</div>
            <h3>Auto Editing</h3>
            <p>Smart scene detection, auto-transitions, color correction powered by ML.</p>
          </div>
          <div className="ai-card">
            <div className="ai-icon">🚀</div>
            <h3>Growth Predictor</h3>
            <p>AI forecasts video performance before upload. Optimize for maximum reach.</p>
          </div>
        </div>
      </section>

      {/* Instagram Portfolio Section */}
      <section id="portfolio" className="instagram-section container">
        <h2 className="section-title">
          Latest From <span>Instagram</span>
        </h2>
        <p className="section-subtitle">
          Check out our recent work and creative projects
        </p>
        <div className="instagram-grid">
          <div className="instagram-post">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect fill='%23162030' width='400' height='400'/%3E%3Ctext x='200' y='200' font-size='32' fill='%23ff1e1e' text-anchor='middle' dominant-baseline='middle' font-family='monospace'%3EVIDEo 1%3C/text%3E%3C/svg%3E" alt="Post 1" />
            <div className="instagram-overlay">
              <div className="play-icon">▶</div>
            </div>
          </div>
          <div className="instagram-post">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect fill='%231a1a2e' width='400' height='400'/%3E%3Ctext x='200' y='200' font-size='32' fill='%23ff1e1e' text-anchor='middle' dominant-baseline='middle' font-family='monospace'%3EVIDEO 2%3C/text%3E%3C/svg%3E" alt="Post 2" />
            <div className="instagram-overlay">
              <div className="play-icon">▶</div>
            </div>
          </div>
          <div className="instagram-post">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect fill='%23162030' width='400' height='400'/%3E%3Ctext x='200' y='200' font-size='32' fill='%23ff1e1e' text-anchor='middle' dominant-baseline='middle' font-family='monospace'%3EVIDEO 3%3C/text%3E%3C/svg%3E" alt="Post 3" />
            <div className="instagram-overlay">
              <div className="play-icon">▶</div>
            </div>
          </div>
          <div className="instagram-post">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect fill='%231a1a2e' width='400' height='400'/%3E%3Ctext x='200' y='200' font-size='32' fill='%23ff1e1e' text-anchor='middle' dominant-baseline='middle' font-family='monospace'%3EVIDEO 4%3C/text%3E%3C/svg%3E" alt="Post 4" />
            <div className="instagram-overlay">
              <div className="play-icon">▶</div>
            </div>
          </div>
          <div className="instagram-post">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect fill='%23162030' width='400' height='400'/%3E%3Ctext x='200' y='200' font-size='32' fill='%23ff1e1e' text-anchor='middle' dominant-baseline='middle' font-family='monospace'%3EVIDEO 5%3C/text%3E%3C/svg%3E" alt="Post 5" />
            <div className="instagram-overlay">
              <div className="play-icon">▶</div>
            </div>
          </div>
          <div className="instagram-post">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect fill='%231a1a2e' width='400' height='400'/%3E%3Ctext x='200' y='200' font-size='32' fill='%23ff1e1e' text-anchor='middle' dominant-baseline='middle' font-family='monospace'%3EVIDEO 6%3C/text%3E%3C/svg%3E" alt="Post 6" />
            <div className="instagram-overlay">
              <div className="play-icon">▶</div>
            </div>
          </div>
        </div>
        <div className="insta-cta">
          <a href="https://www.instagram.com/akzyntho?igsh=Y3E5c3doYXB4MGN1" target="_blank" rel="noopener noreferrer">Follow on Instagram →</a>
        </div>
      </section>
        <div className="value-item">
          <h4>Focus</h4>
          <p>Dedicated to every detail</p>
        </div>
        <div className="value-item">
          <h4>Consistency</h4>
          <p>Reliable, quality output always</p>
        </div>
        <div className="value-item">
          <h4>Creativity</h4>
          <p>Bold ideas, executed perfectly</p>
        </div>
        <div className="value-item">
          <h4>Discipline</h4>
          <p>Structured approach to growth</p>
        </div>
        <div className="value-item">
          <h4>Growth</h4>
          <p>Continuous improvement mindset</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta container">
        <h2>Ready to Transform Your Creative Vision?</h2>
        <p>Let's create something extraordinary together. Stay creative. Stay hungry.</p>
        <button className="btn btn-primary">
          Get in Touch <ArrowUpRight size={16} />
        </button>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section container">
        <h2 className="section-title">
          Get In <span>Touch</span>
        </h2>
        <p className="section-subtitle">
          Have a project in mind? Let's create something amazing together
        </p>

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">📧</div>
              <div className="contact-details">
                <h4>Email</h4>
                <p><a href="mailto:akzyntho@gmail.com">akzyntho@gmail.com</a></p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">📱</div>
              <div className="contact-details">
                <h4>Phone</h4>
                <p><a href="tel:+919510700851">+91 9510700851</a></p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div className="contact-details">
                <h4>Location</h4>
                <p>Gorakhpur, Uttar Pradesh (INDIA)</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">⏰</div>
              <div className="contact-details">
                <h4>Response Time</h4>
                <p>Usually within 24 hours</p>
              </div>
            </div>
          </div>

          <form className="contact-form">
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Your name" required />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="your@email.com" required />
            </div>

            <div className="form-group">
              <label>Project Type</label>
              <input type="text" placeholder="Video Editing, Photography, etc." />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea placeholder="Tell us about your project..." required></textarea>
            </div>

            <button className="btn btn-primary">Send Message</button>
          </form>
        </div>
      </section>
        <p>© 2024 AK ZYNTHO. CREATE • EDIT • INSPIRE | @akzyntho</p>
        <div className="social-links">
          <a href="https://www.instagram.com/akzyntho?igsh=Y3E5c3doYXB4MGN1" target="_blank" rel="noopener noreferrer" title="Instagram">📷</a>
          <a href="https://youtube.com/@akzyntho?si=KSe0ky3x17B3y9mm" target="_blank" rel="noopener noreferrer" title="YouTube">▶️</a>
          <a href="mailto:akzyntho@gmail.com" title="Contact">✉️</a>
        </div>
      </footer>
    </>
  );
}
