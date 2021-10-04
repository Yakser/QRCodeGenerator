import ContentLoader from "react-content-loader";
import styles from "./Main.module.scss";
import { useState } from "react";
import qrCode from "../img/qr-code.svg";
import axios from "axios";
const Generate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [qrCodeSrc, setQrCodeSrc] = useState(qrCode);

  const onTextInput = (event) => {
    setTextValue(event.target.value);
  };

  async function onGenerateCode() {
    try {
      setIsLoading(true);
      setIsLoaded(false);
      await axios
        .get(
          "https://react-qr-code-api.herokuapp.com/api/generate?text=" +
            textValue
        )
        .then((response) => {
          setIsLoading(false);
          if (response.status === 200) {
            const token = response.data.token;
            setQrCodeSrc(
              `https://react-qr-code-api.herokuapp.com/static/qr-code-${token}.png`
            );
            setIsLoaded(true);
          } else {
            setQrCodeSrc(qrCode);
            throw new Error("Code generation error");
          }
        });
    } catch (e) {
      console.log(e);
      alert(`Code generation failed ${e}`);
    }
  }
  return (
    <section className={styles.generateBlock}>
      <div className={styles.preview}>
        {isLoading ? (
          <ContentLoader
            className={styles.loader}
            speed={1}
            width="200"
            height="200"
            viewBox="0 0 200 200"
            backgroundColor="#ede9e9"
            foregroundColor="#f7f2f2"
          >
            <rect x="0" y="0" rx="30" ry="30" width="200" height="200" />
          </ContentLoader>
        ) : (
          <>
            <img src={qrCodeSrc} alt="QR-code" />
            {isLoaded && (
              <div className={styles.btn}>
                <a href={qrCodeSrc} download="qr-code.png">
                  Download
                  <svg
                    id="Слой_1"
                    data-name="Слой 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <title>Download</title>
                    <path d="M232.39,502.22a33.39,33.39,0,0,0,47.22,0h0L405.54,376.29a33.39,33.39,0,0,0-47.22-47.22L289.39,398V33.39a33.39,33.39,0,1,0-66.78,0V398l-68.93-68.93a33.39,33.39,0,0,0-47.22,47.22Z" />
                  </svg>
                </a>
              </div>
            )}
          </>
        )}

        <input
          type="text"
          placeholder="Enter url"
          onChange={onTextInput}
          value={textValue}
        />
        <input type="submit" value="Generate" onClick={onGenerateCode} />
      </div>
    </section>
  );
};
export default Generate;
