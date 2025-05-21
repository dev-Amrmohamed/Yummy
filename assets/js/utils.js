function getBasePath() {
  if (window.location.hostname === "dev-amrmohamed.github.io") {
    return "/Yummy/";
  } else {
    return "./";
  }
}
function redirectIfMissing(paramName, fallbackPage = "index.html") {
  let value = new URLSearchParams(window.location.search).get(paramName);
  if (!value) {
    window.location.href = getBasePath() + fallbackPage;
  }
}
