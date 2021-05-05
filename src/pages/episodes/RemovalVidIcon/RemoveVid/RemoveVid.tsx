import { useState } from "react";
import { createPortal } from "react-dom";
import { BoxedMessages } from "../../../../components/BoxedMessages";
import { db } from "../../../../data/firebase";

import "./styles/remove-vid.css";

export const RemoveVid = ({
  open,
  onClose,
  videoID,
  id,
}: {
  open: boolean;
  onClose: () => void;
  videoID: string;
  id: string;
}) => {
  const [errorDisplay, errorDisplaySet] = useState("");
  if (!open) return null;

  async function handleDelete(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    try {
      await db
        .collection("userData")
        .doc("vREP4xBazXgx9C3iOopEHi9yA8t2")
        .collection("videoListData")
        .doc(id)
        .delete();
    } catch (error) {
      errorDisplaySet(error);
    }
  }

  return createPortal(
    <>
      <div className="remove">
        <div className="remove__card">
          <div className="remove__header">
            <h1 className="remove__title">Delete Confirmation</h1>
          </div>
          <div className="remove__body">
            <img
              src={`https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`}
              className="remove__imagePreview"
              alt=""
            />
            <button
              onClick={(event) => handleDelete(event)}
              className="remove__button remove__confirm"
            >
              Yes, delete this YouTube video from my list.
            </button>
            <button onClick={onClose} className="remove__button remove__cancel">
              No, this was an accident.
            </button>
            {errorDisplay && (
              <BoxedMessages messageType="error">{errorDisplay}</BoxedMessages>
            )}
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")!
  );
};
