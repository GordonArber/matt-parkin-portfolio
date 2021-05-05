import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import "./styles/removal-vid-icon.css";

import { RemoveVid } from "./RemoveVid";

export const RemovalVidIcon = ({
  videoID,
  id,
}: {
  videoID: string;
  id: string;
}) => {
  const [isOpen, isOpenSet] = useState(false);

  return (
    <>
      <button className="removalIcon" onClick={() => isOpenSet(true)}>
        <FaTrash />
      </button>
      <RemoveVid
        open={isOpen}
        onClose={() => isOpenSet(false)}
        videoID={videoID}
        id={id}
      />
    </>
  );
};
