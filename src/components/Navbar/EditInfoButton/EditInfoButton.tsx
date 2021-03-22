import { useState } from "react";
import { EditButton } from "../../EditButton";
import { EditInfo } from "./EditInfo";
import "./styles/edit-info-button.css";

export const EditInfoButton = () => {
  const [isOpen, isOpenSet] = useState(false);
  return (
    <>
      <button className="editinfobutton" onClick={() => isOpenSet(true)}>
        <EditButton />
      </button>
      <EditInfo open={isOpen} onClose={() => isOpenSet(false)} />
    </>
  );
};
