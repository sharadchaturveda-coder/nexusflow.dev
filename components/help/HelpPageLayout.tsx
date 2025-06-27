import Navbar from '../Navbar';
import SeoHead from '../SeoHead';
import styles from '../../styles/Dashboard.module.css';

interface HelpPageLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

const HelpPageLayout: React.FC<HelpPageLayoutProps> = ({ children, title, description }) => {
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

export default HelpPageLayout;
