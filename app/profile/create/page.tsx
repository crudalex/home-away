import React from "react";

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
          <form action={createProfileAction}></form>
        </div>
      </h1>
    </section>
  );
}

export default CreateProfilePage;
