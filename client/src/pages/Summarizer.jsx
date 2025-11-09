import { useState } from "react";

export default function Summarizer() {

  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const summarize = async () => {

    if (!text) return;

    setLoading(true);
    setSummary("");

    try {

      const res = await fetch(
        "http://localhost:5000/api/ai/summarize",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },

          body: JSON.stringify({ text }),
        }
      );

      const data = await res.json();

      setSummary(data.summary);

    } catch (error) {

      console.log(error);

      setSummary("Something went wrong");

    } finally {

      setLoading(false);

    }

  };

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "900px",
        margin: "0 auto"
      }}
    >

      <h1
        style={{
          marginBottom: "25px",
          fontSize: "36px",
          fontWeight: "bold"
        }}
      >
        AI Summarizer
      </h1>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text here..."
        rows="10"
        style={{
          width: "100%",
          padding: "15px",
          borderRadius: "12px",
          border: "1px solid #ccc",
          fontSize: "16px",
          marginBottom: "20px",
          resize: "none"
        }}
      />

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "25px"
        }}
      >

        <button
          onClick={summarize}
          disabled={loading}
          style={{
            padding: "12px 20px",
            border: "none",
            borderRadius: "10px",
            background: "#5b5bf0",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? "Summarizing..." : "Summarize"}
        </button>

        <button
          onClick={() => {
            setText("");
            setSummary("");
          }}
          style={{
            padding: "12px 20px",
            border: "none",
            borderRadius: "10px",
            background: "#ddd",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Clear
        </button>

      </div>

      {summary && (
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "16px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
          }}
        >

          <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px"
  }}
>

  <h2
    style={{
      color: "#5b5bf0"
    }}
  >
    AI Summary
  </h2>

  <button
    onClick={() => {
      navigator.clipboard.writeText(summary);
      alert("Summary copied!");
    }}
    style={{
      padding: "8px 14px",
      border: "none",
      borderRadius: "8px",
      background: "#5b5bf0",
      color: "white",
      cursor: "pointer"
    }}
  >
    Copy
  </button>

</div>

          <p
            style={{
              lineHeight: "1.8",
              color: "#333",
              fontSize: "16px"
            }}
          >
            {summary}
          </p>

        </div>
      )}

    </div>
  );
}