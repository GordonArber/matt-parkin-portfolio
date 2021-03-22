import "./styles/edit-icon.css";
import { useState } from "react";

import { FaPencilAlt } from "react-icons/fa";
import { Edit } from "./Edit/Edit";

export const EditIcon = ({
  id,
  title,
  picUrl,
}: {
  id: string;
  title: string;
  picUrl: string;
}) => {
  const [isOpen, isOpenSet] = useState(false);

  return (
    <>
      <button className="editIcon" onClick={() => isOpenSet(true)}>
        <FaPencilAlt />
      </button>
      <Edit
        id={id}
        title={title}
        picUrl={picUrl}
        open={isOpen}
        onClose={() => isOpenSet(false)}
      />
    </>
  );
};
