"use client"
import { useState, useEffect } from "react";

export default function Moncompte () {
    const [user, setUser] = useState({ email: "" });
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [errorCodeMessage, setErrorCodeMessage] = useState('');
    const [errorEmailMessage, setErrorEmailMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmationCode, setConfirmationCode] = useState(['', '', '', '', '', '']);
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isCodeVerified, setIsCodeVerified] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isResendDisabled, setIsResendDisabled] = useState(false);
    const [isSendDisabled, setIsSendDisabled] = useState(true);
    const [newEmail, setNewEmail] = useState('');
    const [isEmailChange, setIsEmailChange] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 
    const [isPasswordError, setIsPasswordError] = useState(false);

    const handleInputChange = (e, index) => {
        const updatedCode = [...confirmationCode];
        updatedCode[index] = e.target.value;
        setConfirmationCode(updatedCode);
    };

    const handleKeyDown = (e, index) => {
        if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
            e.preventDefault();
        }
        const prevInput = document.querySelectorAll('.code-input')[index - 1]; 
    if (e.key === 'Backspace' && !e.target.value && prevInput) { 
        prevInput.focus(); 
    }
    };

    const handleFocusNext = (e, index) => {
        const nextInput = document.querySelectorAll('.code-input')[index + 1];
        if (e.target.value && nextInput) {
            nextInput.focus();
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('userToken');

            if (!token) {
                console.error('Utilisateur non authentifié');
                return;
            }

            try {
                const response = await fetch('/api/user/me', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();

                if (data.success) {
                    setUser(data.user);
                    setFormData({
                        firstname: data.user.firstname,
                        lastname: data.user.lastname,
                        email: data.user.email,
                    });
                    setIsLoggedIn(true);
                } else {
                    setErrorMessage('Impossible de récupérer les informations utilisateur.');
                    setIsLoggedIn(false);
                    localStorage.removeItem('userToken');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données utilisateur', error);
                setErrorMessage('Erreur réseau. Veuillez réessayer plus tard.');
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const allFieldsFilled = confirmationCode.every((value) => value.trim() !== ""); 
        setIsSendDisabled(!allFieldsFilled); 
    }, [confirmationCode]);

    const handleEdit = () => {
        const emailForVerification = newEmail || user.email;

        const sendConfirmationCode = async () => {
            setIsLoading(true);

            const response = await fetch('/api/verification/send-confirmation-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: emailForVerification }),
            });

            const data = await response.json();
            if (data.success) {
                setIsLoading(false);
                setIsResendDisabled(true);
                setTimeout(() => {
                    setIsResendDisabled(false);
                }, 10000);

                setIsCodeSent(true);
                setIsCodeVerified(false);
                setEditing(false)
                setErrorCodeMessage('')
                setErrorMessage('')

            } else {
                setErrorMessage(data.message || 'Erreur lors de l\'envoi du code.');
            }

        };

        sendConfirmationCode();
    };

    const handleCodeVerification = async () => {
        if (isSendDisabled) return; // Empêche l'envoi si le formulaire est désactivé
    
        setIsLoading(true); // Affiche le loader pendant la vérification
    
        const code = confirmationCode.join(''); // Concatène les codes
        const emailForVerification = newEmail || user.email; // Utilise l'email modifié ou celui de l'utilisateur
    
        console.log('Code soumis :', code);
    
        try {
            const response = await fetch('/api/verification/verify-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: code, email: emailForVerification }),
            });
    
            if (!response.ok) {
                // Si la réponse n'est pas 2xx, on gère l'erreur
                const errorData = await response.json();
                setIsLoading(false); // Cache le loader
                setErrorCodeMessage('Une erreur est survenue. Veuillez réessayer plus tard.'); // Message d'erreur générique
                console.error('Erreur API:', errorData); // Affiche l'erreur dans la console
                return; // Quitte la fonction en cas d'erreur
            }
    
            const data = await response.json(); // On traite la réponse JSON
    
            if (data.success) {
                setIsLoading(false); // Cache le loader
                setConfirmationCode(['', '', '', '', '', '']); // Réinitialise le code de confirmation
                setErrorCodeMessage(''); // Réinitialise le message d'erreur
                setIsCodeVerified(true); // Code vérifié avec succès
                setSuccessMessage('Code vérifié avec succès. Vous pouvez maintenant modifier vos informations.'); // Message de succès
            } else {
                setIsLoading(false); // Cache le loader
    
                // Vérifie si l'API a renvoyé un message d'erreur spécifique
                if (data.message === 'Aucun code trouvé pour cet email.') {
                    setErrorCodeMessage('Aucun code trouvé pour cet email. Veuillez vérifier l\'email ou demander un nouveau code.');
                } else {
                    setErrorCodeMessage('Code incorrect.'); // Message d'erreur générique
                }
            }
        } catch (error) {
            setIsLoading(false); // Cache le loader
            setErrorCodeMessage('Une erreur est survenue lors de la soumission du code.'); // Message d'erreur générique
            console.error('Erreur réseau:', error); // Affiche l'erreur dans la console (erreur réseau ou autre)
        }
    };
    
    const handleCancel = () => {
        // Réinitialisation des états
        setEditing(false);
        setIsCodeSent(false);
        setIsCodeVerified(false);
        setMenuOpen(false);
    
        // Réinitialisation des données du formulaire
        setFormData({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
        });
    
        // Réinitialisation des messages d'erreur/succès
        setErrorMessage('');
        setSuccessMessage('');
        setNewPassword('');
        setConfirmPassword('');
        setErrorCodeMessage('');
    };
    
    

    const closeMenu = () => {
        setMenuOpen(false);

    };

    const openMenu = () => {
        setMenuOpen(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        if (name === 'newPassword') setNewPassword(value);
        if (name === 'confirmPassword') setConfirmPassword(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('userToken');

        if (newPassword !== confirmPassword) {
            setErrorMessage("Les mots de passe ne correspondent pas.");
            setIsPasswordError(true);
            setConfirmPassword('')
            return;          
        }

        try {
            const response = await fetch('/api/user/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...formData,
                    email: user.email,
                    newPassword,
                    confirmPassword
                }),
            });

            const data = await response.json();
            if (data.success) {
                setUser(data.user);
                setSuccessMessage('Vos informations ont été mises à jour avec succès.');
                setEditing(false);
                setNewPassword('');
                setIsCodeSent(false);
                setIsCodeVerified(false);
                setMenuOpen(false);

            } else {
                setErrorMessage(data.message || 'Une erreur est survenue.');
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour des données utilisateur', error);
            setErrorMessage('Erreur réseau. Veuillez réessayer plus tard.');
        }
    };

    useEffect(() => {
        const input = document.querySelectorAll('.code-input');
        input.forEach((input, index) => {
            const handleInput = (e) => {
                const nextInput = input[index + 1];
                if (e.target.value && nextInput) {
                    nextInput.focus();
                }
            };

            const handleKeydown = (e) => {
                const prevInput = input[index - 1];
                if (e.key === 'Backspace' && !e.target.value && prevInput) {
                    prevInput.focus();
                }
            };

            input.addEventListener('input', handleInput);
            input.addEventListener('keydown', handleKeydown);

            return () => {
                input.removeEventListener('input', handleInput);
                input.removeEventListener('keydown', handleKeydown);
            };
        });
    }, []);

    const handleEmailChange = (e) => {
        const email = e.target.value;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setErrorEmailMessage("Veuillez entrer une adresse email valide.");
    } else {
        setErrorEmailMessage(""); 
    }
        setNewEmail(e.target.value);
    };

    const handleChangeEmail = async (e) => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
            setErrorMessage("Veuillez entrer une adresse email valide.");
            return;
        }

        console.log('Nouvelle adresse email:', newEmail);
        setUser((prevUser) => ({
            ...prevUser,
            email: newEmail,
        }));
        setIsEmailChange(false);
        setErrorEmailMessage("");
    };


    if (!user) return <div>Vous n'êtes pas connecté</div>;

    return (
        <div className="main-account">
            <h2 className="h2-account">Mon Compte</h2>

            {!editing && !isCodeVerified ? (
                <div id="sideMenu" className={`verification-code-container ${menuOpen ? 'open' : ""} ${isLoading ? 'loading-menu' : ''}`}>
                    <nav className={`btn-close-menu-account ${isLoading ? 'loading-menu-btn' : ''}`} onClick={closeMenu}>&times;</nav>
                    {isCodeSent && (
                        <div className="verification-form">
                            <label>
                                Entrez le code envoyé à {user.email} <br></br>
                                (𝐕𝐞́𝐫𝐢𝐟𝐢𝐞𝐳 𝐯𝐨𝐬 𝐜𝐨𝐮𝐫𝐫𝐢𝐞𝐫𝐬 𝐢𝐧𝐝𝐞́𝐬𝐢𝐫𝐚𝐛𝐥𝐞𝐬)
                                <div className="code-input-container">
                                    {confirmationCode.map((value, index) => (
                                        <input
                                            className="code-input"
                                            key={index}
                                            type="text"
                                            maxLength="1"
                                            value={value}
                                            onChange={(e) => handleInputChange(e, index)}
                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                            onInput={(e) => handleFocusNext(e, index)}
                                            autoFocus={index === 0}
                                        />
                                    ))}
                                </div>
                            </label>
                            <button onClick={handleCodeVerification} className={`verify-button ${isSendDisabled ? 'loading' : ''} ${isLoading ? 'loading' : ''}`} disabled={isSendDisabled || isLoading} title={isSendDisabled ? 'Veuillez entrer le code' : ''}>
                                Vérifier le code
                            </button>
                            {errorCodeMessage &&  <p className="error-message">{errorCodeMessage}</p>}

                            <p>Vous n'avez pas reçu le code ?
                              <button onClick={handleEdit} className={`resend-code-button ${isResendDisabled ? 'disabled' : ''}`} disabled={isResendDisabled} title={isResendDisabled ? 'Veuillez attendre 10 secondes avant de renvoyer le code.' : ''}>
                                Renvoyer le code
                              </button>
                            </p>

                            <p>Vous avez perdu votre adresse email ?</p>
                            {isEmailChange && (
                                <div className="email-change-container">
                                    <input
                                        type="email"
                                        placeholder="Nouvelle adresse email"
                                        value={newEmail}
                                        onChange={handleEmailChange}
                                        className="new-email-input"
                                    />
                                    <button onClick={() => {
                                        handleChangeEmail();
                                        handleEdit();
                                    }}
                                        className="change-email-button"
                                        type="submit"
                                        disabled={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)}>
                                        Soumettre la nouvelle adresse
                                    </button>
                                    {errorEmailMessage &&  <p className="error-message">{errorEmailMessage}</p>}
                                </div>
                            )}

                            {!isEmailChange && (
                                <button onClick={() => setIsEmailChange(true)} className="change-email-button">
                                    Changer d'adresse mail
                                </button>
                            )}

                        </div>
                    )}
                </div>
            ) : (
                isCodeVerified && (
                    <form onSubmit={handleSubmit} className="edit-form">
                        <div className="inputs">
                            Prénom:
                            <input
                                type="text"
                                className="firstname-edit-account"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="inputs">
                            Nom:
                            <input
                                type="text"
                                className="lastname-edit-account"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="inputs">
                            Email:
                            <input
                                type="email"
                                className="email-edit-account"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="inputs">
                            Nouveau mot de passe:
                            <input
                                type={showPassword ? "text" : "password"}
                                className={`newMdp-edit-account ${isPasswordError ? 'input-error' : ''}`}
                                name="newPassword"
                                value={newPassword}
                                onChange={(e) => {handlePasswordChange(e) ; setIsPasswordError(false)}}
                                autoComplete="new-password"
                                required
                            />
                        </div>

                        <button className="btn-hide-edit-account" type="button" onClick={togglePasswordVisibility}>
                                {showPassword ? <i className="fa-regular fa-eye-slash"></i> : <i className="fa-regular fa-eye"></i>}
                            </button>

                        <div className="inputs-confirmMdp">
                            Confirmer le nouveau mot de passe:
                            <input
                                type={showPassword ? "text" : "password"}
                                className={`confirmMdp-edit-account ${isPasswordError ? 'input-error' : ''}`}
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => {handlePasswordChange(e) ; setIsPasswordError(false)}}
                                required
                            />                           
                            </div>

                            <button className="btn-hide-edit-account" type="button" onClick={togglePasswordVisibility}>
                                {showPassword ? <i className="fa-regular fa-eye-slash"></i> : <i className="fa-regular fa-eye"></i>}
                            </button>

                        <button type="submit" className="save-button">Sauvegarder</button>
                        <button type="button" onClick={handleCancel} className="cancel-button">
                            Annuler
                        </button>
                    </form>
                )
            )}

            {!editing && !isCodeVerified && isLoggedIn && (
                <div className="infos-account">
                    <p className="p-account-sur-name">Prénom: {user.firstname}</p>
                    <p className="p-account-sur-name">Nom: {user.lastname}</p>
                    <p className="p-account-email">Email: {user.email}</p>
                    <button onClick={() => {
                        handleEdit();
                        openMenu();
                    }} className="edit-button">Modifier</button>
                </div>
            )}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    );

};
