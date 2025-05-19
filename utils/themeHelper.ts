export const changeTheme = (theme: string | null | undefined) => {
  document
    .querySelector("html")
    ?.setAttribute("data-theme", theme ? theme : "light");
};
