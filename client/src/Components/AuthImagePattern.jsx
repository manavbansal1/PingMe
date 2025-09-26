// Adapted from https://github.com/burakorkmez/fullstack-chat-app/blob/master/frontend/src/components/AuthImagePattern.jsx

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="pattern-section">
    <div className="pattern-content">
      <div className="pattern-grid">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="pattern-item" />
        ))}
      </div>
        <h2 className="pattern-title">{title}</h2>
        <p className="pattern-subtitle">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;