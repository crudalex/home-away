import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const createProfileAction = async (formData: FormData) => {
  "use server";
  const firstName = formData.get("firstName");
  console.log(firstName);
};

function CreateProfilePage() {
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">
        new user
        <div className="border p-8 round-md max-w-lg ">
          <form action={createProfileAction}>
            <div className="mb-2 ">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" name="firstName" type="text" />
            </div>
            <Button type="submit" size="lg">
              Create Profile
            </Button>
          </form>
        </div>
      </h1>
    </section>
  );
}

export default CreateProfilePage;
