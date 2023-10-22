import { useState, useRef, useEffect } from "react";
import "./App.css";
import gptLogo from "./assets/chatgpt.svg";
import addBtn from "./assets/add-30.png";
import msgIcon from "./assets/message.svg";
import home from "./assets/home.svg";
import saved from "./assets/bookmark.svg";
import rocket from "./assets/rocket.svg";
import sendBtn from "./assets/send.svg";
import userIcon from "./assets/user-icon.png";
import gptImageLogo from "./assets/chatgptLogo.svg";
import { sendMsgToOpenAi } from "./api/openai";

function App() {
  const msgEnd = useRef(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hi I am ChatBot, a state-of-the-art language model. You can ask me questions, have conversations, seek nformation and even request assistance with various tasks. Just let me know how I can help you.",
      isBot: true,
    },
  ]);

  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages]);

  const inputChange = (e) => {
    const inputText = e.target.value;
    setInput(inputText);
  };

  const handleSend = async () => {
    if (!input) return;
    const text = input;
    setInput("");
    setMessages((prevMessages) => [...prevMessages, { text, isBot: false }]);
    const res = await sendMsgToOpenAi(text);
    setMessages((prevMessages) => [
      ...prevMessages,
      { text, isBot: false },
      { text: res, isBot: true },
    ]);
  };

  const handleEnter = async (e) => {
    if (e.key === "Enter") await handleSend();
  };

  const handleQuery = async (e) => {
    const text = e.target.value;
    setMessages((prevMessages) => [...prevMessages, { text, isBot: false }]);
    const res = await sendMsgToOpenAi(text);
    setMessages((prevMessages) => [
      ...prevMessages,
      { text, isBot: false },
      { text: res, isBot: true },
    ]);
  };

  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={gptLogo} alt="logo" className="logo" />
            <span className="brand">Chatbot</span>
          </div>
          <button
            className="midBtn"
            onClick={() => {
              window.location.reload();
            }}
          >
            <img src={addBtn} alt="new chat" className="addBtn" />
            New Chat
          </button>
          <div className="upperSideBottom">
            <button
              className="query"
              value={"What is programming?"}
              onClick={handleQuery}
            >
              <img src={msgIcon} alt="Query" />
              What is programming?
            </button>
            <button
              className="query"
              value={"How to use an API?"}
              onClick={handleQuery}
            >
              <img src={msgIcon} alt="Query" />
              How to use an API?
            </button>
          </div>
        </div>
        <div className="lowerSide">
          <div className="listItems">
            <img src={home} alt="home" className="listItemsImg" />
            Home
          </div>
          <div className="listItems">
            <img src={saved} alt="saved" className="listItemsImg" />
            Saved
          </div>
          <div className="listItems">
            <img src={rocket} alt="rocket" className="listItemsImg" />
            Upgrade to Pro
          </div>
        </div>
      </div>
      <div className="main">
        <div className="chats">
          {messages.map((message, i) => (
            <div key={i} className={message.isBot ? "chat bot" : "chat"}>
              <img
                className="chatImg"
                src={message.isBot ? gptImageLogo : userIcon}
                alt=""
              />
              <p className="txt">{message.text}</p>
            </div>
          ))}
          <div ref={msgEnd} />
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input
              type="text"
              placeholder="Write a prompt"
              value={input}
              onChange={inputChange}
              onKeyDown={handleEnter}
            />
            <button className="send" onClick={handleSend}>
              <img src={sendBtn} alt="Send" />
            </button>
          </div>
          <p>
            ChatBot may produce inaccurate information about people, place or
            facts.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
