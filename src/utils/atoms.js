import { atom } from "recoil";

const theme = atom({
  key: "theme",
  default: "dark",
});

const adminsUidsState = atom({
    key: "adminsUidsState",
    default: false,
  });
const isLoggedInState=atom({
  key: "isLoggedInState",
  default: false,
})

export { theme,adminsUidsState,isLoggedInState };