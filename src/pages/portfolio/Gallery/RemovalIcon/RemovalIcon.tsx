import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import "./styles/removal-icon.css";

import { Remove } from "./Remove/Remove";

export const RemovalIcon = ({
  picUrl,
  picId,
}: {
  picUrl: string;
  picId: string;
}) => {
  const [isOpen, isOpenSet] = useState(false);

  return (
    <>
      <button className="removalIcon" onClick={() => isOpenSet(true)}>
        <FaTrash />
      </button>
      <Remove
        open={isOpen}
        onClose={() => isOpenSet(false)}
        picUrl={picUrl}
        picId={picId}
      />
    </>
  );
};
