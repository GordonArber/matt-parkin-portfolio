import { useEffect, useState } from "react";
import { db } from "../../data/firebase";
import { ContactForm } from "./ContactForm";
import "./styles/contact.css";

export const Contact = () => {
  const [bannerImage, bannerImageSet] = useState("");

  useEffect(() => {
    const unsubscribe = db
      .collection("userData")
      .doc("vREP4xBazXgx9C3iOopEHi9yA8t2")
      .onSnapshot((doc) => {
        bannerImageSet(doc.data()?.contactBanner);
      });
    return unsubscribe;
  }, []);

  return (
    <div className="contact">
      <div className="contact__container">
        <hr />
        {bannerImage && (
          <img src={bannerImage} alt="" className="contact__banner" />
        )}

        <h3 className="contact__heading">Contact me:</h3>
        <ContactForm />
        <hr />
      </div>
    </div>
  );
};
