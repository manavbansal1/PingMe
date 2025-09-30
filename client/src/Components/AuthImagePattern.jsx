// Adapted from https://github.com/burakorkmez/fullstack-chat-app/blob/master/frontend/src/components/AuthImagePattern.jsx

import { MessageCircle, MessageSquare, Users, Zap, Heart, Send } from 'lucide-react';

const AuthImagePattern = ({ title, subtitle }) => {
  const floatingIcons = [
    { Icon: MessageCircle, delay: 0 },
    { Icon: Users, delay: 0.5 },
    { Icon: Zap, delay: 1 },
    { Icon: Heart, delay: 1.5 },
    { Icon: Send, delay: 2 },
  ];

  return (
    <div className="pattern-section">
      {/* Animated Background Circles */}
      <div className="pattern-bg-circle pattern-bg-circle-1" />
      <div className="pattern-bg-circle pattern-bg-circle-2" />

      {/* Main Content */}
      <div className="pattern-content">
        {/* Floating Chat Bubbles Pattern */}
        <div className="pattern-animation-container">
          {/* Central Logo/Icon */}
          <div className="pattern-center-icon">
            <MessageSquare size={50} strokeWidth={2.5} />
          </div>

          {/* Floating Icons Around Center */}
          {floatingIcons.map(({ Icon, delay }, index) => {
            const angle = (index * 72) * (Math.PI / 180);
            const radius = 120;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <div
                key={index}
                className="pattern-floating-icon"
                style={{
                  '--x': `${x}px`,
                  '--y': `${y}px`,
                  animationDelay: `${delay}s`
                }}
              >
                <Icon size={28} />
              </div>
            );
          })}

          {/* Connecting Lines Effect */}
          <svg className="pattern-lines">
            {floatingIcons.map((_, index) => {
              const angle = (index * 72) * (Math.PI / 180);
              const radius = 120;
              const x = 50 + (Math.cos(angle) * radius / 3);
              const y = 50 + (Math.sin(angle) * radius / 2.8);

              return (
                <line
                  key={index}
                  x1="50%"
                  y1="50%"
                  x2={`${x}%`}
                  y2={`${y}%`}
                  className="pattern-line"
                  style={{ animationDelay: `${index * 0.5}s` }}
                />
              );
            })}
          </svg>
        </div>

        {/* Text Content */}
        <div className="pattern-text-content">
          <h2 className="pattern-title">{title}</h2>
          <p className="pattern-subtitle">{subtitle}</p>
        </div>

        {/* Animated Ping Dots */}
        <div className="pattern-dots">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="pattern-dot"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthImagePattern;