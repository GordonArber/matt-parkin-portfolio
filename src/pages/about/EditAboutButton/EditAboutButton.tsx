import { useState } from "react";
import { EditButton } from "../../../components/EditButton";
import { EditAbout } from "./EditAbout";
import "./styles/edit-about-button.css";

export const EditAboutButton = () => {
  const [isOpen, isOpenSet] = useState(false);
  return (
    <>
      <button className="editaboutbutton" onClick={() => isOpenSet(true)}>
        <EditButton />
      </button>
      <EditAbout open={isOpen} onClose={() => isOpenSet(false)} />
    </>
  );
};
