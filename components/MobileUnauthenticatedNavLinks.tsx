import MobileMenuItemLink from './NavbarMobileMenuItemLink.tsx';

const MobileUnauthenticatedNavLinks: React.FC = () => {
  return (
    <>
      <MobileMenuItemLink href="/#features">Features</MobileMenuItemLink>
      <MobileMenuItemLink href="/pricing">Pricing</MobileMenuItemLink>
      <MobileMenuItemLink href="/#faq">FAQ</MobileMenuItemLink>
    </>
  );
};

export default MobileUnauthenticatedNavLinks;
