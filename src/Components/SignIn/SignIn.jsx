import axios from "axios";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import { userContext } from "../../Context/UserContext";

export default function SignIn() {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { token, setToken, user, setUser } = useContext(userContext);
  const mySchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
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
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((res) => {
        if (res.data.message === "success") {
          toast.success("You have Signedin Successfully ✅✅✅", {
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
            navigate("/");
          }, 3000);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          setToken(res.data.token);
          setUser(res.data.user);
        }
      })
      .catch((err) => {
        console.log(err);
        setMsg(err.response.data.message);
      });
    console.log(values);
    resetForm();
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex max-w-md mx-auto mt-5 flex-col gap-4 shadow-lg p-4"
    >
      <h3 className="text-gray-600">Login Form</h3>
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
          <Label htmlFor="password" value="Your password" />
        </div>
        <TextInput
          id="password"
          type="password"
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
          <p className="text-red-700 text-xs mt-3">{formik.errors.password}</p>
        ) : null}
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember">Remember me</Label>
      </div>
      <Link to="/resetpass">
        <p className="text-blue-600 text-sm">Forget password?</p>
      </Link>
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
