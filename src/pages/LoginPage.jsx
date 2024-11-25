import { loginUser } from "@/api/api";
import { addUser } from "@/store/userSlice";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";


const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);

    try {
      
      const response = await loginUser(values);
      const data = response.data;
      const { user, token } = data;

      // /jwt toeken/ 
      localStorage.setItem("authToken", token); 

      
      dispatch(addUser({ id: user.id, token }));

    
      navigate("/");

      console.log(data); 
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="mt-24 flex items-center justify-center">
      <div className="bg-white p-8 w-96 rounded-lg shadow-lg">
        <h1 className="text-xl font-semibold mb-8 text-center">Welcome Back</h1>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label className="block mb-1" htmlFor="email">
              Email
            </label>
            <input
              className="border p-2 rounded outline-none w-full"
              type="email"
              id="email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="password">
              Password
            </label>
            <input
              className="border p-2 rounded outline-none w-full"
              type="password"
              id="password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>
          <button
            type="submit"
            className={`bg-red-500 p-2 w-full text-semibold text-white rounded hover:bg-red-500/90 ${
              isLoading ? "cursor-not-allowed opacity-60" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
