import "./styles/contact-form.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { BoxedMessages } from "../../../components/BoxedMessages";
import { db } from "../../../data/firebase";

const api = axios.create({
  baseURL: `https://us-central1-artist-portfolios.cloudfunctions.net/sendMail`,
});

export const ContactForm = () => {
  const [fname, fnameSet] = useState("");
  const [lname, lnameSet] = useState("");
  const [email, emailSet] = useState("");
  const [subject, subjectSet] = useState("");
  const [message, messageSet] = useState("");
  const [status, statusSet] = useState("Submit");
  const [isErrored, isErroredSet] = useState(false);
  const [successfullySent, successfullySentSet] = useState(false);
  const [artistEmail, artistEmailSet] = useState("");

  let buttonText = status;

  useEffect(() => {
    const unsubscribe = db
      .collection("userData")
      .doc("vREP4xBazXgx9C3iOopEHi9yA8t2")
      .onSnapshot((doc) => {
        artistEmailSet(doc.data()?.email);
      });
    return unsubscribe;
  }, []);

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    statusSet("Sending");
    isErroredSet(false);
    successfullySentSet(false);

    try {
      let res = await api.post(
        `?fname=` +
          fname +
          `&lname=` +
          lname +
          `&email=` +
          email +
          `&subject=` +
          subject +
          `&message=` +
          message +
          `&artistEmail=` +
          artistEmail
      );
      if (res.data === "Message Sent") {
        fnameSet("");
        lnameSet("");
        emailSet("");
        subjectSet("");
        messageSet("");
        isErroredSet(false);
        successfullySentSet(true);
        statusSet("Submit");
      }
    } catch (err) {
      console.log(err);
      successfullySentSet(false);
      isErroredSet(true);
    }
  };

  const handleChange = (
    evt:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const field = evt.target.id;
    if (field === "fname") {
      fnameSet(evt.target.value);
    } else if (field === "lname") {
      lnameSet(evt.target.value);
    } else if (field === "email") {
      emailSet(evt.target.value);
    } else if (field === "subject") {
      subjectSet(evt.target.value);
    } else if (field === "message") {
      messageSet(evt.target.value);
    }
  };

  return (
    <div className="contactform">
      <div className="contactform__container">
        <h3 className="contactform__heading">Contact me:</h3>
        <form onSubmit={(evt) => handleSubmit(evt)} method="POST">
          <h4 className="contactform__nameTitle">Name *</h4>
          <div className="contactform__col">
            <div className="contactform__group">
              <label htmlFor="fname" className="contactform__caption">
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  x-autocompletetype="given-name"
                  spellCheck="false"
                  maxLength={30}
                  data-title="First"
                  aria-required="true"
                  value={fname}
                  onChange={(evt) => handleChange(evt)}
                />
                <span>First Name</span>
              </label>
            </div>

            <div className="contactform__group">
              <label htmlFor="lname" className="contactform__caption">
                <input
                  type="text"
                  id="lname"
                  name="lname"
                  x-autocompletetype="surname"
                  spellCheck="false"
                  maxLength={30}
                  data-title="Last"
                  aria-required="true"
                  value={lname}
                  onChange={(evt) => handleChange(evt)}
                />
                <span>Last Name</span>
              </label>
            </div>
          </div>
          <div className="contactform__fullGroup">
            <label htmlFor="email" className="contactform__labelTitle">
              <h4>Email Address*</h4>
              <input
                name="email"
                id="email"
                type="email"
                autoComplete="email"
                spellCheck="false"
                aria-required="true"
                value={email}
                onChange={(evt) => handleChange(evt)}
              />
            </label>
          </div>
          <div className="contactform__fullGroup">
            <label htmlFor="subject" className="contactform__labelTitle">
              <h4>Subject*</h4>
              <input
                id="subject"
                name="subject"
                type="text"
                aria-required="true"
                value={subject}
                onChange={(evt) => handleChange(evt)}
              />
            </label>
          </div>
          <div className="contactform__fullGroup">
            <label htmlFor="message" className="contactform__labelTitle">
              <h4>Message*</h4>
              <textarea
                name="message"
                id="message"
                className="contactform_message"
                aria-required="true"
                value={message}
                onChange={(evt) => handleChange(evt)}
              ></textarea>
            </label>
          </div>
          {successfullySent && (
            <BoxedMessages messageType="success">
              Your message has successfully submited
            </BoxedMessages>
          )}
          {isErrored && (
            <BoxedMessages messageType="error">
              Sorry, your message could not be delivered at this time
            </BoxedMessages>
          )}
          <button
            disabled={
              status === "Sending" ||
              lname.length < 1 ||
              email.length < 1 ||
              fname.length < 1 ||
              subject.length < 1 ||
              message.length < 1 ||
              artistEmail.length < 1
            }
            className="contactform__button"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};
