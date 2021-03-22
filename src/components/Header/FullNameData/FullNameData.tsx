import { useUser } from "../../../store/userStore";
import { db } from "../../../data/firebase";
import { InlineInputEdit } from "../../InlineInputEdit/InlineInputEdit";
import { NavLink } from "react-router-dom";

const _handleFocus = (text: string) => {
  console.log("Focused with text: " + text);
};

const _handleFocusOut = (text: string) => {
  db.collection("userData").doc("vREP4xBazXgx9C3iOopEHi9yA8t2").update({
    fullName: text,
  });
};

export const FullNameData = ({ fullName }: any) => {
  const { user } = useUser();
  return (
    <h1 className="header__name">
      {user && fullName ? (
        <InlineInputEdit
          text={fullName}
          inputWidth="320px"
          inputHeight="18.1px"
          inputMaxLength={101}
          labelFontWeight="bold"
          inputFontWeight="bold"
          inputBorderWidth="none"
          inputClassName="header__name"
          onFocus={_handleFocus}
          onFocusOut={_handleFocusOut}
        />
      ) : (
        <NavLink to="/" className="header__nameLink">
          {fullName && fullName}
        </NavLink>
      )}
    </h1>
  );
};
