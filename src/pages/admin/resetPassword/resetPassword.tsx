import { useState } from "react";
import "./styles/reset-password.css";
import { Link } from "react-router-dom";

import { useUser } from "../../../store/userStore";

export const ResetPassword = () => {
  const { resetPassword } = useUser();

  const [error, errorSet] = useState("");
  const [message, messageSet] = useState("");
  const [loading, loadingSet] = useState(false);
  const [email, emailSet] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      messageSet("");
      errorSet("");
      loadingSet(true);

      await resetPassword(email);
      messageSet("Check your inbox for further instructions");
    } catch (e) {
      if (e.code === "auth/user-not-found") {
        errorSet("We couldn't find your account with that information.");
      } else if (e.code === "auth/invalid-email") {
        errorSet("We need this information to find your account.");
      } else {
        errorSet("Failed to log in");
      }
    }

    emailSet("");
    loadingSet(false);
  }

  return (
    <div className="resetPassword">
      <div className="resetPassword__container">
        <h3 className="resetPassword__heading">Password reset:</h3>
        <form onSubmit={(e) => handleSubmit(e)} noValidate>
          <div className="resetPassword__fullGroup">
            <label htmlFor="emailInput" className="resetPassword__labelTitle">
              <h4>Email</h4>
              <input
                type="email"
                name="emailInput"
                id="emailInput"
                placeholder="email"
                value={email}
                onChange={(e) => emailSet(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="resetPassword__message">
            {error && (
              <span className="resetPassword__errorMessage">{error}</span>
            )}
            {message && (
              <span className="resetPassword__successMessage">{message}</span>
            )}
          </div>
          <button
            className="resetPassword__button"
            type="submit"
            disabled={loading}
          >
            Search
          </button>
        </form>
        <div className="resetPassword_admin">
          <Link to="/admin">Log in</Link>
        </div>
      </div>
    </div>
  );
};
