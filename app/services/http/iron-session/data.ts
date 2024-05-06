import { type SessionOptions } from "iron-session";

export const sessionOptions: SessionOptions = {
  password: process.env.IRON_SESSION_PASSWORD as string,
  cookieName: "sessionToken",
  cookieOptions: {
    secure: process.env.NEXT_PUBLIC_MODE !== "local",
  },
};
