import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Dropzone from './commons/Dropzone';

export default function CreateAssignment() {

    const {id} = useParams();

    const {register, handleSubmit, formState ,reset,control} = useForm();

    const {errors, isSubmitting} = formState;

    const formSubmit = (data)=>{
      
      console.log(data);

      console.log(data.pdf[0].name);


    }


  return (
    <div className='container'>
      

      <form onSubmit={handleSubmit(formSubmit)} noValidate>

          <div className="row">

            <div className="col-4">
               <label htmlFor="title" className="form-label">Title</label>
            
                <input type='text' className="form-control" id="title" name="title"
                       autoComplete="off" {...register("title", {
                                                                  required : {
                                                                                value: true,
                                                                                message: "Title is required",
                                                                },
                                          })}
                />
                <p className="error-message">{errors.title?.message}</p>
            </div>

            <div className="col-4"> 
                  <label htmlFor='description' className='form-label' >Description</label>
                  <textarea rows={4} cols={5}  className="form-control"
                            id="description" name="description" autoComplete="off"
                            {...register("description", {
                                                          required: {
                                                                        value:true,
                                                                        message: "Description is required",
                                                          },
                            })}
                  >            
                  </textarea>
                  <p className="error-message">{errors.description?.message}</p>

            </div>


            <div className="col-4">
               <label htmlFor="dueDate" className="form-label">Due date</label>
            
                <input type='date' className="form-control" id="dueDate" name="dueDate"
                       autoComplete="off" {...register("dueDate", {
                                                                  required : {
                                                                                value: true,
                                                                                message: "Due date is required",
                                                                },
                                          })}
                />
                <p className="error-message">{errors.dueDate?.message}</p>
            </div>

          </div>

          <div className='drop-zone mt-5'>
            <Controller
              name="pdf"
              control={control}
              rules={{ required: 'PDF file is required' }}

              render={({field, fieldState}) => (
                <Dropzone 
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error}
                />
              )}
            />
          </div>

          <div className='form-actions'>
              <button type='submit' className="btn btn-primary" >Submit</button>
              <button type="reset" className="btn btn-danger">Reset</button>
          </div>

      </form>

    </div>
  )
}
