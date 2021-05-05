import "./styles/edit-vid-icon.css";
import { useState } from "react";

import { FaPencilAlt } from "react-icons/fa";
import { EditVid } from "./EditVid";

export const EditVidIcon = ({
  id,
  title,
  videoID,
}: {
  id: string;
  title: string;
  videoID: string;
}) => {
  const [isOpen, isOpenSet] = useState(false);

  return (
    <>
      <button className="editVidIcon" onClick={() => isOpenSet(true)}>
        <FaPencilAlt />
      </button>
      <EditVid
        id={id}
        title={title}
        videoID={videoID}
        open={isOpen}
        onClose={() => isOpenSet(false)}
      />
    </>
  );
};
