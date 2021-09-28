import styles from "./Main.module.scss";
const Usage = (props) => {
  return (
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
          A QR code (abbreviated from Quick Response code) is a type of matrix
          barcode (or two-dimensional barcode)
        </p>
        <p>
          Using a QR code, you can encode any information, for example: text, a
          phone number, a link to a website or a business card.
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
          QR codes can be used for posting their images on the Internet, drawing
          on business cards, T-shirts, advertising signs and much more.
        </p>
      </article>
    </section>
  );
};
export default Usage;
