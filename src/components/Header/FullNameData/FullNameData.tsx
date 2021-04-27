// import { useUser } from "../../../store/userStore";
// import { db } from "../../../data/firebase";
// import { InlineInputEdit } from "../../InlineInputEdit/InlineInputEdit";
import { NavLink } from "react-router-dom";

// const _handleFocus = (text: string) => {
//   console.log("Focused with text: " + text);
// };

// const _handleFocusOut = (text: string) => {
//   db.collection("userData").doc("vREP4xBazXgx9C3iOopEHi9yA8t2").update({
//     fullName: text,
//   });
// };

export const FullNameData = ({ fullName }: any) => {
  // const { user } = useUser();
  return (
    <h1 className="header__name">
      {fullName && (
        <NavLink to="/" className="header__nameLink">
          {fullName}
        </NavLink>
      )}
      {/* {user && fullName ? (
        <NavLink to="/" className="header__nameLink">
          {fullName && fullName}
        </NavLink>
      ) : (
        <NavLink to="/" className="header__nameLink">
          {fullName && fullName}
        </NavLink>
      )} */}
    </h1>
  );
};
