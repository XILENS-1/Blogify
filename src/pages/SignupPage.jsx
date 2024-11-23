import { registerUser } from "@/api/api"; 
import { addUser } from "@/store/userSlice"; 
import { useFormik } from "formik"; 
import React, { useState } from "react"; 
import { useDispatch } from "react-redux"; 
import { useNavigate } from "react-router-dom"; 
import * as Yup from "yup"; 

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required("Confirm password is required"),
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {

      const dataToSubmit = {
        username: values.name, 
        email: values.email,
        password: values.password,
      };
 const handleSubmit = async (values) => {
    console.log(values);
    try {
      setSubmitting(true);
      const response = await registerUser(values);
      const { token } = response.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      formik.resetForm();
      setSubmitting(false);
      navigate("/home");
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };
     
      console.log("Sending data to backend:", dataToSubmit);

    
      const response = await registerUser(dataToSubmit);
      const data = response.data;
      const { user, token } = data;

     
      dispatch(addUser({ id: user.id, token }));

    
      navigate("/"); 
      console.log("Signup successful:", data);
    } catch (error) {

      console.error("Signup failed:", error.response ? error.response.data : error.message);

     
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="mt-12 flex items-center justify-center">
      <div className="bg-white p-8 w-96 rounded-lg shadow-lg">
        <h1 className="text-xl font-semibold mb-8 text-center">Create Account</h1>
        <form onSubmit={formik.handleSubmit}>
          {/* Full Name */}
          <div className="mb-4">
            <label className="block mb-1" htmlFor="name">Full Name</label>
            <input
              className="border p-2 rounded outline-none w-full"
              type="text"
              id="name"
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.name}
              </div>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1" htmlFor="email">Email</label>
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

          {/* Password */}
          <div className="mb-4">
            <label className="block mb-1" htmlFor="password">Password</label>
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

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block mb-1" htmlFor="confirmPassword">Confirm Password</label>
            <input
              className="border p-2 rounded outline-none w-full"
              type="password"
              id="confirmPassword"
              {...formik.getFieldProps("confirmPassword")}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.confirmPassword}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`bg-red-500 p-2 w-full text-semibold text-white rounded hover:bg-red-500/90 ${isLoading ? 'cursor-not-allowed opacity-60' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
