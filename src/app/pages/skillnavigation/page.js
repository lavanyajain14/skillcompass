'use client';

import { useState } from 'react';
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

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto max-w-6xl">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Professional Skills Navigator</h1>
          <p className="text-xl text-gray-600">Curated Learning Paths for Modern Professionals</p>
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
  );
}