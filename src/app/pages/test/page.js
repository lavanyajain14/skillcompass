"use client";

import { useState } from "react";

// Skill fields and levels (copied from previous component)
const fields = {
  Technology: ["Web Development", "Data Science", "Cybersecurity"],
  Design: ["Graphic Design", "UI/UX", "3D Modeling"],
  Business: ["Marketing", "Entrepreneurship", "Finance"],
  Arts: ["Painting", "Photography", "Writing"],
};

const levels = ["Beginner", "Intermediate", "Advanced"];

// Skill-specific questions mapping
const skillQuestions = {
  "Web Development": [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Hyperlink and Text Markup Language",
        "Home Tool Markup Language"
      ],
      correctAnswer: "Hyper Text Markup Language"
    },
    // ... (previous questions)
  ],
  // ... (previous skill questions)
};

// Skill Selection Component
function SkillSelection({ onSkillsSelected }) {
  const [selectedField, setSelectedField] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState({});

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) => {
      const newSkills = { ...prev };
      if (newSkills[skill]) delete newSkills[skill];
      else newSkills[skill] = "Beginner";
      return newSkills;
    });
  };

  const updateSkillLevel = (skill, level) => {
    setSelectedSkills((prev) => ({ ...prev, [skill]: level }));
  };

  const handleSubmit = () => {
    if (Object.keys(selectedSkills).length > 0) {
      onSkillsSelected(selectedSkills);
    }
  };

  return (
    <div className="min-h-screen bg-white p-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-5 text-black">Select Your Interests</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.keys(fields).map((field) => (
          <button
            key={field}
            className="p-4 bg-blue-500 text-black rounded-xl shadow-lg hover:bg-blue-600 transition"
            onClick={() => setSelectedField(field)}
          >
            {field}
          </button>
        ))}
      </div>

      {selectedField && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4 text-black">{selectedField}</h2>
            <div className="grid gap-3">
              {fields[selectedField].map((skill) => (
                <div key={skill} className="flex justify-between items-center p-2 border-b">
                  <span className="text-black">{skill}</span>
                  <button
                    className="bg-blue-500 text-black px-3 py-1 rounded hover:bg-blue-600 transition"
                    onClick={() => toggleSkill(skill)}
                  >
                    {selectedSkills[skill] ? "Remove" : "Add"}
                  </button>
                </div>
              ))}
            </div>
            <button
              className="mt-4 bg-red-500 text-black px-4 py-2 rounded hover:bg-red-600 transition w-full"
              onClick={() => setSelectedField(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {Object.keys(selectedSkills).length > 0 && (
        <div className="mt-6 w-full max-w-lg">
          <h2 className="text-xl font-semibold mb-4 text-black">Your Selected Skills</h2>
          <div className="grid gap-3">
            {Object.entries(selectedSkills).map(([skill, level]) => (
              <div key={skill} className="p-3 bg-gray-200 rounded-lg flex justify-between">
                <span className="text-black">{skill}</span>
                <select
                  className="border rounded p-1 text-black"
                  value={level}
                  onChange={(e) => updateSkillLevel(skill, e.target.value)}
                >
                  {levels.map((lvl) => (
                    <option key={lvl} value={lvl} className="text-black">{lvl}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <button
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition w-full"
            onClick={handleSubmit}
          >
            Continue to Test
          </button>
        </div>
      )}
    </div>
  );
}

// Skill Test Preview Component
function SkillTestPreview({ selectedSkills, onStartTest, onBack }) {
  const skillsToTest = Object.keys(selectedSkills);

  if (skillsToTest.length === 0) {
    return (
      <div className="min-h-screen bg-white p-10 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-5 text-black">No Skills Selected</h1>
        <button 
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
          onClick={onBack}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 text-black">Test Preview</h1>
      
      <div className="w-full max-w-lg bg-gray-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-black">Selected Skills</h2>
        
        <div className="space-y-4">
          {skillsToTest.map((skill) => (
            <div 
              key={skill} 
              className="bg-white border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-medium text-black">{skill}</h3>
                <p className="text-gray-600">Level: {selectedSkills[skill]}</p>
              </div>
              <span className="text-blue-500 font-bold">5 Questions</span>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <h3 className="font-semibold text-black mb-2">Test Details</h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>Total Skills: {skillsToTest.length}</li>
            <li>Questions per Skill: 5</li>
            <li>Total Questions: {skillsToTest.length * 5}</li>
          </ul>
        </div>

        <div className="mt-6 flex space-x-4">
          <button 
            className="w-full bg-gray-300 text-black p-3 rounded-lg hover:bg-gray-400 transition"
            onClick={onBack}
          >
            Back to Skills
          </button>
          <button 
            className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition"
            onClick={onStartTest}
          >
            Start Test
          </button>
        </div>
      </div>
    </div>
  );
}

// Skill Test Component
function SkillTest({ selectedSkills, onComplete }) {
  const skillsToTest = Object.keys(selectedSkills);

  const [currentSkill, setCurrentSkill] = useState(skillsToTest[0]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [testCompleted, setTestCompleted] = useState(false);

  const questions = skillQuestions[currentSkill] || [];

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    // Check if answer is correct
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }

    // Move to next question or next skill
    if (currentQuestionIndex < 4) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      // If this is the last skill, complete the test
      const remainingSkills = skillsToTest.filter(skill => skill !== currentSkill);
      
      if (remainingSkills.length > 0) {
        setCurrentSkill(remainingSkills[0]);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
      } else {
        setTestCompleted(true);
      }
    }
  };

  if (testCompleted) {
    return (
      <div className="min-h-screen bg-white p-10 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-5 text-black">Test Completed!</h1>
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <p className="text-xl text-black mb-4">
            Your Total Score: {score} / {skillsToTest.length * 5}
          </p>
          <button 
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
            onClick={() => onComplete(score)}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-5 text-black">Skill Test: {currentSkill}</h1>
      
      <div className="w-full max-w-lg bg-gray-100 p-6 rounded-lg shadow-lg">
        <div className="mb-4 text-black">
          <p className="text-xl font-semibold">
            Question {currentQuestionIndex + 1} of 5
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-medium text-black mb-4">
            {questions[currentQuestionIndex].question}
          </h2>
          
          <div className="grid gap-3">
            {questions[currentQuestionIndex].options.map((option) => (
              <button
                key={option}
                className={`
                  w-full p-3 text-left rounded-lg transition
                  ${selectedAnswer === option 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white text-black border hover:bg-gray-100'}
                `}
                onClick={() => handleAnswerSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <button
          className={`
            w-full p-3 rounded-lg transition
            ${selectedAnswer 
              ? 'bg-green-500 text-white hover:bg-green-600' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
          `}
          onClick={handleNextQuestion}
          disabled={!selectedAnswer}
        >
          {currentQuestionIndex < 4 ? 'Next Question' : 'Finish Test'}
        </button>
      </div>
    </div>
  );
}

// Main Page Component
export default function SkillTestPage() {
  const [currentStep, setCurrentStep] = useState('skills-selection');
  const [selectedSkills, setSelectedSkills] = useState({});

  const handleSkillsSelected = (skills) => {
    setSelectedSkills(skills);
    setCurrentStep('test-preview');
  };

  const handleBackToSkillSelection = () => {
    setCurrentStep('skills-selection');
  };

  const handleStartTest = () => {
    setCurrentStep('test');
  };

  const handleTestCompletion = (score) => {
    console.log('Test completed with score:', score);
    // You can add further logic here, like saving the score or navigating to a results page
    setCurrentStep('skills-selection'); // Reset to initial state
  };

  // Render the appropriate component based on the current step
  switch (currentStep) {
    case 'skills-selection':
      return (
        <SkillSelection 
          onSkillsSelected={handleSkillsSelected} 
        />
      );
    
    case 'test-preview':
      return (
        <SkillTestPreview 
          selectedSkills={selectedSkills}
          onStartTest={handleStartTest}
          onBack={handleBackToSkillSelection}
        />
      );
    
    case 'test':
      return (
        <SkillTest 
          selectedSkills={selectedSkills} 
          onComplete={handleTestCompletion} 
        />
      );
    
    default:
      return null;
  }
}