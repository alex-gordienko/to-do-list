'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextField } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useTaskList from "../../src/hooks/useTaskList";

import '../../styles/global.css'
import { availableColors } from "../../src/constants";

const CreateTask = () => {
  const { taskList, createTask } = useTaskList();
  const router = useRouter();

  // simple validation instead of using formik or yup
  const [validationError, setValidationError] = useState<string | null>(null);

  const [formValue, setFormValue] = useState({title: '', color: availableColors.RED})

  const handleBackClick = () => {  
    router.replace('/');
  };

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setFormValue({ ...formValue, title: e.target.value });
    
    const isTitleEmpty = e.target.value === '';
    const similarTask = taskList.some((task) => task.title === e.target.value && task.status === 'inProgress');

    if (isTitleEmpty) {
      setValidationError('Title is empty');
    } else if (similarTask) { 
      setValidationError('Task already exists');
    } else {
      setValidationError(null);
    }
  }

  const handleSubmit = async () => { 
    await createTask(formValue.title, formValue.color);
    router.replace('/');
  }

  return (
    <div className="w-full flex flex-col items-start p-4">
      <div className="w-full flex justify-start items-center my-4">
        <button className="text-white" onClick={handleBackClick}>
          <ArrowBackIcon />
        </button>
      </div>
      <div className="w-full flex flex-col justify-center items-start mb-4">
        <span className="font-inter font-bold text-sm text-blue-500 mb-2">Title</span>
        <TextField
          required
          error={!!validationError}
          helperText={validationError}
          className="w-full bg-[#262626] border border-gray-700 rounded-lg"
          InputProps={{
          style: {
            color: '#FFFFFF'
          }
          }}
          id="outlined-required"
          label="Title"
          placeholder="Ex. Brush your teeth"
          value={formValue.title}
          onChange={handleLabelChange}
        />
      </div>
      <div className="w-full flex flex-col justify-center items-start my-4">
        <span className="font-inter font-bold text-sm text-blue-500 mb-2">Color</span>
        <div className="flex justify-center items-center">
          {Object.values(availableColors).map((color) => (
          <div
            key={color}
            className={`w-12 h-12 rounded-full mx-2 cursor-pointer ${formValue.color === color ? 'border-2 white' : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => setFormValue({ ...formValue, color })}
          />
          ))}
        </div>
      </div>
      <div className="w-full mt-[2rem]">
        <button
          className="w-full h-[52px] bg-[#1E6F9F] text-white font-bold text-sm rounded-lg p-2"
          disabled={!!validationError}
          onClick={handleSubmit}
        >
          Create Task
        </button>
      </div>
    </div>
  )
}

export default CreateTask