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

          📄 Summarize
        </li>
        <li>
          <Link to="/history">📜 History</Link>
        </li>

        <li
          className={activeTab === "notes" ? "active" : ""}
          onClick={() => setActiveTab("notes")}
        >
          📝 Notes
        </li>

        <li
          className={activeTab === "tasks" ? "active" : ""}
          onClick={() => setActiveTab("tasks")}
        >
          ✅ Tasks
        </li>

        <li
          className={activeTab === "analytics" ? "active" : ""}
          onClick={() => setActiveTab("analytics")}
        >
          📊 Analytics
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