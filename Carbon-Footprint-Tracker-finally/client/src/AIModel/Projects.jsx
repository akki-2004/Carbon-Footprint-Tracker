import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/project-img1.png";
import projImg2 from "../assets/img/project-img2.png";
import projImg3 from "../assets/img/project-img3.png";
import projImg4 from "../assets/img/project-img4.png";
import projImg5 from "../assets/img/project-img5.png";
import projImg6 from "../assets/img/project-img6.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
// import "../App.css";
export const Projects = () => {

  const projects = [
    {
      title: "What is Sustainability LLM?",
      description: "The Sustainability LLM is a specialized program designed to equip professionals with advanced knowledge of environmental sustainability and how to drive sustainable practices in various industries.",
      imgUrl: projImg1,
    },
    {
      title: "Who can enroll in the program?",
      description: "The program is open to professionals, including those in environmental law, policy, and business, as well as anyone with a passion for sustainability and the environment.",
      imgUrl: projImg2,
    },
    {
      title: "What are the key deliverables of the program?",
      description:  "The main deliverables of the Sustainability LLM include a comprehensive understanding of sustainable development, expertise in regulatory frameworks, and practical skills for implementing sustainability initiatives.",
      imgUrl: projImg3,
    },
    {
      title: "How accurate is a Carbon Footprint Tracker?",
      description: "The accuracy depends on the data you provide, but it offers a good estimate based on standard emissions factors.",
      imgUrl: projImg4,
    },
    {
      title: "How often should I update my Carbon Footprint Tracker?",
      description: "Regular updates, such as monthly or quarterly, will provide the most accurate and useful insights.",
      imgUrl: projImg5,
    },
    {
      title: "Is the Carbon Footprint Tracker free to use?",
      description: "Many trackers are free, though some advanced features may require a subscription.",
      imgUrl: projImg6,
    },
  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>FAQ's</h2>
                <p>"Got questions? We've got answers! Explore our FAQs to learn how the Sustainability LLM can drive your green initiatives forward.".</p>
                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Tab 1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Tab 2</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">Tab 3</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    <Tab.Pane eventKey="first">
                      <Row>
                        {
                          projects.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="section">
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quam, quod neque provident velit, rem explicabo excepturi id illo molestiae blanditiis, eligendi dicta officiis asperiores delectus quasi inventore debitis quo.</p>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quam, quod neque provident velit, rem explicabo excepturi id illo molestiae blanditiis, eligendi dicta officiis asperiores delectus quasi inventore debitis quo.</p>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
  )
}
