// import React, { useState } from "react";
// import Header from "./header";
// import Footer from "./footer";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
// import { registerService } from "../../service/AuthService";

// export default function Register() {
//   const [errorMsg,setErrorMsg] = useState("");
//   const { register, handleSubmit, formState, reset } = useForm();
//   const { errors, isSubmitting } = formState;
//   const navigate = useNavigate();
//   const formSubmit = async (data) => {
//     const result=await registerService(data)
//     if(result.statusCode!=200){       
//         setErrorMsg(result.message);
//     }
//     else if(result.statusCode==200){
//         setErrorMsg(result.message);
//         navigate('/login');
//         console.log("xyz");
//     }
//     console.log(data);
//   };
//   return (
//     <>
//       <Header />
//       <div className="register-student">
//         <br />
//         <div className="register-form">
//           <h1 style={{ textAlign: "center" }}>Register Student</h1>
//           <p style={{textAlign:"center", color:"red"}}>{errorMsg}</p>
//           <form onSubmit={handleSubmit(formSubmit)}>
//             <div className="mb-3">
//               <label htmlFor="name" className="form-label">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="name"
//                 name="name"
//                 autoComplete="off"
//                 aria-describedby="nameHelp"
//                 {...register("name", {
//                   required: {
//                     value: true,
//                     message: "Name required",
//                   },
//                 })}
//               />
//               <p className="error-message">{errors.name?.message}</p>
//             </div>
//             <div className="mb-3">
//               <label htmlFor="email" className="form-label">
//                 Email
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="email"
//                 name="email"
//                 autoComplete="off"
//                 aria-describedby="emailHelp"
//                 {...register("email", {
//                   required: {
//                     value: true,
//                     message: "Email Id is required",
//                   },
//                 })}
//               />
//               <p className="error-message">{errors.email?.message}</p>
//             </div>
//             <div className="mb-3">
//               <label htmlFor="password" className="form-label">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 className="form-control"
//                 id="password"
//                 name="password"
//                 autoComplete="off"
//                 {...register("password", {
//                   required: {
//                     value: true,
//                     message: "Password is required",
//                   },
//                 })}
//               />
//               <p className="error-message">{errors.password?.message}</p>
//             </div>
//             <button
//               type="submit"
//               className="btn btn-primary"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? (
//                 <>
//                   <span
//                     className="spinner-border spinner-border-sm"
//                     aria-hidden="true"
//                   ></span>
//                   <span role="status">Register</span>
//                 </>
//               ) : (
//                 "Register"
//               )}
//             </button>
//             <p>Already have an account? <Link to='/login'>Login</Link></p>
//           </form>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }


import React, { useState } from "react";
import Header from "./header";
import Footer from "./footer";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { registerService } from "../../service/AuthService";
import "./landing.css";

export default function Register() {
  const [errorMsg, setErrorMsg] = useState("");
  const { register, handleSubmit, formState } = useForm();
  const { errors, isSubmitting } = formState;
  const navigate = useNavigate();

  const formSubmit = async (data) => {
    const result = await registerService(data);
    if (result.statusCode !== 200) {
      setErrorMsg(result.message);
    } else {
      setErrorMsg(result.message);
      navigate("/login");
    }
  };

  return (
    <>
      <Header />
      <div className="d-flex justify-content-center align-items-center register-wrapper">
        <div className="card shadow p-4 register-card">
          <h2 className="text-center mb-4">Student Registration</h2>
          {errorMsg && (
            <p className="text-danger text-center mb-3">{errorMsg}</p>
          )}
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-bold">
                Name
              </label>
              <input
                type="text"
                id="name"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                autoComplete="off"
                {...register("name", {
                  required: "Name is required",
                })}
              />
              <div className="invalid-feedback">{errors.name?.message}</div>
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-bold">
                Email
              </label>
              <input
                type="email"
                id="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                autoComplete="off"
                {...register("email", {
                  required: "Email is required",
                })}
              />
              <div className="invalid-feedback">{errors.email?.message}</div>
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form-label fw-bold">
                Password
              </label>
              <input
                type="password"
                id="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                autoComplete="off"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <div className="invalid-feedback">
                {errors.password?.message}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </button>

            <p className="mt-3 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-decoration-none">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
