import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import { loginService } from '../../service/AuthService';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Content() {
  
  const {login} = useAuth();
  const [errorMsg,setErrorMsg] = useState("");
  
  // const form = useForm();
  // const {register, handleSubmit,formState : {isSubmitting} ,reset} = form;

  const {register, handleSubmit, formState ,reset} = useForm();

  const {errors, isSubmitting} = formState;

  const navigate = useNavigate();

  const formSubmit = async (data)=>{
    

    const result = await loginService(data);

    if(result.status != 200)
    {
        setErrorMsg(result.message);
    }
    else if(result.status == 200)
    {
      setErrorMsg("")
      sessionStorage.setItem('token', result.token);
      
      login(result.role[0]);
      
      if(result.role[0] == 'ROLE_ADMIN')
        navigate('/admin')
      else if(result.role[0] == 'ROLE_USER')
        navigate('/user');
      else if(result.role[0] == 'ROLE_TEACHER')
        navigate('/teacher');
    }

    reset();
    
  }
  
  return (
    <div className='landing-content'>
      
      <div className="login-form">

        <h2 style={{"textAlign":"center"}}>Login</h2>
        <br />

        <p style={{textAlign:"center", color:"red"}}>{errorMsg}</p>
        <form onSubmit={handleSubmit(formSubmit)} noValidate>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Email address</label>
            <input type="text" className="form-control" id="username" name="username" autoComplete='off' aria-describedby="emailHelp"
              {...register("username", {
                  required:{
                              value : true,
                              message : 'Email id required'
                  }

              })}
            />
            <p className='error-message'>{errors.username?.message}</p>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" autoComplete="off"
               {...register("password", {
                required:{
                      value : true,
                      message :'Password is required'
                    ,}
               })}
            />
            <p className='error-message'>{errors.password?.message}</p>
          </div>
          
          <button type='submit' className="btn btn-primary" disabled={isSubmitting}>

               {
                  isSubmitting ? (

                    <>
                      <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                      <span role="status">Sign In</span>
                    </>

                  ) : ('Sign In') 
               }
              
            
            
            
          </button>
          <p>Don't have account? <Link to='/register'>Click to register</Link></p>
        </form>

      </div>


    </div>
  )
}
