import { useEffect, useState } from "react";
import { db } from "../../data/firebase";
import "./styles/episodes.css";

export const Episodes = () => {
  const [videoList, videoListSet] = useState([
    {
      id: "",
      title: "",
      videoId: "",
    },
  ]);
  const [videoListLoad, videoListLoadSet] = useState(true);

  useEffect(() => {
    const unsubscribe = db
      .collection("userData")
      .doc("vREP4xBazXgx9C3iOopEHi9yA8t2")
      .collection("videoListData")
      .onSnapshot((snapshot) => {
        videoListSet(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
            videoId: doc.data().videoID,
          }))
        );
        videoListLoadSet(false);
      });

    return unsubscribe;
  }, []);

  return (
    <div className="episodes">
      <div className="episodes__container">
        <hr />

        <div className="episodes_list">
          <h1 className="episodes__heading">Episodes</h1>

          {videoList.length > 0 ? (
            videoList.map((video) => (
              <div className="episodes__card" key={video.id}>
                <iframe
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title}
                  frameBorder="0"
                  allowFullScreen
                  className="video"
                ></iframe>
              </div>
            ))
          ) : (
            <h1>Videos Coming Soon</h1>
          )}
        </div>

        <hr />
      </div>
    </div>
  );
};
