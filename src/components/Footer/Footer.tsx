import { useEffect, useState } from "react";

import "./styles/footer.css";
import {
  FaFacebookF,
  FaInstagram,
  FaRegEnvelope,
  FaTwitch,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

import { db } from "../../data/firebase";

export const Footer = () => {
  const [email, emailSet] = useState("");
  const [youtube, youtubeSet] = useState("");
  const [twitch, twitchSet] = useState("");
  const [twitter, twitterSet] = useState("");
  const [facebook, facebookSet] = useState("");
  const [instagram, instagramSet] = useState("");

  useEffect(() => {
    const unsubscribe = db
      .collection("userData")
      .doc("vREP4xBazXgx9C3iOopEHi9yA8t2")
      .onSnapshot((doc) => {
        emailSet(doc.data()?.email);
        youtubeSet(doc.data()?.youtube);
        twitchSet(doc.data()?.twitch);
        twitterSet(doc.data()?.twitter);
        facebookSet(doc.data()?.facebook);
        instagramSet(doc.data()?.instagram);
      });
    return unsubscribe;
  }, []);

  return (
    <footer className="footer">
      {email && (
        <a
          className="footer__links"
          href={`mailto:${email}?subject=Inquiry from your portfolio`}
        >
          <FaRegEnvelope color="white" size="20" />
        </a>
      )}

      {youtube && (
        <a
          className="footer__links"
          href={youtube}
          rel="noopener noreferrer nofollow"
          target="_blank"
        >
          <FaYoutube color="white" size="24" />
        </a>
      )}

      {twitch && (
        <a
          className="footer__links"
          href={twitch}
          rel="noopener noreferrer nofollow"
          target="_blank"
        >
          <FaTwitch color="white" size="20" />
        </a>
      )}

      {twitter && (
        <a
          className="footer__links"
          href={twitter}
          rel="noopener noreferrer nofollow"
          target="_blank"
        >
          <FaTwitter color="white" size="20" />
        </a>
      )}
      {facebook && (
        <a
          className="footer__links"
          href={facebook}
          rel="noopener noreferrer nofollow"
          target="_blank"
        >
          <FaFacebookF color="white" size="20" />
        </a>
      )}
      {instagram && (
        <a
          className="footer__links"
          href={instagram}
          rel="noopener noreferrer nofollow"
          target="_blank"
        >
          <FaInstagram color="white" size="20" />
        </a>
      )}
    </footer>
  );
};
