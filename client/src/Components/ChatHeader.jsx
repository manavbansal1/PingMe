import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import '../CSS/ChatHeader.css'

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="chat-header">
      <div className="header-content">
        <div className="user-info">
          <div className="user-avatar-container">
            <img 
              src={selectedUser.profilePicture || "/avatar.png"} 
              alt={selectedUser.fullName}
              className="user-avatar"
            />
          </div>
          
          <div className="user-details">
            <h3>{selectedUser.fullName}</h3>
            <p className={`user-status ${onlineUsers.includes(selectedUser._id) ? 'status-online' : 'status-offline'}`}>
              <span className={`status-indicator ${onlineUsers.includes(selectedUser._id) ? 'online' : 'offline'}`}></span>
              {onlineUsers.includes(selectedUser._id) ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
        <button 
          onClick={() => setSelectedUser(null)}
          className="close-button"
          aria-label="Close chat"
        >
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;