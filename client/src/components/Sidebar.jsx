import { Link } from "react-router-dom";

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <div className="sidebar">
      <h2>🧠 AI Suite</h2>

      <ul>
        <li
          className={activeTab === "summarizer" ? "active" : ""}
          onClick={() => setActiveTab("summarizer")}
        >
          <Link to="/">📄 Summarize</Link>
        </li>

        <li
          className={activeTab === "history" ? "active" : ""}
          onClick={() => setActiveTab("history")}
        >
          <Link to="/history">📜 History</Link>
        </li>

        <li
          className={activeTab === "notes" ? "active" : ""}
          onClick={() => setActiveTab("notes")}
        >
          <Link to="/notes">📝 Notes</Link>
        </li>

        <li
          className={activeTab === "tasks" ? "active" : ""}
          onClick={() => setActiveTab("tasks")}
        >
          <Link to="/tasks">✅ Tasks</Link>
        </li>

        <li
          className={activeTab === "analytics" ? "active" : ""}
          onClick={() => setActiveTab("analytics")}
        >
          <Link to="/analytics">📊 Analytics</Link>
        </li>
      </ul> 

      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          window.location.href = "/login";
        }}
      >
        Logout
      </button>
    </div>
  );
}