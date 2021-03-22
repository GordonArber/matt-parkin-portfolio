import "./styles/try-again.css";
import { Link } from "react-router-dom";

export const TryAgain = () => {
  return (
    <div className="tryAgain">
      <div className="tryAgain__container">
        <h3 className="tryAgain__heading">Try resetting your password again</h3>
        <p className="tryAgain__bodyText">
          Your request to reset your password has expired or the link has
          already been used
        </p>
        <div className="admin__forgotPassword">
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
      </div>
    </div>
  );
};
