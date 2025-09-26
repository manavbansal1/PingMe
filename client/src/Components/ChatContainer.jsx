import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput.jsx";
import MessageSkeleton from "./Skeletons/MessageSkeleton.jsx";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import { MessageCircle } from "lucide-react";
import '../CSS/ChatContainer.css';

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
    }

    return () => unsubscribeFromMessages();
  }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="chat-container">
        <ChatHeader />
        <div className="loading-messages">
          <div className="loading-spinner"></div>
          Loading messages...
        </div>
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="chat-container">
      <ChatHeader />

      <div className="messages-area">
        {messages && messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message._id}
              className={`message ${message.senderId === authUser._id ? 'sent' : 'received'}`}
            >
              <div className="message-avatar">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePicture || "/avatar.png" 
                      : selectedUser.profilePicture || "/avatar.png"
                  }
                  alt="profile"
                  className="avatar-img"
                />
              </div>
              
              <div className="message-content">
                <div className="message-time">
                  {formatMessageTime(message.createdAt)}
                </div>
                
                <div className={`message-bubble ${message.senderId === authUser._id ? 'sent' : 'received'}`}>
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="message-image"
                    />
                  )}
                  {message.text && (
                    <p className="message-text">{message.text}</p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-messages">
            <MessageCircle className="no-messages-icon" />
            <h3>No messages yet</h3>
            <p>Start a conversation with {selectedUser?.fullName}</p>
          </div>
        )}
        <div ref={messageEndRef} />
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;