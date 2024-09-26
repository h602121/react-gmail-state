import { useState } from "react";
import Header from "./components/Header";
import initialEmails from "./data/emails";

import "./styles/App.css";

function App() {
  // Use initialEmails for state
  console.log(initialEmails);
  const [hideRead, setHideRead] = useState(false);
  const [emailState, setEmailState] = useState(initialEmails);
  const [toggled, setToggled] = useState("");
  const [hideStarred, setHideStarred] = useState(false);

  function getReadEmails() {
    let newEmails = initialEmails.filter((x) => x.read !== true);
    return newEmails;
  }
  function getStarredEmails() {
    let newEmails = initialEmails.filter((x) => x.starred !== true);
    return newEmails;
  }
  function showEmails() {
    if (hideRead && hideStarred) {
      return getReadEmails().push(getStarredEmails());
    } else if (hideRead && !hideStarred) {
    }
  }
  function DisplayEmail(filteredEmails = emailState) {
    const listEmails = filteredEmails.map((email) => (
      <li className="email" key={email.id}>
        <div className="select">
          <input
            checked={email.read}
            onChange={() => {
              email.read = !email.read;
              setEmailState([...emailState]);
            }}
            className="select-checkbox"
            type="checkbox"
          />
        </div>
        <div className="star">
          <input
            checked={email.starred}
            onChange={() => {
              email.starred = !email.starred;
              setEmailState([...emailState]);
            }}
            className="star-checkbox"
            type="checkbox"
          />
        </div>
        <div className="sender">{email.sender}</div>
        <div className="title">{email.title}</div>
      </li>
    ));
    return listEmails;
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={"item " + (toggled === "inbox" ? "active" : "")}
            onClick={() => {
              setToggled("inbox");
            }}
          >
            <span className="label">Inbox</span>
            <span className="count"></span>
          </li>
          <li
            className={"item " + (toggled === "starred" ? "active" : "")}
            onClick={() => {
              setToggled("starred");
            }}
          >
            <span className="label">Starred</span>
            <span className="count"></span>
          </li>

          <li
            className={"item " + (toggled === "hideread" ? "active" : "")}
            onClick={() => {
              setToggled("hideread");
            }}
          >
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={() => {
                setHideRead(!hideRead);
              }}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        {DisplayEmail(hideRead ? getReadEmails() : emailState)}
      </main>
    </div>
  );
}

export default App;
