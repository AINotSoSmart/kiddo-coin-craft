
import { useEffect, useState } from 'react';

interface ConfettiProps {
  show: boolean;
  duration?: number;
  particleCount?: number;
}

const Confetti = ({ show, duration = 2000, particleCount = 30 }: ConfettiProps) => {
  const [particles, setParticles] = useState<Array<{ id: number; color: string; x: number; y: number; rotation: number }>>([]);
  
  useEffect(() => {
    if (show) {
      const colors = [
        '#FBBF24', // Yellow
        '#EC4899', // Pink
        '#8B5CF6', // Purple
        '#14B8A6', // Teal
        '#3B82F6', // Blue
        '#F97316', // Orange
        '#10B981', // Green
      ];
      
      const newParticles = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        x: Math.random() * 100,
        y: Math.random() * 30 + 30, // Start from middle/top of screen
        rotation: Math.random() * 360
      }));
      
      setParticles(newParticles);
      
      const timer = setTimeout(() => {
        setParticles([]);
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [show, particleCount, duration]);
  
  if (!show && particles.length === 0) return null;
  
  return (
    <div className="confetti-container">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="confetti animate-confetti"
          style={{
            backgroundColor: particle.color,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            transform: `rotate(${particle.rotation}deg)`,
            animationDelay: `${Math.random() * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
