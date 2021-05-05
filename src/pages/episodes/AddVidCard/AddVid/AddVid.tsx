import firebase from "firebase/app";
import { useState } from "react";

import { createPortal } from "react-dom";
import { RiCloseFill } from "react-icons/ri";
import { BoxedMessages } from "../../../../components/BoxedMessages";
import { db } from "../../../../data/firebase";

import "./styles/add-vid.css";

export const AddVid = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [currentVideo, currentVideoSet] = useState("");
  const [videoLoaded, videoLoadedSet] = useState(false);
  const [videoTitle, videoTitleSet] = useState("");
  const [errorDisplay, errorDisplaySet] = useState("");

  if (!open) return null;

  function closePanel() {
    currentVideoSet("");
    videoTitleSet("");
    videoLoadedSet(false);
    onClose();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await db
        .collection("userData")
        .doc("vREP4xBazXgx9C3iOopEHi9yA8t2")
        .collection("videoListData")
        .add({
          videoID: currentVideo,
          title: videoTitle,
          timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

      closePanel();
    } catch (error) {
      errorDisplaySet(error);
    }
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const field = evt.target.id;
    if (field === "videoID") {
      currentVideoSet(evt.target.value);
    } else if (field === "videoTitle") {
      videoTitleSet(evt.target.value);
    }
  };

  return createPortal(
    <>
      <div className="add">
        <div className="add__card">
          <div className="add__header">
            <div className="add__headerLeft">
              <h1 className="add__title">New YouTube Video</h1>
            </div>
            <div className="add__headerRight">
              <button className="add__closeButton" onClick={closePanel}>
                <RiCloseFill />
              </button>
            </div>
          </div>
          <div className="add__body">
            <p>Paste a YouTube video ID here</p>
            <div className="addInputContainer">
              <form onSubmit={(evt) => handleSubmit(evt)} noValidate>
                <input
                  type="text"
                  name="videoID"
                  id="videoID"
                  className="add__urlText"
                  value={currentVideo}
                  onChange={(evt) => handleChange(evt)}
                  required
                  placeholder="YouTube Video ID"
                />

                {currentVideo && (
                  <>
                    <img
                      src={`https://img.youtube.com/vi/${currentVideo}/maxresdefault.jpg`}
                      onLoad={() => videoLoadedSet(true)}
                      onError={() => videoLoadedSet(false)}
                      alt=""
                      className="add__imagePreview"
                    />
                    {videoLoaded ? (
                      <label
                        className="add__videoTitleLabel"
                        htmlFor="videoTitle"
                      >
                        <p>Video Title</p>
                        <input
                          type="text"
                          name="videoTitle"
                          id="videoTitle"
                          className="add__videoTitle"
                          value={videoTitle}
                          onChange={(evt) => handleChange(evt)}
                          required
                          placeholder="Video Title"
                          //   maxLength={25}
                        />
                      </label>
                    ) : (
                      <BoxedMessages messageType="error">
                        Couldn't load image
                      </BoxedMessages>
                    )}
                    {errorDisplay && (
                      <BoxedMessages messageType="error">
                        {errorDisplay}
                      </BoxedMessages>
                    )}
                  </>
                )}

                <button
                  disabled={
                    !videoLoaded ||
                    currentVideo.length < 1 ||
                    videoTitle.length < 1
                  }
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")!
  );
};
