import React, { Fragment } from 'react';

  import { Skill } from '@/types';
  
  interface SkillCardProps {
    skill: Skill;
    onClick: () => void;
  }
  
  export default function SkillCard({ skill, onClick }: SkillCardProps) {
    return (
      <div
        onClick={onClick}
        className="bg-white rounded-xl p-6 text-center cursor-pointer transform transition-all duration-300 hover:-translate-y-4 hover:shadow-2xl relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 opacity-0 group-hover:opacity-[0.03] transition-opacity" />
        <span className="text-6xl block mb-4">{skill.icon}</span>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{skill.title}</h2>
        <p className="text-gray-600">{skill.description}</p>
      </div>
    );
  }