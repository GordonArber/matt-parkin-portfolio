import "./styles/edit-vid.css";

import { useState } from "react";
import { createPortal } from "react-dom";

import { RiCloseFill } from "react-icons/ri";
import { BoxedMessages } from "../../../../components/BoxedMessages";
import { db } from "../../../../data/firebase";

export const EditVid = ({
  id,
  title,
  videoID,
  open,
  onClose,
}: {
  id: string;
  title: string;
  videoID: string;
  open: boolean;
  onClose: () => void;
}) => {
  const [initialVideo, initialVideoSet] = useState(videoID);
  const [currentVideo, currentVideoSet] = useState(videoID);
  const [videoIDChanged, videoIDChangedSet] = useState(false);
  const [initialVideoTitle, initialVideoTitleSet] = useState(title);
  const [videoTitle, videoTitleSet] = useState(title);
  const [videoTitleChanged, videoTitleChangedSet] = useState(false);
  const [videoLoaded, videoLoadedSet] = useState(false);
  const [errorDisplay, errorDisplaySet] = useState("");

  function closePanel() {
    initialVideoSet(videoID);
    initialVideoTitleSet(title);
    videoTitleSet("");
    currentVideoSet("");
    videoIDChangedSet(false);
    videoTitleChangedSet(false);
    onClose();
  }

  if (!open) return null;

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    try {
      videoIDChanged &&
        (await db
          .collection("userData")
          .doc("vREP4xBazXgx9C3iOopEHi9yA8t2")
          .collection("videoListData")
          .doc(id)
          .update({
            videoID: currentVideo,
          }));

      videoTitleChanged &&
        (await db
          .collection("userData")
          .doc("vREP4xBazXgx9C3iOopEHi9yA8t2")
          .collection("videoListData")
          .doc(id)
          .update({
            title: videoTitle,
          }));

      videoLoadedSet(false);
      initialVideoSet(currentVideo);
      initialVideoTitleSet(videoTitle);
      videoIDChangedSet(false);
      videoTitleChangedSet(false);
      onClose();
    } catch (error) {
      errorDisplaySet(error);
    }
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const field = evt.target.id;
    if (field === "videoID") {
      videoIDChangedSet(true);
      currentVideoSet(evt.target.value);
      initialVideoSet("");
    } else if (field === "videoTitle") {
      videoTitleChangedSet(true);
      videoTitleSet(evt.target.value);
      initialVideoTitleSet("");
    }
  };

  return createPortal(
    <>
      <div className="edit">
        <div className="edit__card">
          <div className="edit__header">
            <div className="edit__headerLeft">
              <h1 className="edit__title">Edit: {title}</h1>
            </div>
            <div className="edit__headerRight">
              <button className="edit__closeButton" onClick={closePanel}>
                <RiCloseFill />
              </button>
            </div>
          </div>
          <div className="edit__body">
            <p>Paste a YouTube video ID here</p>
            <div className="editInputContainer">
              <form onSubmit={(evt) => handleSubmit(evt)} noValidate>
                {currentVideo.length > 0 ? (
                  <input
                    type="text"
                    name="videoID"
                    id="videoID"
                    className="edit__urlText"
                    value={currentVideo}
                    onChange={(evt) => currentVideoSet(evt.target.value)}
                    required
                    placeholder="YouTube Video ID"
                  />
                ) : (
                  <input
                    type="text"
                    name="videoID"
                    id="videoID"
                    className="edit__urlText"
                    value={initialVideo}
                    onChange={(evt) => handleChange(evt)}
                    required
                    placeholder="YouTube Video ID"
                  />
                )}

                <>
                  {currentVideo.length > 0 ? (
                    <img
                      src={`https://img.youtube.com/vi/${currentVideo}/maxresdefault.jpg`}
                      onLoad={() => videoLoadedSet(true)}
                      onError={() => videoLoadedSet(false)}
                      alt=""
                      className="edit__imagePreview"
                    />
                  ) : (
                    <img
                      src={`https://img.youtube.com/vi/${initialVideo}/maxresdefault.jpg`}
                      onLoad={() => videoLoadedSet(true)}
                      onError={() => videoLoadedSet(false)}
                      alt=""
                      className="edit__imagePreview"
                    />
                  )}

                  {videoLoaded ? (
                    <label
                      className="edit__videoTitleLabel"
                      htmlFor="videoTitle"
                    >
                      <p>Video Title</p>
                      {videoTitle.length > 0 ? (
                        <input
                          type="text"
                          name="videoTitle"
                          id="videoTitle"
                          className="edit__videoTitle"
                          value={videoTitle}
                          onChange={(evt) => videoTitleSet(evt.target.value)}
                          required
                          placeholder="Video Title"
                          // maxLength={25}
                        />
                      ) : (
                        <input
                          type="text"
                          name="videoTitle"
                          id="videoTitle"
                          className="edit__videoTitle"
                          value={initialVideoTitle}
                          onChange={(evt) => handleChange(evt)}
                          required
                          placeholder="Video Title"
                          // maxLength={25}
                        />
                      )}
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
                {videoTitle.length > 0 ? (
                  <button
                    disabled={
                      !videoLoaded
                      // ||
                      // currentVideo.length < 1 ||
                      // initialVideoTitle.length < 1
                    }
                  >
                    Update
                  </button>
                ) : (
                  <button
                    disabled={
                      !videoLoaded ||
                      // currentVideo.length < 1 ||
                      initialVideoTitle.length < 1
                    }
                  >
                    Update
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")!
  );
};
