import axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";

export default function ResetPass() {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const mySchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: mySchema,
    onSubmit: handleSubmit,
  });
  function handleSubmit(values, { resetForm }) {
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values)
      .then((res) => {
        console.log(res);
        if (res.data.statusMsg === "success") {
          toast.success("Reset Code has been sent to Inbox ✅✅✅", {
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
            navigate("/verifycode");
          }, 3000);
        }
      })
      .catch((err) => {
        setMsg(err.response.data.message);
      });
  }
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex max-w-md mx-auto mt-5 flex-col gap-4 shadow-lg p-4"
    >
      <h3 className="text-gray-600">Reset Password Form</h3>
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
