import { useState } from "react";
import API from "../services/api";

const Home = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = async () => {
    try {
      const res = await API.post("/url/short", {
        originalUrl: url,
      });

      setShortUrl(res.data.shortUrl);
    } catch (err) {
      alert("Error shortening URL");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Copied!");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>ShortIQ 🔗 URL Shortener</h1>

      <input
        type="text"
        placeholder="Paste your long URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "350px", padding: "10px" }}
      />

      <br /><br />

      <button onClick={handleShorten}>
        Shorten URL
      </button>

      <br /><br />

      {shortUrl && (
        <div>
          <h3>Short URL:</h3>

          <a href={shortUrl} target="_blank" rel="noreferrer">
            {shortUrl}
          </a>

          <br /><br />

          <button onClick={copyToClipboard}>
            Copy
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;