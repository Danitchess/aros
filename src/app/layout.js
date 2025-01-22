"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link'
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from "./context/AuthContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([])
  const [, setProducts] = useState([]);
  const [headerVisible, setHeaderVisible] = useState(true);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const openMenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    closeMenu();
  };

  useEffect(() => {
    let lastScrollY = 0; 
    let cumulativeScroll = 0; 
    const scrollThreshold = 100; 

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
  
        cumulativeScroll += currentScrollY - lastScrollY;
        if (cumulativeScroll > scrollThreshold) {
          setHeaderVisible(false); 
        }
      } else {
        
        cumulativeScroll = 0; 
        setHeaderVisible(true); 
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const totalItemsInCart = cart.length;
  return (

    <html lang="fr">
<Head>
        <title>Aros Watch - Personnalisation de montres</title>
        <meta name="description" content="Découvrez la boutique Aros Watch et personnalisez votre montre unique." />
        <meta name="keywords" content="Aros, Aros Watch, montre personnalisée, montre personnalisable, boutique en ligne, design de montres" />
        <meta property="og:title" content="Aros Watch" />
        <meta property="og:description" content="Personnalisation de montres" />
        <meta property="og:url" content="https://www.aroswatch.be" />
        <meta property="og:image" content="/public/aros.JPG" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className={`header ${headerVisible ? '' : 'hidden'}`}>

<div>
  <Link href="/"><img id="logo" src="/aros-2.png" alt="logo" height={110} width={160} /></Link>
</div>

<nav className='nav-header'>
  <ul>
    <Link href="/shop">Boutique</Link>
    <Link href="/about">À propos</Link>
    <Link href="/contact">Contact</Link>
  </ul>

</nav>

<div className='header-btn'>
  <button className='btn-panier'><Link href="/cart"><i className="fa-solid fa-bag-shopping"></i></Link></button>
  {totalItemsInCart > 0 && (
    <span className="nbr-panier-item">{totalItemsInCart}</span>
  )}

  <button className="btn-menu-icon" onClick={openMenu}><i className="fa-solid fa-bars"></i></button>

  <div id="sideMenu" className={`menu-icon ${menuOpen ? 'open' : ''}`}>
    <nav className="btn-close-menu" onClick={closeMenu}>&times;</nav>
    {isLoggedIn ? (
      <>
        <Link className="navlink-boutique" href="/shop" onClick={closeMenu} >Boutique</Link>
        <Link className="navlink-page" href="/about" onClick={closeMenu} >À propos</Link>
        <Link className="navlink-page" href="/contact" onClick={closeMenu} >Contact</Link>
        <Link className="navlink-account" onClick={closeMenu} href="/my-account"><button className="navlink-btn-login-register-account-logout">Mon compte <i className="fa-solid fa-arrow-right"></i></button></Link>
        <nav className="navlink-logout" onClick={handleLogout}><button className="navlink-btn-login-register-account-logout">Se déconnecter <i className="fa-solid fa-arrow-right"></i></button></nav>
      </>
    ) : (
      <>
        <Link className="navlink-boutique" href="/shop" onClick={closeMenu} >Boutique</Link>
        <Link className="navlink-page" href="/about" onClick={closeMenu} >À propos</Link>
        <Link className="navlink-page" href="/contact" onClick={closeMenu} >Contact</Link>
        <Link className="navlink-login" onClick={closeMenu} href="/login"><button className="navlink-btn-login-register-account-logout">Se connecter <i className="fa-solid fa-arrow-right"></i></button></Link>
        <Link className="navlink-register" onClick={closeMenu} href="/register"><button className="navlink-btn-login-register-account-logout">S'inscrire <i className="fa-solid fa-arrow-right"></i></button></Link>
      </>
    )}
  </div>

  <button className="btn-login-header" onClick={openMenu}><i className="fa-solid fa-user"></i></button>

  <div id="sideMenu" className={`header-login ${menuOpen ? 'open' : ''}`}>
    <nav className="btn-close-menu" onClick={closeMenu}>&times;</nav>
    {isLoggedIn ? (
      <>
        <Link className="navlink-account" onClick={closeMenu} href="/my-account">Mon compte</Link>
        <nav className="navlink-logout" onClick={handleLogout}>Se déconnecter</nav>
      </>
    ) : (
      <>
        <Link className="navlink-login" onClick={closeMenu} href="/login">Se connecter</Link>
        <Link className="navlink-register" onClick={closeMenu} href="/register">S'inscrire</Link>
      </>
    )}
  </div>
</div>

</header>

    <AuthProvider>
    <CartProvider>
      {children}
    </CartProvider>
    </AuthProvider>

        <footer>
        <div className='footer'>
          <div className='nav2'>
            <a href="https://www.instagram.com/aros.watch/" className="nav-link2" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i></a>
            <a href="https://www.tiktok.com/@aros.watch" className="nav-link2" target="_blank" rel="noreferrer"><i className="fa-brands fa-tiktok"></i></a>
            <p className="">Téléphone : <a className="lien-tel-footer" href="tel: +32 473 34 84 34" target="_blank" rel="noreferrer">+32 473 34 84 34</a></p>
            <p className=''>E-mail : <a className='lien-email-footer' href="https://mail.google.com/mail/u/1/#inbox?compose=jrjtXDztQGLpPvMjJDfvqncNbCBxDrwpFcKXHhWZSDNMszjzDMqpQxXtKtFprGBLKcHTXLbX" target="_blank" rel="noreferrer">aros.wtch@gmail.com</a></p>
          </div>

          <br></br>

          <div className='nav-footer'>
            <Link href="/">Accueil</Link>
            <Link href="/shop">Boutique</Link>
            <Link href="/about">À propos</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <p>Copyright &copy;2025, Designed by Khalife Dani  </p>

        </div>
      </footer>
      </body>
    </html>
  );
}
