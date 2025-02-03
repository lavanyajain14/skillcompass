'use client';
import React from 'react';
import Link from 'next/link';

const features = [
  {
    title: "Career Navigation",
    description: "Plot your career course and track your progress with our interactive tools."
  },
  {
    title: "Skill Mapping",
    description: "Discover and develop the skills that will take you where you want to go."
  },
  {
    title: "Professional Network",
    description: "Connect with mentors and peers who can help guide your journey."
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
  const allCards = [...aboutCards, ...aboutCards]; // Duplicate cards for continuous scroll

  return (
    <div className="bg-gradient-to-br from-[#1a365d] to-[#1e40af] min-h-screen bg-cover bg-center bg-fixed text-white font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-white/10 backdrop-blur-md shadow-md">
        <Link href="/" className="text-xl font-bold">
          SkillCompass
        </Link>
        <div className="space-x-8">
          <Link href="/login" className="text-white hover:text-indigo-300 transition duration-300">
            Login
          </Link>
          <Link href="/signup" className="text-white hover:text-indigo-300 transition duration-300">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-24 px-6">
        <h1 className="text-4xl font-bold mb-4 text-white">Navigate Your Professional Journey</h1>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          Join SkillCompass to chart your course, develop your skills, and reach your career destination with confidence.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/signup"
            className="px-6 py-3 bg-white text-indigo-700 rounded-lg font-semibold transition-transform transform hover:-translate-y-0.5"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-screen-xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-lg rounded-lg p-6 hover:-translate-y-1 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-gray-300">{feature.description}</p>
          </div>
        ))}
      </section>

      {/* About Us Section */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-3xl font-bold mb-12 text-white">About SkillCompass</h2>
        <div className="relative overflow-hidden w-full max-w-screen-xl mx-auto">
          <div className="flex gap-6 animate-[slide_40s_linear_infinite] hover:pause">
            {allCards.map((card, index) => (
              <div
                key={index}
                className="flex-none w-80 bg-white/10 backdrop-blur-lg p-6 rounded-lg hover:bg-white/20 transition-all"
              >
                <h3 className="text-xl font-semibold text-white mb-4">{card.title}</h3>
                {card.stat ? (
                  <>
                    <div className="text-4xl text-indigo-300 font-bold mb-4">{card.stat}</div>
                    <p className="text-gray-300">{card.description}</p>
                  </>
                ) : (
                  <p className="text-gray-300">{card.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/20 backdrop-blur-lg text-gray-300 py-6">
        <p className="text-center">&copy; 2025 SkillCompass. All rights reserved.</p>
      </footer>

      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-slide {
          animation: slide 40s linear infinite;
        }

        .hover\\:pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Welcome;