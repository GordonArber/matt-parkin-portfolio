import "./styles/edit-button.css";
import { FaPencilAlt } from "react-icons/fa";

export const EditButton = () => {
  return (
    <div className="editbutton">
      <div className="editbutton__container">
        <FaPencilAlt className="editbutton__icon" color="white" size="20" />
      </div>
    </div>
  );
};
