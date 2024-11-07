import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import { Sub } from "@radix-ui/react-dropdown-menu";
import React from "react";

const createProfileAction = async (preState: any, formData: FormData) => {
  "use server";
  const firstName = formData.get("firstName");
  if (firstName !== "shakeAndBake") return { message: "There was an error..." };
  return { message: "Profile created" };
};

function CreateProfilePage() {
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">
        New User
        <div className="border p-8 round-md">
          <FormContainer action={createProfileAction}>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <FormInput type="text" name="firstName" label="First Name" />
              <FormInput type="text" name="lastName" label="Last Name" />
              <FormInput type="text" name="username" label="Username" />
            </div>
            <SubmitButton text="Create Profile" className="mt-8" />
          </FormContainer>
        </div>
      </h1>
    </section>
  );
}

export default CreateProfilePage;
