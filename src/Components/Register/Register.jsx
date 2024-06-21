import axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";

export default function Register() {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const mySchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Repassword is required"),
    phone: Yup.string().required("Phone is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: mySchema,
    onSubmit: handleSubmit,
  });

  function handleSubmit(values, { resetForm }) {
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((response) => {
        console.log(response);
        if (response.data.message === "success") {
          toast.success("You have been registered Successfully ✅✅✅", {
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
          }, 2500);
          resetForm();
        }
      })
      .catch((err) => {
        setMsg(err.response.data.message);
      });
  }

  return (
    <>
      <Helmet>
        <title>Register - page</title>
      </Helmet>
      <form
        onSubmit={formik.handleSubmit}
        className="flex max-w-md mx-auto mt-5 flex-col gap-4 shadow-lg p-4"
      >
        <h3 className="text-gray-600">Register Form</h3>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Your Name" />
          </div>
          <TextInput
            id="name"
            type="text"
            placeholder="John Doe"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`${
              formik.errors.name && formik.touched.name
                ? "border-red-600 border-2 rounded-lg"
                : ""
            }`}
          />
          {formik.errors.name && formik.touched.name ? (
            <p className="text-red-700 text-xs mt-3">{formik.errors.name}</p>
          ) : null}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput
            id="email"
            type="email"
            placeholder="name@flowbite.com"
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
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput
            id="password"
            type="password"
            placeholder="********"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`${
              formik.errors.password && formik.touched.password
                ? "border-red-600 border-2 rounded-lg"
                : ""
            }`}
          />
          {formik.errors.password && formik.touched.password ? (
            <p className="text-red-700 text-xs mt-3">
              {formik.errors.password}
            </p>
          ) : null}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="rePassword" value="Repassword" />
          </div>
          <TextInput
            id="rePassword"
            type="password"
            placeholder="*********"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`${
              formik.errors.rePassword && formik.touched.rePassword
                ? "border-red-600 border-2 rounded-lg"
                : ""
            }`}
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <p className="text-red-700 text-xs mt-3">
              {formik.errors.rePassword}
            </p>
          ) : null}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="phone" value="Your Phone" />
          </div>
          <TextInput
            id="phone"
            type="tel"
            placeholder="01020304050"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`${
              formik.errors.phone && formik.touched.phone
                ? "border-red-600 border-2 rounded-lg"
                : ""
            }`}
          />
          {formik.errors.phone && formik.touched.phone ? (
            <p className="text-red-700 text-xs mt-3">{formik.errors.phone}</p>
          ) : null}
        </div>
        {msg && <p className="text-red-600 text-sm text-center">{msg}</p>}
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
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}
