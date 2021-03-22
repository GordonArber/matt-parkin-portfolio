import firebase from "firebase/app";
import { useState } from "react";

import { createPortal } from "react-dom";
import { RiCloseFill } from "react-icons/ri";
import { BoxedMessages } from "../../../../../components/BoxedMessages";
import { db } from "../../../../../data/firebase";

import "./styles/add.css";

export const Add = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [currentImage, currentImageSet] = useState("");
  const [imageLoaded, imageLoadedSet] = useState(false);
  const [imageTitle, imageTitleSet] = useState("");
  const [errorDisplay, errorDisplaySet] = useState("");

  if (!open) return null;

  function closePanel() {
    currentImageSet("");
    imageTitleSet("");
    imageLoadedSet(false);
    onClose();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await db
        .collection("userData")
        .doc("vREP4xBazXgx9C3iOopEHi9yA8t2")
        .collection("galleryData")
        .add({
          picUrl: currentImage,
          title: imageTitle,
          timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

      closePanel();
    } catch (error) {
      errorDisplaySet(error);
    }
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const field = evt.target.id;
    if (field === "imageUrl") {
      currentImageSet(evt.target.value);
    } else if (field === "imageTitle") {
      imageTitleSet(evt.target.value);
    }
  };

  return createPortal(
    <>
      <div className="add">
        <div className="add__card">
          <div className="add__header">
            <div className="add__headerLeft">
              <h1 className="add__title">New Image</h1>
            </div>
            <div className="add__headerRight">
              <button className="add__closeButton" onClick={closePanel}>
                <RiCloseFill />
              </button>
            </div>
          </div>
          <div className="add__body">
            <p>Paste a self hosted image URL here</p>
            <div className="addInputContainer">
              <form onSubmit={(evt) => handleSubmit(evt)} noValidate>
                <input
                  type="text"
                  name="imageUrl"
                  id="imageUrl"
                  className="add__urlText"
                  value={currentImage}
                  onChange={(evt) => handleChange(evt)}
                  required
                  placeholder="Image URL"
                />

                {currentImage && (
                  <>
                    <img
                      src={currentImage}
                      onLoad={() => imageLoadedSet(true)}
                      onError={() => imageLoadedSet(false)}
                      alt=""
                      className="add__imagePreview"
                    />
                    {imageLoaded ? (
                      <label
                        className="add__imageTitleLabel"
                        htmlFor="imageTitle"
                      >
                        <p> Caption/Title</p>
                        <input
                          type="text"
                          name="imageTitle"
                          id="imageTitle"
                          className="add__imageTitle"
                          value={imageTitle}
                          onChange={(evt) => handleChange(evt)}
                          required
                          placeholder="Caption/Title"
                          maxLength={25}
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
                    !imageLoaded ||
                    currentImage.length < 1 ||
                    imageTitle.length < 1
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
