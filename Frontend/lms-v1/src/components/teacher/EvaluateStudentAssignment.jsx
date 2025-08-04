import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { evaluateSubmissionBySubmissionId, getSubmissionDetailsBySubmissionIdService } from '../../service/AssignmentService';
import { useForm } from 'react-hook-form';

export default function EvaluateStudentAssignment() {

  const {id,submissionid} = useParams();

  const [submissionDetails, setSubmissionDetails] = useState({});

  
    const [alert, setAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const [alertColor, setAlertColor] = useState(false);

  const { register, handleSubmit,setValue, formState, reset } = useForm();
  const { errors, isSubmitting } = formState;


  const formSubmit = async (data) => {

    const result = await evaluateSubmissionBySubmissionId(submissionid, data.marks);

    console.log("After submit : ",result.data);

    if(result.statusCode != 200)
    {
        setAlert(true);
        setAlertMsg(result.message);
        setAlertColor(false);
    }
    else 
    {
        
        setAlert(true);
        setAlertMsg(result.message);
        setAlertColor(true);
        reset();
    }

  }

  const getSubmissionDetailsBySubmissionId = async ()=>{

    const result = await getSubmissionDetailsBySubmissionIdService(submissionid);

    console.log("Submission Details : ",result.data);
    setSubmissionDetails(result.data);

  }

  useEffect(()=>{

    getSubmissionDetailsBySubmissionId();

  },[]);
  return (
    <div>
      
      {alert && (
        <div
          className={
            alertColor
              ? "alert alert-success alert-dismissible fade show"
              : "alert alert-danger alert-dismissible fade show"
          }
          role="alert"
        >
          {alertMsg}
          <button
            type="button"
            onClick={() => setAlert(false)}
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}

        <div className='container'>

          <p><b>Student Name :</b> {submissionDetails.name}</p>
          <p><b>Submitted On :</b> {submissionDetails.submissionDate}</p>
          <p><b>Max Marks :</b> {submissionDetails.maxMarks}</p>

          {
              submissionDetails.fileType == 'pdf' ? (
                <a href={`http://localhost:8093/api/v1/download-submitted-assignment/${submissionid}`}>
                
                <img src="/icons/pdf-icon.png"  width="50px" height="50px"/> {submissionDetails.fileName}

              </a>
              ) : (
                    <a href={`http://localhost:8093/api/v1/download-submitted-assignment/${submissionid}`}>
                
                    <img src="/icons/zip-icon.png"  width="50px" height="50px"/> {submissionDetails.fileName}

              </a>
              )
          }

        </div>

        <div className='container'>

          {

              submissionDetails?.maxMarks != null && (

          <form onSubmit={handleSubmit(formSubmit)} noValidate>
            <div className="row">
              <div className="col-4">
                  <label htmlFor="marks" className="form-label">Marks</label>
             
                  <input
                    type="number"
                    className="form-control"
                    min={0}
                    max={submissionDetails?.maxMarks}
                    id="marks"
                    name="marks"
                    {...register("marks", {
                      required: {
                        value: true,
                        message: "marks are required",
                      },
                    })}
                  />
                <p className="error-message">{errors.marks?.message}</p>
               </div>
               <div className='col-4' style={{display:"flex", gap:"15px", alignItems:"center"}}>
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button type="reset" className="btn btn-danger">Reset</button>
               </div>
            </div>
          </form>

              )

          }
          

        </div>

    </div>
  )
}
