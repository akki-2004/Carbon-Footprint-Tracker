import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/header-img.svg";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { useNavigate } from 'react-router-dom'; // ✅ ADD THIS

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = ["Carbon Footprint Tracking", "Sustainable AI", "Real-Time Insights"];
  const period = 2000;

  const navigate = useNavigate(); // ✅ ADD THIS

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  const handleGetStarted = () => {
    navigate('/chat'); // ✅ Redirect to /chat
  };

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <span className="tagline">Empowering Sustainable Innovation</span>
                <h1>{`"Hey, I'm LasOLas, your sustainability bot bro!"`} <span className="txt-rotate" data-period="1000" data-rotate='[ "Carbon Footprint Tracking", "Sustainable AI", "Real-Time Insights" ]'><span className="wrap">{text}</span></span></h1>
                <p>Story time — Millions of years later, a lost group of time travelers finally return to Earth. To their surprise, it’s still green and livable. People are healthier, using less carbon, and living cleaner lives. Thanks to ZeroCarbonX CFT and LasOlas. Curious to learn how Earth pulled it off? Meet LasOlas, our smart LLM bot bro, ready to explain it all..</p>
                <button onClick={handleGetStarted}>
                  Get Started <ArrowRightCircle size={25} color="white" />
                </button>
              </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src={headerImg} alt="Header Img"/>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
