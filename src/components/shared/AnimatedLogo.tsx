import { Link } from 'react-router-dom';

const AnimatedLogo = () => {
  const text = 'KiddoBank';

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
    </Link>
  );
};

export default AnimatedLogo;