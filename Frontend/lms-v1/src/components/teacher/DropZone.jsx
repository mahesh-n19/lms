import React, { useCallback } from 'react'
import {useDropzone} from 'react-dropzone' 


export default function DropZone({value,onChange,error}) {

    const onDrop = useCallback((files)=>{
        console.log(files);
        onChange(files);
    },[onChange]);


    const {getRootProps,getInputProps,isDragActive,acceptedFiles,fileRejections} = useDropzone({onDrop,
        maxFiles:1,multiple:false,
    })

    const files=acceptedFiles.map((file,index)=>{
        return (
            <div className='file-date' key={index}>
                <p>{file.name}-{file.size}</p>
            </div>
        )
    })

    return (
    <div className='container'>
        <div className='file-container'>
            <div className='root-file' {...getRootProps()}>
                <input {...getInputProps()} />
                    {
                        isDragActive ? <p>Drop the files here</p>
                                     :  <p>Drag and drop some files here,or click to select file</p>
                    }
            </div>
        </div>
        <div>
            {files}
        </div>
        
    </div>
  )
}
