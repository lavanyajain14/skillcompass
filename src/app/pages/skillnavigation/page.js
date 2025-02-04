'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { UserIcon } from '@heroicons/react/24/solid';
import SkillCard from '@/components/skillcard';
import SkillModal from '@/components/skillmodal';

const skills = [
  {
    icon: '💻',
    title: 'Web Development',
    description: 'Master modern web technologies and create stunning digital experiences.',
    steps: [
      { name: 'HTML/CSS Fundamentals', link: 'https://www.freecodecamp.org/learn/responsive-web-design/' },
      { name: 'Advanced JavaScript', link: 'https://javascript.info/' },
      { name: 'React & Modern Frameworks', link: 'https://react.dev/learn' }
    ]
  },
  {
    icon: '📊',
    title: 'Data Analytics',
    description: 'Transform raw data into actionable business insights.',
    steps: [
      { name: 'Excel Data Manipulation', link: 'https://www.coursera.org/learn/excel-basics' },
      { name: 'SQL Database Querying', link: 'https://www.sqlzoo.net/' },
      { name: 'Python for Data Science', link: 'https://www.datacamp.com/courses/data-scientist-with-python' }
    ]
  },
  {
    icon: '📈',
    title: 'Digital Marketing',
    description: 'Build powerful digital strategies that drive growth.',
    steps: [
      { name: 'Marketing Strategy', link: 'https://www.coursera.org/specializations/digital-marketing' },
      { name: 'Social Media Mastery', link: 'https://www.facebook.com/business/learn/certification' },
      { name: 'Advanced Analytics', link: 'https://analytics.google.com/analytics/academy/' }
    ]
  },
  {
    icon: '📷',
    title: 'Professional Photography',
    description: 'Develop technical skills and creative vision.',
    steps: [
      { name: 'Camera Techniques', link: 'https://www.skillshare.com/classes/Photography-Basics-and-Beyond-Your-Camera-and-You/1435997988' },
      { name: 'Composition Masterclass', link: 'https://www.youtube.com/playlist?list=PL1EgOVi-A-kC09pxrU0Ws5-0L57vei595' },
      { name: 'Professional Editing', link: 'https://www.udemy.com/course/adobe-lightroom-cc-course/' }
    ]
  },
  {
    icon: '🎥',
    title: 'Video Production',
    description: 'Create cinematic content that tells compelling stories.',
    steps: [
      { name: 'Cinematography Basics', link: 'https://www.skillshare.com/classes/Video-Basics-How-to-Make-Videos/731934749' },
      { name: 'Advanced Camera Work', link: 'https://www.youtube.com/playlist?list=PL7LQo6R1-QMOBRrA6KOzxzCT9mRet8Qhf' },
      { name: 'Professional Editing', link: 'https://www.udemy.com/course/adobe-premiere-pro-cc-course/' }
    ]
  },
  {
    icon: '🌟',
    title: 'Career Development',
    description: 'Accelerate your professional growth with strategic learning.',
    steps: [
      { name: 'Personal Branding', link: '#' },
      { name: 'Networking Strategies', link: '#' },
      { name: 'Continuous Learning', link: '#' }
    ]
  }
];

export default function Home() {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [scrollY, setScrollY] = useState(0);

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
      className="min-h-screen text-white font-sans"
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

      <div className="flex items-center justify-center p-6">
        <div className="container mx-auto max-w-6xl">
          <header className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">Professional Skills Navigator</h1>
            <p className="text-xl">Curated Learning Paths for Modern Professionals</p>
          </header>

          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <SkillCard
                key={index}
                skill={skill}
                onClick={() => setSelectedSkill(skill)}
              />
            ))}
          </div>

          <SkillModal
            skill={selectedSkill}
            isOpen={!!selectedSkill}
            onClose={() => setSelectedSkill(null)}
          />
        </div>
      </div>
    </div>
  );
}