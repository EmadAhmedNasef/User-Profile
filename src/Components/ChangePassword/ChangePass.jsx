import { useFormik } from "formik";
import React, { useContext } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import axios from "axios";
import { userContext } from "../../Context/UserContext";

export default function ChangePass() {
  const { token } = useContext(userContext);
  function handleSubmit(values) {
    axios
      .put(
        "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
        values,
        {
          headers: {
            token: `${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.message === "success") {
          alert("Your password has been updated successfully");
        }
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data.message);
      });
  }

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    onSubmit: handleSubmit,
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex max-w-md mx-auto mt-5 flex-col gap-4 shadow-lg p-4"
    >
      <h3 className="text-gray-600">My Password Info</h3>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Your currentPassword" />
        </div>
        <TextInput
          id="name"
          name="currentPassword"
          type="password"
          value={formik.values.currentPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Your password" />
        </div>
        <TextInput
          id="email"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="phone" value="Your rePassword" />
        </div>
        <TextInput
          id="phone"
          name="rePassword"
          type="password"
          value={formik.values.rePassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
