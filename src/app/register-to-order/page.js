"use client"
import { useState } from "react";
import Link from 'next/link'
import { useRouter } from "next/navigation";

export default function Register () {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setIsLoading(true);

        if (!firstname || !lastname || !email || !password) {
            setErrorMessage('Tous les champs sont requis.');
            setIsLoading(false);
            return;
        }

        const registerData = {
            firstname,
            lastname,
            email,
            password
        };

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerData),
            });

            const data = await response.json();
            if (data.success) {
                router.replace('/login-to-order');

            } else {
                setErrorMessage(data.message || 'Une erreur est survenue lors de l\'inscription.');
                setEmail(''); 
            }
        } catch (error) {
            console.error('Erreur lors de l\'inscription :', error);
            setErrorMessage('Erreur réseau. Veuillez réessayer plus tard.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="main-register">
            <h2 className="h2-login">S'inscrire</h2>
                <form className='form-register' onSubmit={handleSubmit}>
                    <input className="firstname-register" type="text" name="firstname" placeholder="Votre prénom" required value={firstname} onChange={(e) => setFirstName(e.target.value)} />
                    <input className="lastname-register" type="text" name="lastname" placeholder="Votre nom" required value={lastname} onChange={(e) => setLastName(e.target.value)} />
                    <input
                        className="email-register"
                        type="email"
                        name="email"
                        placeholder="votre@email.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="mdp-register"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Mot de passe"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                        <button className="btn-hide-register" type="button" onClick={togglePasswordVisibility}>
                            {showPassword ? <i className="fa-regular fa-eye-slash"></i> : <i className="fa-regular fa-eye"></i>}
                        </button>  
                    <div>
                        <button type="submit" className="btn-register" disabled={isLoading}>{isLoading ? 'Chargement...' : "S'inscrire"}</button>
                    </div>
                </form>
                        
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                       
                    
                <div>
                    <p>
                        Vous avez déjà un compte ?{' '}
                        <Link className="nav-register" to="/login-to-order">
                            {' '}
                            Se connecter
                        </Link>
                    </p>
                </div>
            </div>
    );
};

