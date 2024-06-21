import { Button, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { userContext } from "../../Context/UserContext";
import axios from "axios";
import { Helmet } from "react-helmet";

export default function Profile() {
  const [myMsg, setMsg] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const { user, setUser, token } = useContext(userContext);
  const formik = useFormik({
    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    },
    onSubmit: handleSubmit,
  });

  function handleSubmit(values) {
    axios
      .put("https://ecommerce.routemisr.com/api/v1/users/updateMe/", values, {
        headers: {
          token: `${token}`,
        },
      })
      .then((res) => {
        if (res.data.message === "success") {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          setUser(res.data.user);
          setIsDisabled(true);
          toast.success("You have updated your info ✅✅✅", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setMsg(err.response.data.errors.msg);
      });
    console.log(values);
  }

  function handleDisabled() {
    setIsDisabled(false);
  }

  useEffect(() => {
    if (user) {
      formik.setValues({
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
      });
    }
  }, [user]);

  return (
    <>
      <Helmet>
        <title>Profile - page</title>
      </Helmet>
      <form
        onSubmit={formik.handleSubmit}
        className="flex max-w-md mx-auto mt-5 flex-col gap-4 shadow-lg p-4"
      >
        <h3 className="text-gray-600">Info Form</h3>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Your Name" />
          </div>
          <TextInput
            id="name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isDisabled}
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
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isDisabled}
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
            <Label htmlFor="phone" value="Your Phone" />
          </div>
          <TextInput
            id="phone"
            type="tel"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isDisabled}
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
        {myMsg && <p className="text-red-600 text-xs text-center">{myMsg}</p>}
        <Button type="submit">Submit</Button>
        <Button disabled={!isDisabled} onClick={handleDisabled}>
          Edit
        </Button>

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
    </>
  );
}
