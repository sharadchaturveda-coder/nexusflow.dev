import MobileMenuItemLink from './NavbarMobileMenuItemLink';

const MobileAuthenticatedNavLinks: React.FC = () => {
  return (
    <>
      <MobileMenuItemLink href="/dashboard">CRM</MobileMenuItemLink>
      <MobileMenuItemLink href="/chat">Chat</MobileMenuItemLink>
      <MobileMenuItemLink href="/billing">Billing</MobileMenuItemLink>
      <MobileMenuItemLink href="/help">Help</MobileMenuItemLink>
      <MobileMenuItemLink href="/account">My Account</MobileMenuItemLink>
    </>
  );
};

export default MobileAuthenticatedNavLinks;
