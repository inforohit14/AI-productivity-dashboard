import { useEffect, useState } from "react";
import axios from "axios";

function History() {

  const [history, setHistory] = useState([]);

  useEffect(() => {

    const fetchHistory = async () => {

      try {

        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5000/api/ai/history",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setHistory(response.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchHistory();

  }, []);

  return (
  <div style={{ padding: "30px" }}>
    
    <h1
      style={{
        marginBottom: "30px",
        fontSize: "36px",
        fontWeight: "bold"
      }}
    >
      Summary History
    </h1>

    {history.length === 0 ? (

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "12px"
        }}
      >
        No summaries found.
      </div>

    ) : (

      history.map((item, index) => (

        <div
          key={index}
          style={{
            background: "#fff",
            padding: "25px",
            marginBottom: "25px",
            borderRadius: "16px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
          }}
        >

          <div style={{ marginBottom: "20px" }}>
            <h3 style={{ color: "#4F46E5" }}>
              Original Text
            </h3>

            <p
              style={{
                lineHeight: "1.7",
                color: "#333"
              }}
            >
              {item.originalText}
            </p>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <h3 style={{ color: "#16A34A" }}>
              AI Summary
            </h3>

            <p
              style={{
                lineHeight: "1.7",
                color: "#333",
                fontWeight: "500"
              }}
            >
              {item.summary}
            </p>
          </div>

          <small style={{ color: "gray" }}>
            {new Date(item.createdAt).toLocaleString()}
          </small>

        </div>

      ))

    )}

  </div>
);
}
export default History;