import { useState, useEffect } from 'react';
import NavbarDesktop from './NavbarDesktop';
import NavbarMobile from './NavbarMobile';

const sections = ['features', 'dashboard', 'pricing', 'faq'];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('features');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (let entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { threshold: 0.6 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-yellow-400 bg-clip-text text-transparent pr-4">
          Nexus Flow AI
        </div>
        <NavbarDesktop sections={sections} activeSection={activeSection} />
        <NavbarMobile sections={sections} />
      </div>
    </nav>
  );
}
