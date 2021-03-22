import { useLocation, useHistory } from "react-router-dom";

export const EmailHandler = () => {
  const search = useLocation().search;
  const action = new URLSearchParams(search).get("mode");
  const actionCode = new URLSearchParams(search).get("oobCode")!;
  const history = useHistory();

  return (
    <>
      {action === "resetPassword" &&
        history.push("/confirmpassword", { _actionCode: actionCode })}
    </>
  );
};
