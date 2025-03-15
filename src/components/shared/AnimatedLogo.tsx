import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const AnimatedLogo = () => {
  const text = 'KiddoBank';
  const colors = [
    ['#FF6B6B', '#FF8E53'], // Red to Orange
    ['#4ECDC4', '#45B7AF'], // Teal shades
    ['#FFD93D', '#FFC107'], // Yellow shades
    ['#6C63FF', '#5A54D4'], // Purple shades
    ['#43A047', '#2E7D32'], // Green shades
    ['#FF4081', '#F50057'], // Pink shades
    ['#651FFF', '#4527A0'], // Deep Purple
    ['#00BCD4', '#0097A7'], // Cyan shades
    ['#FF9800', '#F57C00'], // Orange shades
    ['#9C27B0', '#7B1FA2'], // Purple shades

  ];

  return (
    <Link to="/" className="flex items-center gap-2 group relative">
      <div className="relative">
        <h1 className="text-2xl font-bold relative">
          {text.split('').map((char, index) => (
            <span
              key={index}
              className="inline-block animate-bounce-custom"
              style={{
                animationDelay: `${index * 0.1}s`,
                background: `linear-gradient(45deg, ${colors[index % colors.length][0]}, ${colors[index % colors.length][1]})`,
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                display: 'inline-block',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
              }}
            >
              {char}
            </span>
          ))}
        </h1>
      </div>
      <style>
        {`
          @keyframes bounce-custom {
            0%, 100% { transform: translateY(0); }
            25% { transform: translateY(-15px); }
            50% { transform: translateY(-5px); }
            75% { transform: translateY(-10px); }
          }
          .animate-bounce-custom {
            animation: bounce-custom 2s ease-in-out infinite;
            display: inline-block;
          }
        `}
      </style>
    </Link>
  );
};

export default AnimatedLogo;