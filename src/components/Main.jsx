import styles from "./Main.module.scss";
import qrCode from "../img/qr-code.svg";
import React from "react";
import axios from "axios";
import { Switch, Route } from "react-router-dom";

import ContentLoader from "react-content-loader"


const Main = (props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [textValue, setTextValue] = React.useState("");
  const [qrCodeSrc, setQrCodeSrc] = React.useState(qrCode);

  const onTextInput = (event) => {
    setTextValue(event.target.value);
  };

  async function onGenerateCode() {
    try {
      setIsLoading(true)
      await axios
        .get("https://react-qr-code-api.herokuapp.com/api/generate?text=" + textValue)
        .then((response) => {
          setIsLoading(false)
          if (response.status === 200) {
            const token = response.data.token;
            setQrCodeSrc(
              `https://react-qr-code-api.herokuapp.com/static/qr-code-${token}.png`
            );
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
    <main className={styles.main}>
      <Switch>
        <Route path="/" exact>
          <h2>Generate QR-code</h2>
          <section className={styles.generateBlock}>
            <div className={styles.preview}>
              {isLoading ? (
                <ContentLoader
                  speed={2}
                  width={300}
                  height={300}
                  viewBox="0 0 400 400"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                >
                  <rect x="50" y="0" rx="30" ry="30" width="300" height="300" />
                </ContentLoader>
              ) : (
                <img src={qrCodeSrc} alt="" />
              )}

              <input
                type="text"
                placeholder="Enter url"
                onChange={onTextInput}
              />
              <input type="submit" value="Generate" onClick={onGenerateCode} />
            </div>
          </section>
        </Route>
        <Route path="/usage" exact>
          <h2>Usage of QR-codes</h2>
          <section className={styles.usage}>
            <article>
              <h3>
                What is{" "}
                <a
                  href="https://en.wikipedia.org/wiki/QR_code"
                  target="_blank"
                  rel="noreferrer"
                >
                  QR-code
                </a>
                ?
              </h3>
              <p>
                A QR code (abbreviated from Quick Response code) is a type of
                matrix barcode (or two-dimensional barcode)
              </p>
              <p>
                Using a QR code, you can encode any information, for example:
                text, a phone number, a link to a website or a business card.
              </p>
            </article>
            <article>
              <h3>How to use?</h3>
              <ul>
                <li>Take a smartphone with a camera</li>
                <li>Run the program to scan the code</li>
                <li>Point the camera lens at the code</li>
                <li>Get information!</li>
              </ul>
            </article>
            <article>
              <h3>Where it's used?</h3>
              <p>
                QR codes can be used for posting their images on the Internet,
                drawing on business cards, T-shirts, advertising signs and much
                more.
              </p>
            </article>
          </section>
        </Route>
        <Route path="/about" exact>
          <h2>About</h2>
        </Route>
      </Switch>
    </main>
  );
};

export default Main;
