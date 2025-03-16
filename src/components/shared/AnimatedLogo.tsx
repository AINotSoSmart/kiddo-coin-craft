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
            background: linear-gradient(to right, var(--kid-purple), var(--kid-teal));
            -webkit-background-clip: text;
            color: transparent;
            display: inline-block;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          }
        `}
      </style>
    </Link>
  );
};

export default AnimatedLogo;