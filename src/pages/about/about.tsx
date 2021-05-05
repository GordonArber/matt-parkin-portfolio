import { useEffect, useState } from "react";
import { db } from "../../data/firebase";
import "./styles/about.css";

import Loader from "react-loader-spinner";
import { useUser } from "../../store/userStore";
import { EditAboutButton } from "./EditAboutButton";

export const About = () => {
  const { user } = useUser();

  const [aboutMePic, aboutMePicSet] = useState("");
  const [aboutMeDescription, aboutMeDescriptionSet] = useState("");
  const [aboutMeLoad, aboutMeLoadSet] = useState(true);

  useEffect(() => {
    const unsubscribe = db
      .collection("userData")
      .doc("vREP4xBazXgx9C3iOopEHi9yA8t2")
      .onSnapshot((doc) => {
        aboutMePicSet(doc.data()?.aboutMePic);
        aboutMeDescriptionSet(doc.data()?.aboutMeDescription);
        aboutMeLoadSet(false);
      });

    return unsubscribe;
  }, []);

  return (
    <div className="about">
      <div className="about__container">
        <hr />
        {user && <EditAboutButton />}
        <div className="about__detailsContainer">
          <h1 className="about__heading">About</h1>

          {aboutMeLoad && (
            <div className="routes__loader">
              <Loader
                type="TailSpin"
                color="#6396ab"
                height={80}
                width={80}
                timeout={3000}
              />
            </div>
          )}

          {!aboutMeLoad && aboutMePic && aboutMeDescription && (
            <div className="about__details">
              <img
                className="about__aboutMePic"
                width="270em"
                height="270em"
                alt="Matt Parkin"
                src={aboutMePic}
              />
              <p className="about__body">{aboutMeDescription}</p>
            </div>
          )}

          {!aboutMeLoad && (!aboutMePic || !aboutMeDescription) && (
            <div className="aboutMe__soon">
              <h1>The About Me Section Is Coming Soon</h1>
            </div>
          )}
        </div>
        <hr />
      </div>
    </div>
  );
};
