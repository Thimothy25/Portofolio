import { useState, useEffect } from "react";
import { Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCards";
import "animate.css";
import TrackVisibility from "react-on-screen";
import { db } from "../ConfigFirebase";
import { ref, onValue } from "firebase/database";

export const Projects = () => {
  const [biography, setBiography] = useState({});
  const [projectsDescription, setProjectsDescription] = useState("");
  const [educationDescription, setEducationDescription] = useState("");
  const [Projects, setProjects] = useState({});

  useEffect(() => {
    const biographyRef = ref(db, "Biography");
    const projectsRef = ref(db, "Projects");
    const educationRef = ref(db, "Education");

    onValue(biographyRef, (snapshot) => {
      const data = snapshot.val();
      setBiography(data || {});
    });

    onValue(projectsRef, (snapshot) => {
      const data = snapshot.val();
      setProjects(data || {});
      setProjectsDescription(data?.description || "");
    });

    onValue(educationRef, (snapshot) => {
      const data = snapshot.val();
      setEducationDescription(data?.description || "");
    });
  }, []);

  const projectImages = [
    {
      title: "Mobile Application",
      description: "ModurKeebs",
      imgUrl: `data:image/jpeg;base64,${Projects.image2 || ""}`,
    },
    {
      title: "Web Design",
      description: "Portofolio Web",
      imgUrl: `data:image/jpeg;base64,${Projects.image3 || ""}`,
    },
    {
      title: "Robotic",
      description: "Line Follower robot",
      imgUrl: `data:image/jpeg;base64,${Projects.image1 || ""}`,
    },
  ];

  const educationBackground = [
    {
      level: "Elementary School",
      school: "SD YPPK Bampel Merauke",
      years: "2011 - 2017",
      description:
        "Learned foundational knowledge in various subjects and developed a love for learning.",
      imgUrl: `data:image/png;base64,${biography.educationImage || ""}`,
    },
    {
      level: "Junior High School",
      school: "SMP Negeri 1 Merauke",
      years: "2017 - 2019",
      description:
        "Enhanced skills in mathematics, science, and the arts, while actively participating in school clubs.",
      imgUrl: `data:image/png;base64,${biography.educationImage || ""}`,
    },
    {
      level: "Senior High School",
      school: "SMA Negeri 3 Merauke",
      years: "2019 - 2022",
      description:
        "Focused on science and technology, leading to an interest in computer science.",
      imgUrl: `data:image/png;base64,${biography.educationImage || ""}`,
    },
    {
      level: "University",
      school: "Universitas Klabat",
      years: "2022 - Present",
      description:
        "Currently pursuing a Bachelor’s degree in Computer Science, specializing in Informatics.",
      imgUrl: `data:image/png;base64,${biography.educationImage || ""}`,
    },
  ];

  const lifeImages = [
    {
      imgUrl: `data:image/jpeg;base64,${biography.image1 || ""}`,
    },
    {
      imgUrl: `data:image/jpeg;base64,${biography.image2 || ""}`,
    },
    {
      imgUrl: `data:image/jpeg;base64,${biography.image3 || ""}`,
    },
  ];

  return (
    <section className="project" id="projects">
      <Row>
        <Col size={12}>
          <TrackVisibility>
            {({ isVisible }) => (
              <div
                className={isVisible ? "animate__animated animate__fadeIn" : ""}
              >
                <h2>My Biography</h2>
                <p>{biography.description || ""}</p>

                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  <Nav
                    variant="pills"
                    className="nav-pills mb-5 justify-content-center align-items-center"
                    id="pills-tab"
                  >
                    <Nav.Item>
                      <Nav.Link eventKey="first">My Project</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">My Education</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">My Life</Nav.Link>
                    </Nav.Item>
                  </Nav>

                  <Tab.Content
                    id="slideInUp"
                    className={
                      isVisible ? "animate__animated animate__slideInUp" : ""
                    }
                  >
                    <Tab.Pane eventKey="first">
                      <Row>
                        <h3>{projectsDescription}</h3>
                        {projectImages.map((project, index) => (
                          <ProjectCard key={index} {...project} />
                        ))}
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <Row>
                        <h3>{educationDescription}</h3>
                        {educationBackground.map((edu, index) => (
                          <Col md={6} lg={3} className="mb-4" key={index}>
                            <div className="edu-card text-center">
                              <img
                                src={edu.imgUrl}
                                alt={`${edu.level} Image`}
                                className="edu-image mb-3"
                              />
                              <h5>{edu.level}</h5>
                              <h6>{edu.school}</h6>
                              <p className="text-muted">{edu.years}</p>
                              <p>{edu.description}</p>
                            </div>
                          </Col>
                        ))}
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <Row>
                        <h3>Memories of My Life</h3>
                        {lifeImages.map((life, index) => (
                          <Col md={4} key={index} className="mb-4">
                            <div className="life-card text-center">
                              <img
                                src={life.imgUrl}
                                alt={`Life Image ${index + 1}`}
                                className="life-image mb-3"
                              />
                            </div>
                          </Col>
                        ))}
                      </Row>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>
            )}
          </TrackVisibility>
        </Col>
      </Row>
      <img
        className="background-image-right"
        src="path-to-colorSharp2.png"
        alt="background"
      />
    </section>
  );
};
