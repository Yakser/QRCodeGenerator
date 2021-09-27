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
      await axios.get("/api/generate?text=" + textValue).then(
        (response) => {
          console.log(response)
          if (response.status === 200) {
            const token = response.data.token;
            setQrCodeSrc(
              `https://react-qr-code-api.herokuapp.com/static/qr-code-${token}.png`
            );
          } else {
            // TODO
            throw new Error("Code generation error");
          }
        }
      );
    
    } catch(e) {
      console.log(e)
      alert(`Code generation failed ${e}`);
    }
  }

  return (
    <main className={styles.main}>
      <h2>Generate QR-code</h2>
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
