import { motion } from 'framer-motion';

export default function DashboardPreview() {
  return (
    <section className="py-20 px-4 bg-eggshell">
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-600 to-yellow-400 bg-clip-text text-transparent tracking-tight mb-4">
          Your Business. At a Glance.
        </h2>
        <p className="text-lg text-gray-700 max-w-xl mx-auto">
          See everything. Miss nothing. All in one panel.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="bg-white/60 backdrop-blur-lg border border-white/20 p-2 sm:p-4 rounded-3xl shadow-2xl"
        >
          <div className="bg-black rounded-2xl p-4 sm:p-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-white font-bold">Dashboard</span>
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <img src="https://placehold.co/1200x600/000000/FFFFFF/png?text=Live+Dashboard+UI" alt="Nexus Flow AI Dashboard" className="rounded-lg" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
