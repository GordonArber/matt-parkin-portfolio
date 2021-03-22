import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./styles/admin.css";

import { useUser } from "../../store/userStore";

export const Admin = () => {
  const { signin, loading, handleLoadingSet } = useUser();

  let history = useHistory();

  const [error, errorSet] = useState("");
  const [email, emailSet] = useState("");
  const [password, passwordSet] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      errorSet("");
      handleLoadingSet(true);
      await signin(email, password);
      history.push("/");
    } catch (e) {
      passwordSet("");
      if (e.code === "auth/invalid-email") {
        errorSet("The email address is badly formatted.");
      } else if (e.code === "auth/too-many-requests") {
        errorSet(
          "You have tried too many times, please try again in 15 minutes."
        );
      } else if (e.code === "auth/wrong-password" || "auth/user-not-found") {
        errorSet(
          "The email and password you entered did not match our records. Please double-check and try again."
        );
      } else {
        errorSet("Failed to log in");
      }
    }
  }

  return (
    <div className="admin">
      <div className="admin__container">
        <h3 className="admin__heading">Log in:</h3>
        <form onSubmit={handleSubmit} noValidate>
          <div className="admin__fullGroup">
            <label htmlFor="emailInput" className="admin__labelTitle">
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
          <div className="admin__fullGroup">
            <label htmlFor="passwordInput" className="admin__labelTitle">
              <h4>Password</h4>
              <input
                type="password"
                name="passwordInput"
                id="passwordInput"
                placeholder="password"
                value={password}
                onChange={(e) => passwordSet(e.target.value)}
              />
            </label>
          </div>
          <div className="admin__massage">
            {error && <span className="admin__errorMessage">{error}</span>}
          </div>
          <button
            className="admin__button"
            type="submit"
            disabled={loading || email.length < 1 || password.length < 1}
          >
            Log In
          </button>
        </form>
        <div className="admin__forgotPassword">
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
      </div>
    </div>
  );
};
