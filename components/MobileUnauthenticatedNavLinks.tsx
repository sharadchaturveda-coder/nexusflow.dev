import React from 'react';
import MobileMenuItemLink from './NavbarMobileMenuItemLink';

const MobileUnauthenticatedNavLinks: React.FC = () => {
  return (
    <>
      <MobileMenuItemLink href="/#features">Features</MobileMenuItemLink>
      <MobileMenuItemLink href="/#pricing">Pricing</MobileMenuItemLink>
      <MobileMenuItemLink href="/#faq">FAQ</MobileMenuItemLink>
    </>
  );
};

export default MobileUnauthenticatedNavLinks;
