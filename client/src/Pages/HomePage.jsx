import { useChatStore } from "../store/useChatStore";
import Sidebar from "../Components/Sidebar";
import NoChatSelected from "../Components/NoChatSelected";
import ChatContainer from "../Components/ChatContainer";
import '../CSS/HomePage.css'

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="home-page">
      <div className={`home-container ${selectedUser ? 'chat-active' : ''}`}>
        <div className="sidebar-component">
          <Sidebar />
        </div>
        <div className="chat-area">
          {!selectedUser ? (
            <div className="no-chat-wrapper">
              <NoChatSelected />
            </div>
          )  : <ChatContainer />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;