import "./styles/edit.css";

import { useState } from "react";
import { createPortal } from "react-dom";

import { RiCloseFill } from "react-icons/ri";
import { BoxedMessages } from "../../../../../components/BoxedMessages";
import { db } from "../../../../../data/firebase";

export const Edit = ({
  id,
  title,
  picUrl,
  open,
  onClose,
}: {
  id: string;
  title: string;
  picUrl: string;
  open: boolean;
  onClose: () => void;
}) => {
  const [initialImage, initialImageSet] = useState(picUrl);
  const [currentImage, currentImageSet] = useState(picUrl);
  const [imageURLChanged, imageURLChangedSet] = useState(false);
  const [initialImageTitle, initialImageTitleSet] = useState(title);
  const [imageTitle, imageTitleSet] = useState(title);
  const [imageTitleChanged, imageTitleChangedSet] = useState(false);
  const [imageLoaded, imageLoadedSet] = useState(false);
  const [errorDisplay, errorDisplaySet] = useState("");

  function closePanel() {
    initialImageSet(picUrl);
    initialImageTitleSet(title);
    imageTitleSet("");
    currentImageSet("");
    imageURLChangedSet(false);
    imageTitleChangedSet(false);
    onClose();
  }

  if (!open) return null;

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    try {
      imageURLChanged &&
        (await db
          .collection("userData")
          .doc("vREP4xBazXgx9C3iOopEHi9yA8t2")
          .collection("galleryData")
          .doc(id)
          .update({
            picUrl: currentImage,
          }));

      imageTitleChanged &&
        (await db
          .collection("userData")
          .doc("vREP4xBazXgx9C3iOopEHi9yA8t2")
          .collection("galleryData")
          .doc(id)
          .update({
            title: imageTitle,
          }));

      imageLoadedSet(false);
      initialImageSet(currentImage);
      initialImageTitleSet(imageTitle);
      imageURLChangedSet(false);
      imageTitleChangedSet(false);
      onClose();
    } catch (error) {
      errorDisplaySet(error);
    }
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const field = evt.target.id;
    if (field === "imageUrl") {
      imageURLChangedSet(true);
      initialImageSet("");
      currentImageSet(evt.target.value);
    } else if (field === "imageTitle") {
      imageTitleChangedSet(true);
      initialImageTitleSet("");
      imageTitleSet(evt.target.value);
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
            <p>Paste a self hosted image URL here</p>
            <div className="editInputContainer">
              <form onSubmit={(evt) => handleSubmit(evt)} noValidate>
                {currentImage.length > 0 ? (
                  <input
                    type="text"
                    name="imageUrl"
                    id="imageUrl"
                    className="edit__urlText"
                    value={currentImage}
                    onChange={(evt) => currentImageSet(evt.target.value)}
                    required
                    placeholder="Image URL"
                  />
                ) : (
                  <input
                    type="text"
                    name="imageUrl"
                    id="imageUrl"
                    className="edit__urlText"
                    value={initialImage}
                    onChange={(evt) => handleChange(evt)}
                    required
                    placeholder="Image URL"
                  />
                )}

                <>
                  {currentImage.length > 0 ? (
                    <img
                      src={currentImage}
                      onLoad={() => imageLoadedSet(true)}
                      onError={() => imageLoadedSet(false)}
                      alt=""
                      className="edit__imagePreview"
                    />
                  ) : (
                    <img
                      src={initialImage}
                      onLoad={() => imageLoadedSet(true)}
                      onError={() => imageLoadedSet(false)}
                      alt=""
                      className="edit__imagePreview"
                    />
                  )}

                  {imageLoaded ? (
                    <label
                      className="edit__imageTitleLabel"
                      htmlFor="imageTitle"
                    >
                      <p> Caption/Title</p>
                      {imageTitle.length > 0 ? (
                        <input
                          type="text"
                          name="imageTitle"
                          id="imageTitle"
                          className="edit__imageTitle"
                          value={imageTitle}
                          onChange={(evt) => imageTitleSet(evt.target.value)}
                          required
                          placeholder="Caption/Title"
                          maxLength={25}
                        />
                      ) : (
                        <input
                          type="text"
                          name="imageTitle"
                          id="imageTitle"
                          className="edit__imageTitle"
                          value={initialImageTitle}
                          onChange={(evt) => handleChange(evt)}
                          required
                          placeholder="Caption/Title"
                          maxLength={25}
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
                {imageTitle.length > 0 ? (
                  <button
                    disabled={
                      !imageLoaded
                      // ||
                      // currentImage.length < 1 ||
                      // initialImageTitle.length < 1
                    }
                  >
                    Update
                  </button>
                ) : (
                  <button
                    disabled={
                      !imageLoaded ||
                      // currentImage.length < 1 ||
                      initialImageTitle.length < 1
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
