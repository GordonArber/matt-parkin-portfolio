import { useEffect, useState } from "react";
import { db } from "../../data/firebase";
import { ContactForm } from "./ContactForm";
import "./styles/contact.css";

import Loader from "react-loader-spinner";

export const Contact = () => {
  const [bannerImage, bannerImageSet] = useState("");
  const [contactBannerLoad, contactBannerLoadSet] = useState(true);

  useEffect(() => {
    const unsubscribe = db
      .collection("userData")
      .doc("vREP4xBazXgx9C3iOopEHi9yA8t2")
      .onSnapshot((doc) => {
        bannerImageSet(doc.data()?.contactBanner);
        contactBannerLoadSet(false);
      });
    return unsubscribe;
  }, []);

  return (
    <div className="contact">
      <div className="contact__container">
        <hr />
        {contactBannerLoad && (
          <div className="routes__loader">
            <Loader
              type="TailSpin"
              color="#6396ab"
              height={80}
              width={80}
              timeout={3000}
            />
          </div>
        )}

        {bannerImage && !contactBannerLoad ? (
          <img src={bannerImage} alt="" className="contact__banner" />
        ) : null}

        <ContactForm />
        <hr />
      </div>
    </div>
  );
};
