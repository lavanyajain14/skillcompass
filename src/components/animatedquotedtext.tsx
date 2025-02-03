'use client';

import React from 'react';
import { useState, useEffect } from 'react';

const quotes = [
  "Your career, your future—let's build it together!",
  "Unlock your potential, one career step at a time.",
  "Guiding you from dreams to achievements.",
  "Success starts with the right direction.",
  "Helping you turn passion into profession.",
  "Navigate your career with confidence.",
  "Your roadmap to a fulfilling career begins here.",
  "The right advice can change your future.",
  "Maximize your skills. Master your future.",
  "Career success is a journey—we help you take the first step.",
];

interface Position {
  x: number;
  y: number;
}

interface AnimatedQuoteProps {
  quote: string;
}

const AnimatedQuote: React.FC<AnimatedQuoteProps> = ({ quote }) => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  useEffect(() => {
    const x = Math.random() * 80 + 10; // 10% to 90% of the screen width
    const y = Math.random() * 80 + 10; // 10% to 90% of the screen height
    setPosition({ x, y });
  }, []);

  const style = {
    left: `${position.x}%`,
    top: `${position.y}%`,
    animationDelay: `${Math.random() * -10}s`,
  };

  return (
    <div
      className="absolute text-purple-700 text-xl font-semibold whitespace-nowrap animate-float animate-fadeInOut opacity-0"
      style={style}
    >
      {quote}
    </div>
  );
};

export function AnimatedQuotesBackground() {
  const [visibleQuotes, setVisibleQuotes] = useState<string[]>([]);

  useEffect(() => {
    // Start with 3 random quotes
    const initialQuotes = quotes
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    setVisibleQuotes(initialQuotes);

    const interval = setInterval(() => {
      setVisibleQuotes((prevQuotes) => {
        const availableQuotes = quotes.filter(
          (quote) => !prevQuotes.includes(quote)
        );
        const newQuote =
          availableQuotes[Math.floor(Math.random() * availableQuotes.length)] ||
          quotes[Math.floor(Math.random() * quotes.length)];
        return [...prevQuotes.slice(1), newQuote];
      });
    }, 5000); // Change a quote every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {visibleQuotes.map((quote, index) => (
        <AnimatedQuote key={`${quote}-${index}`} quote={quote} />
      ))}
    </div>
  );
}