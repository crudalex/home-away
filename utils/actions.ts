"use server";

import { profileSchema } from "./schemas";
import db from "./db";
import { auth, clerkClient, currentUser, getAuth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { actionFunction } from "./types";

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) throw new Error("You must be logged in to create a profile");
  if (!user.privateMetadata.hasProfile) redirect("/profile/create"); // preliminary check based on the user's metadata

  return user;
};

const renderError = (error: unknown): { message: string } => {
  console.log(error);
  return {
    message: error instanceof Error ? error.message : "an error occurred",
  };
};
export const createProfileAction = async (
  preState: any,
  formData: FormData
) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("You must be logged in to create a profile");

    // const rawData = Object.fromEntries(formData.entries());
    const rawData = Object.fromEntries(formData);
    const validatedFields = profileSchema.parse(rawData);
    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? "",
        ...validatedFields,
      },
    });
    await clerkClient.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });
  } catch (error) {
    return renderError(error);
  }
  redirect("/");
};

export const fetchProfileImage = async () => {
  const user = await currentUser();
  if (!user) return null;
  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
    select: {
      profileImage: true,
    },
  });
  return profile?.profileImage;
};

export const fetchProfile = async () => {
  const user = await getAuthUser();
  const profile = db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
  });
  if (!profile) throw new Error("Profile not found"); // check based on the actual existence of the profile in the database
  return profile;
};

export const updateProfileAction: actionFunction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = profileSchema.safeParse(rawData);
    if (!validatedFields.success) {
      const errors = validatedFields.error.errors.map((error) => error.message);
      throw new Error(errors.join(", "));
    }

    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: validatedFields.data,
    });
    revalidatePath("/profile");
    return { message: "Profile updated successfully" };
  } catch (error) {
    return renderError(error);
  }
};
