import { useState } from "react";
import { FaPlusSquare } from "react-icons/fa";
import "./styles/add-vid-card.css";

import { AddVid } from "./AddVid";

export const AddVidCard = () => {
  const [isOpen, isOpenSet] = useState(false);

  return (
    <div className="addVidCard__containter">
      <button className="addVidCard" onClick={() => isOpenSet(true)}>
        <FaPlusSquare size="28" />
      </button>
      <AddVid open={isOpen} onClose={() => isOpenSet(false)} />
    </div>
  );
};
