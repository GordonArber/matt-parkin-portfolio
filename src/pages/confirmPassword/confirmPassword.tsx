import "./styles/confirm-password.css";
import { useEffect, useState } from "react";
import { auth } from "../../data/firebase";
import { useHistory, useLocation } from "react-router-dom";
import { useUser } from "../../store/userStore";

interface stateType {
  _actionCode: string;
}

export const ConfirmPassword = () => {
  const { confirmPasswordReset } = useUser();

  const { state } = useLocation<stateType>();

  const [accountEmail, accountEmailSet] = useState("");
  const [newPassword, newPasswordSet] = useState("");
  const [message, messageSet] = useState("");
  const [loading, loadingSet] = useState(false);
  const [error, errorSet] = useState("");

  const history = useHistory();

  const actionCode = state._actionCode;

  useEffect(() => {
    actionCode &&
      auth
        .verifyPasswordResetCode(actionCode)
        .then((email) => {
          accountEmailSet(email);
        })
        .catch((err) => {
          errorSet(err.code);
          // console.log("error2", err, "state. ", err.code);

          // Invalid or expired action code. Ask user to try to reset the password
          // again.
        });
  }, [actionCode]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      messageSet("");
      errorSet("");
      loadingSet(true);

      await confirmPasswordReset(actionCode, newPassword);
      history.push("/account/password_reset_complete");
      messageSet("new password set!");
    } catch (e) {
      if (e.code === "auth/user-not-found") {
        errorSet("We couldn't find your account with that information.");
      } else if (e.code === "auth/invalid-email") {
        errorSet("We need this information to find your account.");
      } else {
        errorSet("Failed to log in");
      }
    }

    newPasswordSet("");
    loadingSet(false);
  }

  return (
    <div className="confirmPassword">
      <div className="confirmPassword__container">
        {actionCode && accountEmail ? (
          <>
            <h3 className="confirmPassword__heading">
              Reset your password for {accountEmail}
            </h3>
            <form onSubmit={(event) => handleSubmit(event)} noValidate>
              <div className="confirmPassword__fullGroup">
                <label
                  htmlFor="passwordInput"
                  className="confirmPassword__labelTitle"
                >
                  <h4>Password</h4>
                  <input
                    type="password"
                    name="passwordInput"
                    id="passwordInput"
                    placeholder="password"
                    value={newPassword}
                    onChange={(e) => newPasswordSet(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div className="confirmPassword__message">
                {error && (
                  <span className="confirmPassword__errorMessage">{error}</span>
                )}
                {message && (
                  <span className="confirmPassword__successMessage">
                    {message}
                  </span>
                )}
              </div>
              <button
                className="confirmPassword__button"
                type="submit"
                disabled={loading}
              >
                Save
              </button>
            </form>
          </>
        ) : error === "auth/invalid-action-code" ? (
          <>{history.push("/try-again")}</>
        ) : null}

        {/* <>{history.push("/")}</> */}
      </div>
    </div>
  );
};
