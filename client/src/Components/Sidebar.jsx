import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from './Skeletons/SidebarSkeleton';
import { Users, UserX } from "lucide-react";
import '../CSS/Sidebar.css'

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <div className="sidebar">

      {/* Header */}
      <div className="sidebar-header">
        <div className="header-content">
          <Users />
          <h3 className="header-title">Contacts</h3>
        </div>
        
        {/* Online Filter - Hidden on mobile */}
        <div className="online-filter">
          <label className="filter-checkbox">
            <input type="checkbox" checked={showOnlineOnly} onChange={(e) => setShowOnlineOnly(e.target.checked)}/>
            <span className="filter-label">Show online only</span>
          </label>
          <span className="online-count">{onlineUsers.length - 1} online</span>
        </div>
      </div>

      {/* Contacts List */}
      <div className="contacts-list">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`contact-item ${selectedUser?._id === user._id ? 'active' : ''}`}
          >
            <div className="contact-avatar-container">
              <img
                src={user.profilePicture || "/avatar.png"}
                alt={user.fullName}
                className="contact-avatar"
              />
              {onlineUsers.includes(user._id) && (
                <div className="online-indicator"></div>
              )}
            </div>

            <div className="contact-info">
              <div className="contact-name">
                {user.fullName}
              </div>
              <div className={`contact-status ${onlineUsers.includes(user._id) ? 'online' : ''}`}>
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="no-users">
            <UserX className="no-users-icon" />
            <p>No {showOnlineOnly ? 'online ' : ''}users found</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Sidebar;