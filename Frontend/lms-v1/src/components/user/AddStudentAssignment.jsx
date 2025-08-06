import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAssignmentDetailsByAssignmentIdService, getSubmittedAssignmentStatusService, submitStudentAssignmentService } from "../../service/AssignmentService";
import { Controller, useForm } from "react-hook-form";
import UserDropZone from "./UserDropZone";

export default function AddStudentAssignment() {
  const { id, assignmentid } = useParams();

  const [assignment, setAssignment] = useState({});
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertColor, setAlertColor] = useState(false);
  const [statusDialog,setStatusDialog] = useState(false);
  const [statusDto, setStatusDto] = useState({});
  const [assignmentImg, setAssignmentImg] = useState("");

  const { register, handleSubmit, formState, reset, control } = useForm();

  const { errors, isSubmitting } = formState;


   const submittedAssignmentStatus = async ()=>{

      const result = await getSubmittedAssignmentStatusService(assignmentid);

      console.log("Assignment submission status : ",result)

      if(result.statusCode == 200)
      {
          setStatusDialog(true);
          setStatusDto(result.data);

          if(result.data.filetype == "pdf")
          {
            setAssignmentImg("pdf-icon.png")
          }
          else 
          {
            setAssignmentImg("zip-icon.png");
          }

      }
      

    }

  const formSubmit = async (data) => {
    console.log(data);
    console.log("File name : ",data.assignment[0].name);

    const formData = new FormData();

    const assignmentSubmissionDto = {
      classroomId : id , 
      assignmentId : assignmentid,
      filename : data.assignment[0].name
    }

    formData.append('assignmentDto', new Blob(
          [JSON.stringify(assignmentSubmissionDto)],
          { type: 'application/json' }
    ));

    formData.append('assignment', data.assignment[0]);

    const result = await submitStudentAssignmentService(formData);

    console.log("Response : "+result);

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
        submittedAssignmentStatus();
     }


  }


  useEffect(() => {
    const getAssigmentDetailsByAssignmentId = async () => {
      const result = await getAssignmentDetailsByAssignmentIdService(assignmentid);

      console.log("Assignment Details : ", result);

      setAssignment(result);
    };

    getAssigmentDetailsByAssignmentId();

    submittedAssignmentStatus();

  }, []);

  return (
    <div>
      <div className="container mt-2">
       


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

        <div className="main-container">
          <div className="container">
            <h3>Title : {assignment.title}</h3>
            <p>Description : {assignment.description}</p>
            <p>Due Date : {assignment.dueDate}</p>
            <p>Marks : {assignment.marks}</p>

            <a
              href={`http://localhost:8093/api/v1/download-assignment/${assignmentid}`}
            >
              <img src="/icons/pdf-icon.png" width="50px" height="50px" />{" "}
              Assignment.pdf
            </a>
          </div>

          
          {
            !statusDialog && (

          <div className="container">
            <h3>Add Submission</h3>
            <form onSubmit={handleSubmit(formSubmit)} noValidate>
              <div className="drop-zone mt-5">
                <Controller
                  name="assignment"
                  control={control}
                  rules={{ required: "File is required" }}
                  render={({ field, fieldState }) => (
                    <UserDropZone
                      value={field.value}
                      onChange={field.onChange}
                      error={fieldState.error}
                    />
                  )}
                />
              </div>
              <div className="form-actions">
                  <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>

            )
            
          }
          



          {
              statusDialog && (

                <div className="container">
                    
                    <p><b>Status :</b> { statusDto.status == "D" ? (<span style={{color:"#ff9800"}}><b>Pending</b></span>) 
                                                          : (<span style={{color:"green"}}><b>Approved</b></span>)}
                    </p>
                    <p><b>Marks :</b> {statusDto.marks}</p>
                    <p><b>Submitted On : </b> {statusDto.submissionDate}</p>
                    
                    
                    <div className='file-data'>
                      <img className='pdf-icon' src={`/icons/${assignmentImg}`} alt="pdf-icon" />
                      <a href={`http://localhost:8093/api/v1/download-submitted-assignment/${statusDto.submissionId}`}>
                          <p>{statusDto.filename}</p>
                      </a>
                    </div>
                </div>

              )
          }
         

        </div>
      </div>
    </div>
  );
}
