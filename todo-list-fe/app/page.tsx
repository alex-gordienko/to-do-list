'use client'
import CardList from '../src/components/CardList';
import Link from 'next/link'

import '../styles/global.css'
import useTaskList from '../src/hooks/useTaskList';

const Home = () => {
  const { taskList, updateTaskStatus, deleteTask } = useTaskList();

  const handleDoneTask = async (id: number) => { 
    console.log('Done button clicked', id);
    const task = taskList.find((task) => task.id === id);
    if (task) {
      const newStatus = task.status === 'done' ? 'inProgress' : 'done';
      await updateTaskStatus(id, newStatus);
    }
  }
  const handleDeleteTask = async (id: number) => { 
    console.log('Delete button clicked', id);
    await deleteTask(id);
  }
  return (
    <>
      <Link
        className="font-inter w-full h-12 bg-[#1E6F9F] text-white text-sm rounded-lg mt-[-25px] hover:bg-[#64A7D9] flex items-center justify-center"
        href="/create"
      >
        Create Task 
      </Link>
      <div className="mt-16 flex w-full">
        <CardList tasks={taskList} onDeleteClicked={handleDeleteTask} onDoneClicked={handleDoneTask} />
      </div>
    </>
  );
}

export default Home;