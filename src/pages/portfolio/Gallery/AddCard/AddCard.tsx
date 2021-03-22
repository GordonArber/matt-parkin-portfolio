import { useState } from "react";
import { FaPlusSquare } from "react-icons/fa";
import "./styles/add-card.css";

import { Add } from "./Add";

export const AddCard = () => {
  const [isOpen, isOpenSet] = useState(false);

  return (
    <>
      <button className="addCard" onClick={() => isOpenSet(true)}>
        <FaPlusSquare size="28" />
      </button>
      <Add open={isOpen} onClose={() => isOpenSet(false)} />
    </>
  );
};
