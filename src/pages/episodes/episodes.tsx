import { useEffect, useState } from "react";
import { db } from "../../data/firebase";
import "./styles/episodes.css";

export const Episodes = () => {
  const [bannerImage, bannerImageSet] = useState("");

  useEffect(() => {
    const unsubscribe = db
      .collection("userData")
      .doc("vREP4xBazXgx9C3iOopEHi9yA8t2")
      .onSnapshot((doc) => {
        bannerImageSet(doc.data()?.contactBanner);
      });
    return unsubscribe;
  }, []);

  return (
    <div className="episodes">
      <div className="episodes__container">
        <hr />

        <div className="episodes_list">
          <h1 className="episodes__heading">Episodes</h1>
          <div className="episodes__card">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/sppnMZBRE8w"
              title="title"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <hr />
      </div>
    </div>
  );
};
