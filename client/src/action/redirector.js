import history from "../history";

export const redirector = (response) => {
  switch (response) {
    case "user":
      return history.push("/dashboard");

    case "admin":
      return history.push("");

    default:
      break;
  }
};
