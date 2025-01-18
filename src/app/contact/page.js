"use client"
import React, { useState } from 'react';
import { useRouter } from "next/navigation";

export default function Contact ()  {

    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();

        const messageData = {
            firstname,
            lastname,
            phone,
            email,
            subject,
            text,
        };

        const response = await fetch('/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageData),
        });

        const data = await response.json();
        if (data.success) {
            router.replace('/message-send')
        } else {
            setErrorMessage(data.message || 'Certains champs sont requis');
            setEmail('')
        }
    };

    return (
        <main className="main-contact">

            <div className="contact-gauche">
                <h2>INFORMATIONS</h2>
                <p className="email" ><i className="fa-solid fa-envelope"></i> E-mail : <a className="lien-email-contact" href="https://mail.google.com/mail/u/0/?pli=1#inbox?compose=jrjtXSqLRHkvJhjCPjCpZzpwDfvhnBhqQzwfBgspDTXfstxJQXqfwrXrdkGcvvcjCSgrbhhW" target="_blank" rel="noreferrer">aros.wtch@gmail.com</a></p>
                <p className="tel"><i className="fa-solid fa-phone"></i> Nous appeler : <a className="lien-tel-contact" href="tel:+32473348434" target="_blank" rel="noreferrer">+32 473 34 84 34</a></p>
            </div>


            <div method="post" className="contact-droite">
                <h3 className="h3-contact">NOUS CONTACTER</h3>
                <form onSubmit={handleSubmit}>

                    <label className="prenom-text">Prénom<sup>*</sup></label>
                    <input className="prenom-zone" type="text" name="firstname" placeholder="Votre prénom" required value={firstname} onChange={(e) => setFirstName(e.target.value)} />
                    <br></br>
                    
                    <label className="nom-text">Nom<sup>*</sup></label>
                    <input className="nom-zone" type="text" name="lastname" placeholder="Votre nom" required value={lastname} onChange={(e) => setLastName(e.target.value)} />
                    <br></br>

                    <label className="tel-text">Téléphone (optionnel)</label>
                    <input className="tel-zone" type="tel" placeholder="Votre numéro de téléphone" value={phone} 
                    onChange={(e) => {
                        const newValue = e.target.value.replace(/[^0-9+\s]/g, '');
                        setPhone(newValue);
                      }} />
                    <br></br>

                    <em>Vos données resteront confidentielles</em>
                    <br></br>

                    <label className="email-text">Adresse e-mail<sup>*</sup></label>
                    <input className="email-zone" type="email" name="email" placeholder="votre@email.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    <br></br>

                    <label className="sujet-text">Sujet</label>
                    <input className="sujet-zone" type="text" placeholder="Votre sujet" value={subject} onChange={(e) => setSubject(e.target.value)} />
                    <br></br>

                    <label className="message-text">Message<sup>*</sup></label>
                    <textarea rows={10} cols={50} className="zonetexte" name="message" id="message" placeholder="Comment pouvons-nous vous aider ?" required value={text} onChange={(e) => setText(e.target.value)} />
                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <em><sup>*</sup> Champs obligatoires</em>
                    <br></br>

                    <br></br>
                    <button type='submit' className="envoyer-contact">Envoyer</button>
                </form>


            </div>
        </main>


    )
}