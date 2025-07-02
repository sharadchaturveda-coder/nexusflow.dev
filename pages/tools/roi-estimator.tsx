import ROIEstimator from '@/components/tools/ROIEstimator';
import SeoHead from '@/components/SeoHead';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ROIEstimatorPage = () => {
  return (
    <>
      <SeoHead
        title="ROI & Budget Estimator | Your Company"
        description="Estimate your advertising ROI and budget with our easy-to-use calculator."
      />
      <Navbar />
      <main className="py-12 bg-gray-100 dark:bg-gray-900">
        <ROIEstimator />
      </main>
      <Footer />
    </>
  );
};

export default ROIEstimatorPage;