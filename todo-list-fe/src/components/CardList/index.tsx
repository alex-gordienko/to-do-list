import { TasksProps } from '../../hooks/useTaskList'
import Card from '../Card'

interface CardListProps { 
  tasks: TasksProps[]
  onDoneClicked: (id: number) => void
  onDeleteClicked: (id: number) => void
}

const CardList = ({tasks, onDeleteClicked, onDoneClicked}: CardListProps) => { 
  const renderListSummary = () => {
    const totalTasks = tasks.length
    const totalDoneTasks = tasks.filter((task) => task.status === 'done').length

    return (
      <div className="flex flex-row w-full justify-between">
        <h2 className="font-inter font-bold text-sm text-[#4EA8DE]">Tasks: {totalTasks}</h2>
        <h2 className="font-inter font-bold text-sm text-[#8284FA]">Done: {totalDoneTasks} of {totalTasks}</h2>
      </div>
    )
  }

  const renderTaskList = () => {
    return tasks.map((task) => {
      return (
        <Card
          key={task.id}
          id={task.id}
          title={task.title}
          color={task.color}
          status={task.status}
          createdAt={task.createdAt}
          onDeleteClicked={onDeleteClicked}
          onDoneClicked={onDoneClicked}
        />
      )
    })
  }

  return (
    <div className="flex w-full flex-col">
      {renderListSummary()}
      {renderTaskList()}
    </div>
  )
}

export default CardList;