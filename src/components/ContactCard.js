import React, { useState, useRef } from 'react';
import './ContactCard.css'; 

// Helper function to handle image loading errors
const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = `https://placehold.co/128x128/e2e8f0/4a5568?text=N/A`;
};

// --- SVG Icons for the card ---
const MailIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
);

const LinkedInIcon = ({ className }) => (
     <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
    </svg>
);


function ContactCard({ name, email, phone, imageUrl, pixarUrl, linkedinUrl }) {
    const [isFlipping, setIsFlipping] = useState(false);
    const [rotation, setRotation] = useState(0);
    const intervalRef = useRef(null);
    const [hasInteracted, setHasInteracted] = useState(false);
    const cardRef = useRef(null);
    const [cardStyle, setCardStyle] = useState({});

    const startFlipping = () => {
        if (!hasInteracted) {
            setHasInteracted(true);
        }
        if (isFlipping) return;
         
        setIsFlipping(true);
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setRotation(prev => prev + 20);
        }, 25);
    };

    const stopFlipping = () => {
        setIsFlipping(false);
        clearInterval(intervalRef.current);
        setRotation(currentRotation => {
            const remainder = currentRotation % 360;
            if (remainder > 90 && remainder < 270) {
                return Math.ceil(currentRotation / 180) * 180;
            }
            return Math.floor(currentRotation / 180) * 180;
        });
    };

    const handleClick = () => {
        if (isFlipping) {
            stopFlipping();
        } else {
            startFlipping();
        }
    };

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        const x = e.clientX - left - width / 2;
        const y = e.clientY - top - height / 2;
        const rotateX = (y / height) * -15;
        const rotateY = (x / width) * 15;
        setCardStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
        });
    };
     
    const handleMouseLeave = () => {
        stopFlipping();
        setCardStyle({
            transform: 'perspective(1000px) rotateX(0) rotateY(0)'
        });
    };

    const flipStyle = {
        transform: `rotateY(${rotation}deg) ${isFlipping ? 'translateY(-85px)' : 'translateY(0px)'}`
    };

    return (
        <div className={`card-animation-container ${!hasInteracted ? 'animate-nudge-loop' : ''}`}>
            <div 
                ref={cardRef}
                className="contact-card"
                style={cardStyle}
                onClick={handleClick}
                onMouseEnter={startFlipping}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
            >
                <div className="card-content">
                    <div className="header-section">
                        <div className="title-container">
                            <h2 className="title-text text-gradient">
                                Flip Me!
                            </h2>
                            <div className={`avatar-container ${!hasInteracted ? 'animate-bob-loop' : ''}`}>
                               <div className="flip-card-inner" style={flipStyle}>
                                    <div className="flip-card-front">
                                        <img
                                            className="avatar-image"
                                            src={imageUrl} 
                                            alt={`${name}'s profile`}
                                            onError={handleImageError}
                                        />
                                    </div>
                                    <div className="flip-card-back">
                                        <img
                                            className="avatar-image"
                                            src={pixarUrl} 
                                            alt={`${name}'s Pixar-style`}
                                            onError={handleImageError}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="details-section">
                        <button 
                            className="contact-link" 
                            onClick={(e) => {
                                e.stopPropagation(); // Stop the card from flipping
                                window.location.href = `mailto:${email}`; // Manually trigger the email client
                            }}
                        >
                            <MailIcon className="contact-icon" />
                            <span>{email}</span>
                        </button>
                        <a 
                            href={linkedinUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="contact-link" 
                            onClick={(e) => e.stopPropagation()}
                        >
                            <LinkedInIcon className="contact-icon" />
                            <span>LinkedIn Profile</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactCard;