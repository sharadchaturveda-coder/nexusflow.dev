import Navbar from '../Navbar';
import SeoHead from '../SeoHead';
import styles from '../../styles/Dashboard.module.css';

interface BillingLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

const BillingLayout: React.FC<BillingLayoutProps> = ({ children, title, description }) => {
  return (
    <div className={`${styles.container} font-sans flex`}>
      <SeoHead title={title} description={description} />
      <Navbar />
      <div className="flex-grow p-8">
        {children}
      </div>
    </div>
  );
};

export default BillingLayout;
