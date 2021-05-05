import { createPortal } from "react-dom";
import "./styles/edit-about.css";
import { db } from "../../../../data/firebase";
import { RiCloseFill } from "react-icons/ri";
import { BoxedMessages } from "../../../../components/BoxedMessages";
import { useEffect, useState } from "react";

interface EditAboutProps {
  open: boolean;
  onClose: () => void;
}

export const EditAbout = ({ open, onClose }: EditAboutProps) => {
  const [aboutMePicURI, aboutMePicURISet] = useState("");
  const [currentAboutMePicURI, currentaboutMePicURISet] = useState("");
  const [aboutMePicURIChanged, aboutMePicURIChangedSet] = useState(false);
  const [aboutMeDescriptionURI, aboutMeDescriptionURISet] = useState("");
  const [
    currentAboutMeDescriptionURI,
    currentAboutMeDescriptionURISet,
  ] = useState("");
  const [
    aboutMeDescriptionURIChanged,
    aboutMeDescriptionURIChangedSet,
  ] = useState(false);
  const [errorDisplay, errorDisplaySet] = useState("");

  useEffect(() => {
    const unsubscribe = db
      .collection("userData")
      .doc("vREP4xBazXgx9C3iOopEHi9yA8t2")
      .onSnapshot((doc) => {
        aboutMePicURISet(doc.data()?.aboutMePic);
        aboutMeDescriptionURISet(doc.data()?.aboutMeDescription);
      });
    return unsubscribe;
  }, [onClose]);

  const closePanel = () => {
    currentaboutMePicURISet("");
    currentAboutMeDescriptionURISet("");
    aboutMePicURIChangedSet(false);
    aboutMeDescriptionURIChangedSet(false);
    onClose();
  };

  if (!open) return null;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      aboutMePicURIChanged &&
        (await db
          .collection("userData")
          .doc("vREP4xBazXgx9C3iOopEHi9yA8t2")
          .update({
            aboutMePic: currentAboutMePicURI,
          }));

      aboutMeDescriptionURIChanged &&
        (await db
          .collection("userData")
          .doc("vREP4xBazXgx9C3iOopEHi9yA8t2")
          .update({
            aboutMeDescription: currentAboutMeDescriptionURI,
          }));

      closePanel();
    } catch (error) {
      errorDisplaySet(error);
    }
  };

  const handleChange = (
    evt:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const field = evt.target.id;
    if (field === "aboutMePicURI") {
      aboutMePicURIChangedSet(true);
      aboutMePicURISet("");
      currentaboutMePicURISet(evt.target.value);
    } else if (field === "aboutMeDescriptionURI") {
      aboutMeDescriptionURIChangedSet(true);
      aboutMeDescriptionURISet("");
      currentAboutMeDescriptionURISet(evt.target.value);
    }
  };

  return createPortal(
    <>
      <div className="edit">
        <div className="edit__card">
          <div className="edit__header">
            <div className="edit__headerLeft">
              <h1 className="edit__title">Edit about me information</h1>
            </div>
            <div className="edit__headerRight">
              <button className="edit__closeButton" onClick={closePanel}>
                <RiCloseFill />
              </button>
            </div>
          </div>
          <div className="edit__body">
            <div className="editInputContainer">
              <form onSubmit={(event) => handleSubmit(event)} noValidate>
                <label htmlFor="aboutMePicURI">
                  Paste a self hosted image URL here*
                </label>
                {currentAboutMePicURI.length > 0 ? (
                  <input
                    type="text"
                    id="aboutMePicURI"
                    className="edit__urlText"
                    value={currentAboutMePicURI}
                    onChange={(event) =>
                      currentaboutMePicURISet(event.target.value)
                    }
                    required
                    placeholder="Image URL"
                  />
                ) : (
                  <input
                    type="text"
                    id="aboutMePicURI"
                    className="edit__urlText"
                    value={aboutMePicURI}
                    onChange={(event) => handleChange(event)}
                    required
                    placeholder="Image URL"
                  />
                )}
                <label htmlFor="aboutMeDescriptionURI">
                  Professional About Me Description*
                </label>
                {currentAboutMeDescriptionURI.length > 0 ? (
                  <textarea
                    id="aboutMeDescriptionURI"
                    className="editAboutMe__urlText"
                    value={currentAboutMeDescriptionURI}
                    onChange={(evt) =>
                      currentAboutMeDescriptionURISet(evt.target.value)
                    }
                    required
                    placeholder="About Me Description"
                    rows={12}
                    cols={111}
                  />
                ) : (
                  <textarea
                    id="aboutMeDescriptionURI"
                    className="editAboutMe__urlText"
                    value={aboutMeDescriptionURI}
                    onChange={(evt) => handleChange(evt)}
                    required
                    placeholder="About Me Description"
                    rows={12}
                    cols={111}
                  />
                )}

                {errorDisplay.length > 0 && (
                  <BoxedMessages messageType="error">
                    {errorDisplay}
                  </BoxedMessages>
                )}

                {currentAboutMePicURI.length > 0 ||
                currentAboutMeDescriptionURI.length > 0 ? (
                  <button>Update</button>
                ) : (
                  <button
                    disabled={
                      aboutMePicURI.length < 1 ||
                      aboutMeDescriptionURI.length < 1
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
