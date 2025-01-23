"use client";
import { useState, useEffect } from "react";
import { mockData } from "./mockData";

export interface TasksProps {
  id: number;
  title: string;
  color: string;
  status: "inProgress" | "done";
  createdAt: string;
}

const useTaskList = () => {
  const [taskList, setTaskList] = useState<TasksProps[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetch(`http://${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setTaskList(data);
    } catch (error) {
      console.error("Error fetching data", error);
      setTaskList(mockData);
    }
  };

  const createTask = async (title: string, color: string) => { 
    try {
      await fetch(`http://${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, color }),
      });
      await fetchData();
    } catch (error) {
      console.error("Error creating task", error);
    }
  }

  const updateTaskStatus = async (id: number, status: "inProgress" | "done") => { 
    try {
      await fetch(`http://${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      await fetchData();
    } catch (error) {
      console.error("Error updating task status", error);
    }
  }

  const editTask = async (id: number, title: string, color: string) => { 
    try {
      await fetch(`http://${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, color }),
      });
      await fetchData();
    } catch (error) {
      console.error("Error updating task", error);
    }
  }

  const deleteTask = async (id: number) => {
    try {
      await fetch(`http://${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      await fetchData();
    } catch (error) {
      console.error("Error deleting task", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [taskList.length]);

  return {
    taskList,
    getTasks: fetchData,
    createTask,
    updateTaskStatus,
    editTask,
    deleteTask,
  };
};

export default useTaskList;
