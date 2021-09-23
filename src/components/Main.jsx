import styles from "./Main.module.scss";
import qrCode from "../img/qr-code.svg";
import React from "react";
import axios from "axios";
const Main = (props) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [textValue, setTextValue] = React.useState("");
  const [qrCodeSrc, setQrCodeSrc] = React.useState(qrCode);

  const onTextInput = (event) => {
    setTextValue(event.target.value);
  };

  async function onGenerateCode() {
    try {
      const obj = await axios.get("/api/generate?text=" + textValue);
      if (obj.data.message === "ok") {
        const token = obj.data.token;
        setQrCodeSrc(`http://127.0.0.1:5000/static/qr-code-${token}.png`);
      } else {
        // TODO
        throw "Code generation error";
      }
    } catch {
      alert("Code generation failed");
    }
  }

  return (
    <main className={styles.main}>
      <h2>Generate your own QR-code</h2>
      <div className={styles.inputBlock}>
        <div className={styles.preview}>
          <img src={qrCodeSrc} alt="" />
          <input type="text" placeholder="Enter url" onChange={onTextInput} />
          <input type="submit" value="Generate" onClick={onGenerateCode} />
        </div>
      </div>
    </main>
  );
};

export default Main;
