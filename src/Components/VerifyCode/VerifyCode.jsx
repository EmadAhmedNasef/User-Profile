import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { Label, TextInput, Button } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function VerifyCode() {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const mySchema = Yup.object().shape({
    resetCode: Yup.string().required("Code is required"),
  });

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: mySchema,
    onSubmit: handleSubmit,
  });

  function handleSubmit(values) {
    axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      )
      .then((res) => {
        if (res.data.status === "Success") {
          toast.success("Code is correct ✅✅✅", {
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
            navigate("/updatepass");
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
        setMsg(err.response.data.message);
      });
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex max-w-md mx-auto mt-5 flex-col gap-4 shadow-lg p-4"
    >
      <h3 className="text-gray-600">Verify Code Form</h3>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="code" value="Your Reset Code" />
        </div>
        <TextInput
          id="code"
          type="text"
          name="resetCode"
          value={formik.values.resetCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`${
            formik.errors.resetCode && formik.touched.resetCode
              ? "border-red-600 border-2 rounded-lg"
              : ""
          }`}
        />
        {formik.errors.resetCode && formik.touched.resetCode ? (
          <p className="text-red-700 text-xs mt-3">{formik.errors.resetCode}</p>
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
