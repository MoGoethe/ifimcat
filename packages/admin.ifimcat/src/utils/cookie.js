export const getCookie = () => {
  const cookie = document.cookie.split("pid");
  console.log(cookie)
  if (cookie.length > 1) {
    const userInfo = cookie[1]
    const username = userInfo.split(";")
    return username[0].trim();
  }
  return ""
}
