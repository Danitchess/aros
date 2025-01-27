"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.css';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from "./context/AuthContext";
import Head from "next/head";
import Script from 'next/script';

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
  const [cart, setCart] = useState([]);
  const [, setProducts] = useState([]);
  const [headerVisible, setHeaderVisible] = useState(true);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
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
    localStorage.removeItem("userToken");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    closeMenu();
  };

  useEffect(() => {
    let lastScrollY = 0;

    let ticking = false;

    let timeout;
    clearTimeout(timeout);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
  
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (currentScrollY > lastScrollY) {
            setHeaderVisible(false);
          } else {
            setHeaderVisible(true);
          }
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };
  
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);
  

  const totalItemsInCart = cart.length;

  const MetaTags = ({
    title: "Aros Watch - Personnalisation de montres",
    description: "Découvrez la boutique Aros Watch et personnalisez votre montre unique.",
    keywords: "aros, aros watch, Aros, Aros Watch, montre personnalisée, montre personnalisable, boutique en ligne, design de montres",
    ogTitle: "Aros Watch",
    ogDescription: "Personnalisation de montres",
    ogUrl: "https://www.aroswatch.be",
    ogImage: "/public/aros.JPG",
  })

  return (
    <html lang="fr">
      <Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-7N5YH3WS6Q"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-7N5YH3WS6Q');
            `,
          }}
        />
      </Head>
      <head>
        <title>{MetaTags.title}</title>
        <meta name="description" content={MetaTags.description} />
        <meta name="keywords" content={MetaTags.keywords} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://aroswatch.be" />
        <meta property="og:title" content={MetaTags.ogTitle} />
        <meta property="og:description" content={MetaTags.ogDescription} />
        <meta property="og:url" content={MetaTags.ogUrl} />
        <meta property="og:image" content={MetaTags.ogImage} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className={`header ${headerVisible ? "" : "hidden"}`}>
          <div>
            <Link href="/"><img id="logo" src="/aros-2.png" alt="logo" height={110} width={160} /></Link>
          </div>

          <nav className="nav-header">
            <ul>
              <Link href="/shop">Boutique</Link>
              <Link href="/about">À propos</Link>
              <Link href="/contact">Contact</Link>
            </ul>
          </nav>

          <div className="header-btn">
            <button className="btn-panier">
              <Link href="/cart"><i className="fa-solid fa-bag-shopping"></i></Link>
            </button>
            {totalItemsInCart > 0 && (
              <span className="nbr-panier-item">{totalItemsInCart}</span>
            )}

            <button className="btn-menu-icon" onClick={openMenu}><i className="fa-solid fa-bars"></i></button>

            <div id="sideMenu" className={`menu-icon ${menuOpen ? "open" : ""}`}>
              <nav className="btn-close-menu" onClick={closeMenu}>&times;</nav>
              {isLoggedIn ? (
                <>
                  <Link className="navlink-boutique" href="/shop" onClick={closeMenu}>Boutique</Link>
                  <Link className="navlink-page" href="/about" onClick={closeMenu}>À propos</Link>
                  <Link className="navlink-page" href="/contact" onClick={closeMenu}>Contact</Link>
                  <Link className="navlink-account" onClick={closeMenu} href="/my-account"><button className="navlink-btn-login-register-account-logout">Mon compte <i className="fa-solid fa-arrow-right"></i></button></Link>
                  <nav className="navlink-logout" onClick={handleLogout}><button className="navlink-btn-login-register-account-logout">Se déconnecter <i className="fa-solid fa-arrow-right"></i></button></nav>
                </>
              ) : (
                <>
                  <Link className="navlink-boutique" href="/shop" onClick={closeMenu}>Boutique</Link>
                  <Link className="navlink-page" href="/about" onClick={closeMenu}>À propos</Link>
                  <Link className="navlink-page" href="/contact" onClick={closeMenu}>Contact</Link>
                  <Link className="navlink-login" onClick={closeMenu} href="/login"><button className="navlink-btn-login-register-account-logout">Se connecter <i className="fa-solid fa-arrow-right"></i></button></Link>
                  <Link className="navlink-register" onClick={closeMenu} href="/register"><button className="navlink-btn-login-register-account-logout">S'inscrire <i className="fa-solid fa-arrow-right"></i></button></Link>
                </>
              )}
            </div>

            <button className="btn-login-header" onClick={openMenu}><i className="fa-solid fa-user"></i></button>

            <div id="sideMenu" className={`header-login ${menuOpen ? "open" : ""}`}>
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
          <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-7N5YH3WS6Q"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-7N5YH3WS6Q');
        `}
      </Script>
      {children}
    </>
          </CartProvider>
        </AuthProvider>

        <footer>
          <div className="footer">
            <div className="nav2">
              <a href="https://www.instagram.com/aros.watch/" className="nav-link2" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i></a>
              <a href="https://www.tiktok.com/@aros.watch" className="nav-link2" target="_blank" rel="noreferrer"><i className="fa-brands fa-tiktok"></i></a>
              <p>Téléphone : <a className="lien-tel-footer" href="tel:+32 473 34 84 34" target="_blank" rel="noreferrer">+32 473 34 84 34</a></p>
              <p>E-mail : <a className="lien-email-footer" href="mailto:aros.wtch@gmail.com">aros.wtch@gmail.com</a></p>
            </div>

            <br />

            <div className="nav-footer">
              <Link href="/">Accueil</Link>
              <Link href="/shop">Boutique</Link>
              <Link href="/about">À propos</Link>
              <Link href="/contact">Contact</Link>
            </div>

            <p>Copyright &copy;2025, Designed by Khalife Dani</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
