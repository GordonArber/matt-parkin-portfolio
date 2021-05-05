import { useEffect, useState } from "react";
import { db } from "../../data/firebase";
import "./styles/episodes.css";

import Loader from "react-loader-spinner";
import { useUser } from "../../store/userStore";
import { AddVidCard } from "./AddVidCard";
import { RemovalVidIcon } from "./RemovalVidIcon";
import { EditVidIcon } from "./EditVidIcon";

export const Episodes = () => {
  const { user } = useUser();
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
      .orderBy("timeStamp", "desc")
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

        <div className="episodes__list">
          <h1 className="episodes__heading">Episodes</h1>

          {user && <AddVidCard />}

          {videoListLoad && (
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

          {videoList.length > 0 &&
            !videoListLoad &&
            videoList.map((video) => (
              <div className="episodes__card" key={video.id}>
                <iframe
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title}
                  frameBorder="0"
                  allowFullScreen
                  className="video"
                ></iframe>
                {user && (
                  <div className="video__imageCardButtonContainer">
                    <EditVidIcon
                      id={video.id}
                      videoID={video.videoId}
                      title={video.title}
                    />

                    <RemovalVidIcon videoID={video.videoId} id={video.id} />
                  </div>
                )}
              </div>
            ))}

          {!user && videoList.length < 1 && !videoListLoad && (
            <div className="episodes__comingSoon">
              <h1>Videos Coming Soon</h1>
            </div>
          )}
        </div>

        <hr />
      </div>
    </div>
  );
};
