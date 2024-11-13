import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "animate.css";
import TrackVisibility from "react-on-screen";
import { db } from "../ConfigFirebase";
import { ref, onValue } from "firebase/database";
import { getDatabase } from "firebase/database";

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const [toRotate, setToRotate] = useState([]);
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [description, setDescription] = useState("");
  const period = 2000;
  const [Banner, setBanner] = useState({});

  useEffect(() => {
    const db = getDatabase();
    const BannerRef = ref(db, "Banner");
    onValue(BannerRef, (snapshot) => {
      const data = snapshot.val();
      setBanner(data);
    });
  }, []);

  useEffect(() => {
    const bannerRef = ref(db, "Banner");

    onValue(bannerRef, (snapshot) => {
      const data = snapshot.val();
      setToRotate(data.toRotate || []);
      setWelcomeMessage(data.welcomeMessage || "Welcome to my Portfolio");
      setDescription(data.description || "");
    });
  }, []);

  useEffect(() => {
    const ticker = setInterval(() => {
      tick();
    }, delta);

    return () => clearInterval(ticker);
  }, [text, delta]);

  const tick = () => {
    const i = loopNum % toRotate.length;
    const fullText = toRotate[i] || "";
    const updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
    }
  };

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <span className="tagline">{welcomeMessage}</span>
                  <h1>
                    {`Hi! I'm Thimothy`}{" "}
                    <span
                      className="txt-rotate"
                      dataPeriod="1000"
                      data-rotate={JSON.stringify(toRotate)}
                    >
                      <span className="wrap">{text}</span>
                    </span>
                  </h1>
                  <p>{description}</p>
                </div>
              )}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__zoomIn" : ""
                  }
                >
                  {Banner.image ? (
                    <img
                      className="has-shadow"
                      src={`data:image/svg+xml;base64,${Banner.image}`}
                      alt="Banner Image"
                    />
                  ) : (
                    <p>Loading image...</p>
                  )}
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
