"use server";
import { profileSchema } from "./schemas";

export const createProfileAction = async (
  preState: any,
  formData: FormData
) => {
  try {
    // const rawData = Object.fromEntries(formData.entries());
    const rawData = Object.fromEntries(formData);
    const validatedFields = profileSchema.parse(rawData);
    console.log(validatedFields);
    return { message: "profile created" };
  } catch (error) {
    console.log(error);
    return { message: "there was an error" };
  }
};
