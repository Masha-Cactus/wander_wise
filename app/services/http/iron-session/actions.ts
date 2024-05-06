"use server";

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { sessionOptions } from "./data";
import { UserSessionData } from "./types";
import { getPlainObject } from "@/app/lib/helpers";

export async function getSession({ isReturnPlainObject = false } = {}) {
  const sessionData = await getIronSession<UserSessionData>(
    cookies(),
    sessionOptions
  );

  if (isReturnPlainObject) {
    return getPlainObject<UserSessionData>(sessionData);
  }

  return sessionData;
}

export async function setSession(userSessionData: UserSessionData) {
  "use server";

  const sessionData = await getSession();

  Object.assign(sessionData, userSessionData);

  await sessionData.save();

  revalidatePath("/", "layout");
}

export async function clearSession() {
  "use server";

  const sessionData = await getSession();

  sessionData.destroy();

  revalidatePath("/", "layout");
  redirect("/sign-in");
}

export async function saveTokenInSession(newToken: string) {
  const sessionData = await getSession();

  sessionData.accessToken = newToken;

  await sessionData.save();

  revalidatePath("/", "layout");
}
