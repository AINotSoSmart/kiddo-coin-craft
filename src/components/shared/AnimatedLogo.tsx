import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const AnimatedLogo = () => {
  const text = 'KiddoCoinCraft';

  return (
    <Link to="/" className="flex items-center gap-2 group relative">
      <div className="relative">
        <h1 className="text-2xl font-bold relative">
          {text.split('').map((char, index) => (
            <span
              key={index}
              className="inline-block animate-float"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {char}
            </span>
          ))}
        </h1>
      </div>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-float {
            animation: float 2s ease-in-out infinite;
            background: linear-gradient(to right, #8B5CF6, #2DD4BF);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            display: inline-block;
            text-shadow: none;
            font-weight: 700;
          }
        `}
      </style>
    </Link>
  );
};

export default AnimatedLogo;