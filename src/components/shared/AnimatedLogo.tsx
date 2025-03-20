
import { Link } from 'react-router-dom';

const AnimatedLogo = () => {
  const text = 'KiddoBank';

  return (
    <Link to="/" className="flex items-center gap-2 group relative">
      <div className="relative">
        <h1 className="text-2xl font-bold relative" style={{ fontFamily: "'Comic Sans MS', cursive", transform: "rotate(-2deg)" }}>
          {text.split('').map((char, index) => (
            <span
              key={index}
              className="inline-block animate-float"
              style={{
                animationDelay: `${index * 0.1}s`,
                textShadow: "2px 2px 0 #FEF7CD, -1px -1px 0 #000",
                color: index % 2 === 0 ? "var(--color-kid-purple)" : "var(--color-kid-teal)"
              }}
            >
              {char}
            </span>
          ))}
        </h1>
      </div>
    </Link>
  );
};

export default AnimatedLogo;
