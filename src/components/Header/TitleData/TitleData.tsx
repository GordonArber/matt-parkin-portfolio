import { useUser } from "../../../store/userStore";
import { db } from "../../../data/firebase";
import { InlineInputEdit } from "../../InlineInputEdit/InlineInputEdit";

const _handleFocus = (text: string) => {
  console.log("Focused with text: " + text);
};

const _handleFocusOut = (text: string) => {
  db.collection("userData").doc("vREP4xBazXgx9C3iOopEHi9yA8t2").update({
    title: text,
  });
};

export const TitleData = ({ title }: any) => {
  const { user } = useUser();
  return (
    <p className="header__title">
      {user && title ? (
        <InlineInputEdit
          text={title}
          inputWidth="150px"
          inputHeight="25px"
          inputMaxLength={20}
          labelFontWeight="bold"
          inputFontWeight="bold"
          inputClassName="header__title"
          onFocus={_handleFocus}
          onFocusOut={_handleFocusOut}
        />
      ) : (
        <>{title && title}</>
      )}
    </p>
  );
};
