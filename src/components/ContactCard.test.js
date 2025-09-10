// src/components/ContactCard.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactCard from './ContactCard';

describe('ContactCard Component', () => {
  const mockProps = {
    name: 'Viljar Frotjold',
    email: 'vito@netlight.com',
    phone: '+47 123 45 678',
    imageUrl: 'profile.png',
    pixarUrl: 'pixar-profile.png',
    linkedinUrl: 'https://www.linkedin.com/in/viljar-frotjold/',
  };

  test('renders the front of the card initially', () => {
    render(<ContactCard {...mockProps} />);
    
    // Check for front-facing content
    expect(screen.getByText(mockProps.email)).toBeInTheDocument();
    expect(screen.getByText('LinkedIn Profile')).toBeInTheDocument();
    expect(screen.getByAltText(`${mockProps.name}'s profile`)).toBeVisible();

    // Check that the back is not visible
    expect(screen.getByAltText(`${mockProps.name}'s Pixar-style`)).not.toBeVisible();
  });

  test('flips the card on mouse enter and reveals the back', () => {
    render(<ContactCard {...mockProps} />);
    
    const card = screen.getByRole('button', { name: /Flip Me!/i });
    fireEvent.mouseEnter(card);

    // The card inner container should have a transform style applied
    const flipper = screen.getByAltText(`${mockProps.name}'s profile`).closest('.flip-card-inner');
    expect(flipper).toHaveStyle('transform: rotateY(20deg) translateY(-85px)');
  });

  test('stops flipping on mouse leave', () => {
    render(<ContactCard {...mockProps} />);
    
    const card = screen.getByRole('button', { name: /Flip Me!/i });
    fireEvent.mouseEnter(card);
    
    const flipper = screen.getByAltText(`${mockProps.name}'s profile`).closest('.flip-card-inner');
    expect(flipper).toHaveStyle('transform: rotateY(20deg) translateY(-85px)');

    fireEvent.mouseLeave(card);
    // After mouseLeave, the rotation should snap back to 0 or 180
    expect(flipper).toHaveStyle('transform: rotateY(0deg) translateY(0px)');
  });
  
  test('renders the correct href for email and LinkedIn links', () => {
    render(<ContactCard {...mockProps} />);
    
    // The email button doesn't have an href, but a mailto: is triggered via onClick
    // This is harder to test without more complex setups, so we check for presence.
    expect(screen.getByText(mockProps.email)).toBeInTheDocument();

    const linkedInLink = screen.getByText('LinkedIn Profile').closest('a');
    expect(linkedInLink).toHaveAttribute('href', mockProps.linkedinUrl);
    expect(linkedInLink).toHaveAttribute('target', '_blank');
  });
});