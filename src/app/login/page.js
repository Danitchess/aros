"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { setIsLoggedIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const loginData = {
      email,
      password,
    };

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      if (data.success) {
        const token = data.token;
        const userEmail = data.user.email;

        localStorage.setItem("userEmail", userEmail);
        localStorage.setItem("userToken", token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setIsLoggedIn(true);
        router.replace("/");
      } else {
        setErrorMessage(data.message);
        setPassword("");
        setIsPasswordError(true);
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      setErrorMessage("Erreur de connexion, veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="main-login">
      <h2 className="h2-login">Se connecter</h2>
      <div>
        <form className="form-login" onSubmit={handleSubmit}>
          <input
            className="email-login"
            type="email"
            name="email"
            placeholder="votre@email.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            className={`mdp-login ${isPasswordError ? "input-error" : ""}`}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Mot de passe"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setIsPasswordError(false);
            }}
          />
          <br />
          <button
            className="btn-hide-login"
            type="button"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <i className="fa-regular fa-eye-slash"></i>
            ) : (
              <i className="fa-regular fa-eye"></i>
            )}
          </button>
          <div>
            <button
              type="submit"
              className="btn-login"
              disabled={isLoading}
            >
              {isLoading ? "Chargement..." : "Se connecter"}
            </button>
          </div>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="login-no-acount">
          <p>
            Vous n'avez pas de compte ?{" "}
            <Link className="nav-login" href="/register">
              S'inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
