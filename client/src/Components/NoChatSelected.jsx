import { MessageSquare, Users, Image as ImageIcon, Smile } from "lucide-react";
import '../CSS/NoChatSelected.css';

const NoChatSelected = () => {
  return (
    <div className="no-chat-container">
      <div className="welcome-content">
        {/* Icon Display */}
        <div className="icon-display">
          <div className="message-icon-container">
            <div className="message-icon">
              <MessageSquare />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="welcome-text">
          <h2 className="welcome-title">Welcome to PingMe!</h2>
          <p className="welcome-description">
            Select a conversation from the sidebar to start chatting with your friends and stay connected.
          </p>
        </div>

        {/* Feature List */}
        <div className="feature-list">
          <div className="feature-item">
            <div className="feature-icon">
              <Users />
            </div>
            <span className="feature-text">Connect with friends instantly</span>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">
              <ImageIcon />
            </div>
            <span className="feature-text">Share photos and memories</span>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">
              <Smile />
            </div>
            <span className="feature-text">Express yourself freely</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;