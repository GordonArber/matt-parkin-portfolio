import { createPortal } from "react-dom";
import "./styles/edit-info.css";
import { db } from "../../../../data/firebase";
import { RiCloseFill } from "react-icons/ri";
import { BoxedMessages } from "../../../BoxedMessages";
import { useEffect, useState } from "react";

interface EditInfoProps {
  open: boolean;
  onClose: () => void;
}

export const EditInfo = ({ open, onClose }: EditInfoProps) => {
  const [fullName, fullNameSet] = useState("");
  const [currentfullName, currentfullNameSet] = useState("");
  const [nameChanged, nameChangedSet] = useState(false);
  const [title, titleSet] = useState("");
  const [currentTitle, currentTitleSet] = useState("");
  const [titleChanged, titleChangedSet] = useState(false);
  const [email, emailSet] = useState("");
  const [currentEmail, currentEmailSet] = useState("");
  const [emailChanged, emailChangedSet] = useState(false);
  const [youtube, youtubeSet] = useState("");
  const [currentYoutube, currentYoutubeSet] = useState("");
  const [youtubeChanged, youtubeChangedSet] = useState(false);
  const [twitch, twitchSet] = useState("");
  const [currentTwitch, currentTwitchSet] = useState("");
  const [twitchChanged, twitchChangedSet] = useState(false);
  const [twitter, twitterSet] = useState("");
  const [currentTwitter, currentTwitterSet] = useState("");
  const [twitterChanged, twitterChangedSet] = useState(false);
  const [facebook, facebookSet] = useState("");
  const [currentFacebook, currentFacebookSet] = useState("");
  const [facebookChanged, facebookChangedSet] = useState(false);
  const [instagram, instagramSet] = useState("");
  const [currentInstagram, currentInstagramSet] = useState("");
  const [instagramChanged, instagramChangedSet] = useState(false);
  const [contactBanner, contactBannerSet] = useState("");
  const [currentContactBanner, currentContactBannerSet] = useState("");
  const [contactBannerChanged, contactBannerChangedSet] = useState(false);
  const [errorDisplay, errorDisplaySet] = useState("");

  useEffect(() => {
    const unsubscribe = db
      .collection("userData")
      .doc("vREP4xBazXgx9C3iOopEHi9yA8t2")
      .onSnapshot((doc) => {
        fullNameSet(doc.data()?.fullName);
        titleSet(doc.data()?.title);
        emailSet(doc.data()?.email);
        youtubeSet(doc.data()?.youtube);
        twitchSet(doc.data()?.twitch);
        twitterSet(doc.data()?.twitter);
        facebookSet(doc.data()?.facebook);
        instagramSet(doc.data()?.instagram);
        contactBannerSet(doc.data()?.contactBanner);
      });
    return unsubscribe;
  }, [onClose]);

  const closePanel = () => {
    currentfullNameSet("");
    currentTitleSet("");
    currentEmailSet("");
    currentYoutubeSet("");
    currentTwitchSet("");
    currentTwitterSet("");
    currentFacebookSet("");
    currentInstagramSet("");
    currentContactBannerSet("");
    nameChangedSet(false);
    titleChangedSet(false);
    emailChangedSet(false);
    youtubeChangedSet(false);
    twitchChangedSet(false);
    twitterChangedSet(false);
    facebookChangedSet(false);
    instagramChangedSet(false);
    contactBannerChangedSet(false);
    onClose();
  };

  if (!open) return null;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      nameChanged &&
        (await db
          .collection("userData")
          .doc("vREP4xBazXgx9C3iOopEHi9yA8t2")
          .update({
            fullName: currentfullName,
          }));

      titleChanged &&
        (await db
          .collection("userData")
          .doc("vREP4xBazXgx9C3iOopEHi9yA8t2")
          .update({
            title: currentTitle,
          }));

      emailChanged &&
        (await db
          .collection("userData")
          .doc("vREP4xBazXgx9C3iOopEHi9yA8t2")
          .update({
            email: currentEmail,
          }));

      contactBannerChanged &&
        (await db
          .collection("userData")
          .doc("vREP4xBazXgx9C3iOopEHi9yA8t2")
          .update({
            contactBanner: currentContactBanner,
          }));

      youtubeChanged &&
        (await db
          .collection("userData")
          .doc("vREP4xBazXgx9C3iOopEHi9yA8t2")
          .update({
            youtube: currentYoutube,
          }));

      twitchChanged &&
        (await db
          .collection("userData")
          .doc("vREP4xBazXgx9C3iOopEHi9yA8t2")
          .update({
            twitch: currentTwitch,
          }));

      twitterChanged &&
        (await db
          .collection("userData")
          .doc("vREP4xBazXgx9C3iOopEHi9yA8t2")
          .update({
            twitter: currentTwitter,
          }));

      facebookChanged &&
        (await db
          .collection("userData")
          .doc("vREP4xBazXgx9C3iOopEHi9yA8t2")
          .update({
            facebook: currentFacebook,
          }));

      instagramChanged &&
        (await db
          .collection("userData")
          .doc("vREP4xBazXgx9C3iOopEHi9yA8t2")
          .update({
            instagram: currentInstagram,
          }));

      closePanel();
    } catch (error) {
      errorDisplaySet(error);
    }
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const field = evt.target.id;
    if (field === "fullName") {
      nameChangedSet(true);
      fullNameSet("");
      currentfullNameSet(evt.target.value);
    } else if (field === "title") {
      titleChangedSet(true);
      titleSet("");
      currentTitleSet(evt.target.value);
    } else if (field === "email") {
      emailChangedSet(true);
      emailSet("");
      currentEmailSet(evt.target.value);
    } else if (field === "youtube") {
      youtubeChangedSet(true);
      youtubeSet("");
      currentYoutubeSet(evt.target.value);
    } else if (field === "twitch") {
      twitchChangedSet(true);
      twitchSet("");
      currentTwitchSet(evt.target.value);
    } else if (field === "twitter") {
      twitterChangedSet(true);
      twitterSet("");
      currentTwitterSet(evt.target.value);
    } else if (field === "facebook") {
      facebookChangedSet(true);
      facebookSet("");
      currentFacebookSet(evt.target.value);
    } else if (field === "instagram") {
      instagramChangedSet(true);
      instagramSet("");
      currentInstagramSet(evt.target.value);
    } else if (field === "contact-banner") {
      contactBannerChangedSet(true);
      contactBannerSet("");
      currentContactBannerSet(evt.target.value);
    }
  };

  return createPortal(
    <>
      <div className="edit">
        <div className="edit__card">
          <div className="edit__header">
            <div className="edit__headerLeft">
              <h1 className="edit__title">Edit portfolio information</h1>
            </div>
            <div className="edit__headerRight">
              <button className="edit__closeButton" onClick={closePanel}>
                <RiCloseFill />
              </button>
            </div>
          </div>
          <div className="edit__body">
            <div className="editInputContainer">
              <form onSubmit={(event) => handleSubmit(event)} noValidate>
                <label htmlFor="fullName">Full Name*</label>
                {currentfullName.length > 0 ? (
                  <input
                    type="text"
                    id="fullName"
                    className="edit__urlText"
                    value={currentfullName}
                    onChange={(event) => currentfullNameSet(event.target.value)}
                    required
                    placeholder="Full Name"
                  />
                ) : (
                  <input
                    type="text"
                    id="fullName"
                    className="edit__urlText"
                    value={fullName}
                    onChange={(event) => handleChange(event)}
                    required
                    placeholder="Full Name"
                  />
                )}
                <label htmlFor="title">
                  Professional Headline* - One line about you
                </label>
                {currentTitle.length > 0 ? (
                  <input
                    type="text"
                    id="title"
                    className="edit__urlText"
                    value={currentTitle}
                    onChange={(event) => currentTitleSet(event.target.value)}
                    required
                    placeholder="Title"
                  />
                ) : (
                  <input
                    type="text"
                    id="title"
                    className="edit__urlText"
                    value={title}
                    onChange={(event) => handleChange(event)}
                    required
                    placeholder="Title"
                  />
                )}

                <label htmlFor="email">Contact Email*</label>
                {currentEmail.length > 0 ? (
                  <input
                    type="email"
                    id="email"
                    className="edit__urlText"
                    value={currentEmail}
                    onChange={(event) => currentEmailSet(event.target.value)}
                    required
                    placeholder="Contact Email"
                  />
                ) : (
                  <input
                    type="email"
                    id="email"
                    className="edit__urlText"
                    value={email}
                    onChange={(event) => handleChange(event)}
                    required
                    placeholder="Contact Email"
                  />
                )}

                <label htmlFor="youtube">YouTube Link</label>
                {currentYoutube.length > 0 ? (
                  <input
                    type="text"
                    id="youtube"
                    className="edit__urlText"
                    value={currentYoutube}
                    onChange={(event) => currentYoutubeSet(event.target.value)}
                    placeholder="YouTube Link"
                  />
                ) : (
                  <input
                    type="text"
                    id="youtube"
                    className="edit__urlText"
                    value={youtube}
                    onChange={(event) => handleChange(event)}
                    placeholder="YouTube Link"
                  />
                )}

                <label htmlFor="twitch">Twitch Link</label>
                {currentTwitch.length > 0 ? (
                  <input
                    type="text"
                    id="twitch"
                    className="edit__urlText"
                    value={currentTwitch}
                    onChange={(event) => currentTwitchSet(event.target.value)}
                    placeholder="Twitch Link"
                  />
                ) : (
                  <input
                    type="text"
                    id="twitch"
                    className="edit__urlText"
                    value={twitch}
                    onChange={(event) => handleChange(event)}
                    placeholder="Twitch Link"
                  />
                )}

                <label htmlFor="twitter">Twitter Link</label>
                {currentTwitter.length > 0 ? (
                  <input
                    type="text"
                    id="twitter"
                    className="edit__urlText"
                    value={currentTwitter}
                    onChange={(event) => currentTwitterSet(event.target.value)}
                    placeholder="Twitter Link"
                  />
                ) : (
                  <input
                    type="text"
                    id="twitter"
                    className="edit__urlText"
                    value={twitter}
                    onChange={(event) => handleChange(event)}
                    placeholder="Twitter Link"
                  />
                )}

                <label htmlFor="facebook">Facebook Link</label>
                {currentFacebook.length > 0 ? (
                  <input
                    type="text"
                    id="facebook"
                    className="edit__urlText"
                    value={currentFacebook}
                    onChange={(event) => currentFacebookSet(event.target.value)}
                    placeholder="Facebook Link"
                  />
                ) : (
                  <input
                    type="text"
                    id="facebook"
                    className="edit__urlText"
                    value={facebook}
                    onChange={(event) => handleChange(event)}
                    placeholder="Facebook Link"
                  />
                )}

                <label htmlFor="instagram">Instagram Link</label>
                {currentInstagram.length > 0 ? (
                  <input
                    type="text"
                    id="instagram"
                    className="edit__urlText"
                    value={currentInstagram}
                    onChange={(event) =>
                      currentInstagramSet(event.target.value)
                    }
                    placeholder="Instagram Link"
                  />
                ) : (
                  <input
                    type="text"
                    id="instagram"
                    className="edit__urlText"
                    value={instagram}
                    onChange={(event) => handleChange(event)}
                    placeholder="Instagram Link"
                  />
                )}

                <label htmlFor="contact-banner">Contact Banner URL</label>
                {currentContactBanner.length > 0 ? (
                  <input
                    type="text"
                    id="contact-banner"
                    className="edit__urlText"
                    value={currentContactBanner}
                    onChange={(event) =>
                      currentContactBannerSet(event.target.value)
                    }
                    placeholder="Contact Banner URL"
                  />
                ) : (
                  <input
                    type="text"
                    id="contact-banner"
                    className="edit__urlText"
                    value={contactBanner}
                    onChange={(event) => handleChange(event)}
                    placeholder="Contact Banner URL"
                  />
                )}

                {errorDisplay.length > 0 && (
                  <BoxedMessages messageType="error">
                    {errorDisplay}
                  </BoxedMessages>
                )}

                {currentfullName.length > 0 ||
                currentTitle.length > 0 ||
                currentEmail.length > 0 ||
                currentContactBanner.length > 0 ? (
                  <button>Update</button>
                ) : (
                  <button
                    disabled={
                      fullName.length < 1 ||
                      title.length < 1 ||
                      email.length < 1 ||
                      contactBanner.length < 1
                    }
                  >
                    Update
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")!
  );
};
