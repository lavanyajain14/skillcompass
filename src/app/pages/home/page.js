'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { UserIcon } from '@heroicons/react/24/solid';

const features = [
  {
    title: "Skill Mapping",
    description: "Discover and develop the skills that will take you where you want to go."
  },
  {
    title: "Career Navigation",
    description: "Plot your career course and track your progress with our interactive tools.",
    link: "/pages/skillnavigation" // Link to Skill Navigation page
  },
  {
    title: "Portfolio based project",
    description: "Discover project ideas based on your current skills and receive suggestions for new skills to enhance your expertise.",
    link: "/pages/projects"
  },
  {
    title: "Track Your Progress",
    description: "Monitor your growth with detailed analytics and milestone tracking to celebrate your achievements."
  }
];

const aboutCards = [
  {
    title: "Our Mission",
    description: "Empowering professionals worldwide to navigate their career paths with confidence and precision."
  },
  {
    title: "Active Users",
    stat: "50K+",
    description: "Professionals using SkillCompass to advance their careers"
  },
  {
    title: "Global Reach",
    stat: "30+",
    description: "Countries where professionals use our platform"
  },
  {
    title: "Success Rate",
    stat: "94%",
    description: "Users reporting career growth within 12 months"
  },
  {
    title: "Expert Team",
    description: "Led by industry veterans with over 50 years of combined experience in career development"
  }
];

const Welcome = () => {
  const [scrollY, setScrollY] = useState(0);
  const allCards = [...aboutCards, ...aboutCards];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getGradientStyle = () => {
    const gradientColors = [
      { color: '#204796', position: '0%' },
      { color: '#3271CA', position: '22%' },
      { color: '#439BFF', position: '44%' },
      { color: '#63ACFF', position: '87%' }
    ];

    const scrollProgress = Math.min(scrollY / 500, 1);
    const adjustedPositions = gradientColors.map(({ color, position }) => {
      const pos = parseFloat(position) + (scrollProgress * 10);
      return `${color} ${pos}%`;
    });

    return `linear-gradient(145deg, ${adjustedPositions.join(', ')})`;
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed text-white font-sans"
      style={{ background: getGradientStyle() }}
    >
      {/* Navbar with gradient */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold">
              SkillCompass
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/pages/profile">
                <UserIcon className="w-6 h-6 text-white hover:text-indigo-200 transition duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-24 px-6">
        <h1 className="text-4xl font-bold mb-4">Navigate Your Professional Journey</h1>
        <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
          Join SkillCompass to chart your course, develop your skills, and reach your career destination with confidence.
        </p>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-lg p-6 hover:-translate-y-1 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-200">{feature.description}</p>
              {feature.link && (
                <Link href={feature.link} className="text-blue-500 hover:underline mt-2 inline-block">
                  Learn More
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* About Section with Sliding Cards */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">About SkillCompass</h2>
        <div className="relative overflow-hidden w-full max-w-screen-xl mx-auto">
          <div className="flex gap-6 animate-[slide_40s_linear_infinite] hover:pause">
            {allCards.map((card, index) => (
              <div
                key={index}
                className="flex-none w-80 bg-white/10 backdrop-blur-lg p-6 rounded-lg hover:bg-white/20 transition-all"
              >
                <h3 className="text-xl font-semibold mb-4">{card.title}</h3>
                {card.stat ? (
                  <>
                    <div className="text-4xl text-blue-200 font-bold mb-4">{card.stat}</div>
                    <p className="text-gray-200">{card.description}</p>
                  </>
                ) : (
                  <p className="text-gray-200">{card.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/10 backdrop-blur-lg py-6">
        <p className="text-center text-gray-200">&copy; 2025 SkillCompass. All rights reserved.</p>
      </footer>

      <style jsx>{`
        @keyframes slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .hover\\:pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Welcome;