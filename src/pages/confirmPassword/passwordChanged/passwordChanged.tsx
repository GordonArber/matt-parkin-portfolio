import "./styles/password-changed.css";

import { Link } from "react-router-dom";

export const PasswordChanged = () => {
  return (
    <div className="passwordChanged">
      <div className="passwordChanged__container">
        <h1 className="passwordChanged__text">
          You’re all set. You've successfully changed your password.
        </h1>
        <div className="passwordChanged__backToPortfolio">
          <Link to="/admin">Continue to login</Link>
        </div>
      </div>
    </div>
  );
};
