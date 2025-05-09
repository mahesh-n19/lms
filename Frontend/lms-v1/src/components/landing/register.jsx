import React, { useState } from "react";
import Header from "./header";
import Footer from "./footer";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerService } from "../../service/AuthService";

export default function Register() {
  const [errorMsg,setErrorMsg] = useState("");
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors, isSubmitting } = formState;
  const navigate = useNavigate();
  const formSubmit = async (data) => {
    const result=await registerService(data)
    if(result.statusCode!=200){       
        setErrorMsg(result.message);
    }
    else if(result.statusCode==200){
        setErrorMsg(result.message);
        navigate('/login');
        console.log("xyz");
    }
    console.log(data);
  };
  return (
    <>
      <Header />
      <div className="register-student">
        <br />
        <div className="register-form">
          <h1 style={{ textAlign: "center" }}>Register Student</h1>
          <p style={{textAlign:"center", color:"red"}}>{errorMsg}</p>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                autoComplete="off"
                aria-describedby="nameHelp"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name required",
                  },
                })}
              />
              <p className="error-message">{errors.username?.message}</p>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                autoComplete="off"
                aria-describedby="emailHelp"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email Id is required",
                  },
                })}
              />
              <p className="error-message">{errors.username?.message}</p>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                autoComplete="off"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                })}
              />
              <p className="error-message">{errors.username?.message}</p>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    aria-hidden="true"
                  ></span>
                  <span role="status">Register</span>
                </>
              ) : (
                "Register"
              )}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
