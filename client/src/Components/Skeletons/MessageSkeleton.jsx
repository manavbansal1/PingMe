import '../../CSS/Skeletons.css';

const MessageSkeleton = () => {
  // Create an array of 6 items for skeleton messages
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="message-skeleton-container">
      {skeletonMessages.map((_, idx) => (
        <div key={idx} className={`skeleton-message ${idx % 2 === 0 ? 'left' : 'right'}`}>
          <div className="skeleton skeleton-message-avatar"></div>

          <div className="skeleton-message-content">
            <div className="skeleton skeleton-message-time"></div>
            <div className="skeleton skeleton-message-bubble"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;