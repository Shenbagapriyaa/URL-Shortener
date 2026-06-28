import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { QRCodeCanvas } from "qrcode.react";

const QRCodes = () => {
  const [shortId, setShortId] = useState("");
  const [qrValue, setQrValue] = useState("");

  // 🔥 CHANGE ONLY THIS WHEN YOU DEPLOY
 const BASE_URL = "http://localhost:5000";

  const generateQR = () => {
    if (!shortId) {
      alert("Enter short ID");
      return;
    }

    const url = `${BASE_URL}/${shortId}`;
    setQrValue(url);
  };

  const copyLink = async () => {
    if (!qrValue) return;

    await navigator.clipboard.writeText(qrValue);
    alert("Link copied!");
  };

  return (
    <MainLayout>
      <div
        style={{
          padding: "40px",
          background: "#0b1020",
          minHeight: "100vh",
          color: "white",
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>📱 QR Generator</h1>

        <div
          style={{
            background: "#151c34",
            padding: "25px",
            borderRadius: "15px",
            maxWidth: "700px",
          }}
        >
          <h3>Enter Short ID (Example: kato)</h3>

          <input
            type="text"
            placeholder="kato"
            value={shortId}
            onChange={(e) => setShortId(e.target.value)}
            style={{
              padding: "12px",
              width: "100%",
              marginTop: "10px",
              borderRadius: "8px",
              border: "1px solid #334155",
              background: "#0f172a",
              color: "white",
              outline: "none",
            }}
          />

          <button
            onClick={generateQR}
            style={{
              marginTop: "15px",
              background: "#7c3aed",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Generate QR
          </button>

          {qrValue && (
            <div style={{ marginTop: "20px" }}>
              {/* QR BOX */}
              <div
                style={{
                  background: "white",
                  padding: "15px",
                  borderRadius: "10px",
                  width: "200px",
                }}
              >
                <QRCodeCanvas value={qrValue} size={180} />
              </div>

              {/* LINK DISPLAY */}
              <p style={{ marginTop: "10px", color: "#a5b4fc" }}>
                Scan → {qrValue}
              </p>

              {/* ACTION BUTTON */}
              <button
                onClick={copyLink}
                style={{
                  marginTop: "10px",
                  background: "#3b82f6",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Copy Link
              </button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default QRCodes;