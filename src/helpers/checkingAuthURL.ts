import Cookies from "js-cookie";

export function checkingAuthURL() {
  const thisUsersURL = Cookies.get("$THIS$CURRENT$USER$") || null;

  const params = new URLSearchParams(window?.location?.search);
  const currentURLID = String(params?.get("browserId"))

  if (thisUsersURL !== currentURLID) {
    Cookies.remove("$THIS$CURRENT$USER$");
    window?.history?.replaceState(null, "", "?");
  }
}

export function setAuthURL(currentURLID: string) {
  if (!Cookies.get("$THIS$CURRENT$USER$")) {
    console.log("ishladi");
    
    const now = new Date();
    const expirationDate = new Date(now.getTime() + 5 * 60 * 60 * 1000);
    
    Cookies.set("$THIS$CURRENT$USER$", currentURLID, { expires: expirationDate });
  }
}