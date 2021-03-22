import { useEffect, useState } from "react";

import "./styles/header.css";
import { db } from "../../data/firebase";
import { FullNameData } from "./FullNameData";
import { TitleData } from "./TitleData/TitleData";

export const Header = () => {
  const [fullName, fullNameSet] = useState("");
  const [title, titleSet] = useState("");

  useEffect(() => {
    const unsubscribe = db
      .collection("userData")
      .doc("vREP4xBazXgx9C3iOopEHi9yA8t2")
      .onSnapshot((doc) => {
        fullNameSet(doc.data()?.fullName);
        titleSet(doc.data()?.title);
      });
    return unsubscribe;
  }, []);

  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__container">
          <div></div>
          <div className="header__left">
            <div className="textContainer">
              {fullName && <FullNameData fullName={fullName} />}
            </div>
            <TitleData title={title} />
          </div>
        </div>
      </div>
    </header>
  );
};
