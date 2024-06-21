import axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";

export default function UpdatePass() {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const mySchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    newPassword: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: mySchema,
    onSubmit: handleSubmit,
  });

  function handleSubmit(values) {
    axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
      .then((res) => {
        if (res.statusText === "OK") {
          toast.success("Password has been updated successfully ✅✅✅", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
        setMsg(err.response.data.message);
      });
    console.log(values);
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex max-w-md mx-auto mt-5 flex-col gap-4 shadow-lg p-4"
    >
      <h3 className="text-gray-600">Update Password Form</h3>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Your email" />
        </div>
        <TextInput
          id="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`${
            formik.errors.email && formik.touched.email
              ? "border-red-600 border-2 rounded-lg"
              : ""
          }`}
        />
        {formik.errors.email && formik.touched.email ? (
          <p className="text-red-700 text-xs mt-3">{formik.errors.email}</p>
        ) : null}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Your new password" />
        </div>
        <TextInput
          id="password"
          type="password"
          name="newPassword"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`${
            formik.errors.newPassword && formik.touched.newPassword
              ? "border-red-600 border-2 rounded-lg"
              : ""
          }`}
        />
        {formik.errors.newPassword && formik.touched.newPassword ? (
          <p className="text-red-700 text-xs mt-3">
            {formik.errors.newPassword}
          </p>
        ) : null}
      </div>
      {msg && <p className="text-red-600 text-xs text-center">{msg}</p>}
      <Button type="submit">Submit</Button>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </form>
  );
}
