import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import colorSharp from "../assets/img/color-sharp.png";
import { db } from "../ConfigFirebase";
import { ref, onValue } from "firebase/database";
import { getDatabase } from "firebase/database";

export const Skills = () => {
  const [skillsData, setSkillsData] = useState({
    description: "",
    images: ["", "", ""],
  });

  useEffect(() => {
    const db = getDatabase();
    const skillsRef = ref(db, "Skills");

    onValue(skillsRef, (snapshot) => {
      const data = snapshot.val();
      setSkillsData({
        description: data.description || "",
        images: [data.image1 || "", data.image2 || "", data.image3 || ""],
      });
    });
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const skillsList = [
    {
      image: `data:image/svg+xml;base64,${skillsData.images[0]}`,
      title: "JavaScript",
    },
    {
      image: `data:image/svg+xml;base64,${skillsData.images[1]}`,
      title: "Arduino",
    },
    {
      image: `data:image/svg+xml;base64,${skillsData.images[2]}`,
      title: "C++",
    },
    { image: `data:image/svg+xml;base64,${skillsData.images[1]}`, title: "C#" },
    {
      image: `data:image/svg+xml;base64,${skillsData.images[0]}`,
      title: "React",
    },
  ];

  return (
    <section className="skill" id="skills">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="skill-bx wow zoomIn">
              <h2>Skills</h2>
              <p>{skillsData.description}</p>

              <Carousel
                responsive={responsive}
                infinite={true}
                className="owl-carousel owl-theme skill-slider"
              >
                {skillsList.map((skill, index) => (
                  <div className="item" key={index}>
                    <img src={skill.image} alt="Skill Image" />
                    <h5>{skill.title}</h5>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
      <img
        className="background-image-left"
        src={colorSharp}
        alt="Background"
      />
    </section>
  );
};
