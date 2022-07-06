
import { Circle, CheckCircle, Trash } from 'phosphor-react';
import { useState } from 'react';
import styles from './styles.module.css';

interface TaskProps {
  id: string
  isCompleted: boolean,
  content: string,
  onDeleteTask: (taskToDeleteID: string) => void;
  onCheckCompletedTask: (taskToCheckId: string) => void;
}

export function Task({id, isCompleted=false, content,onCheckCompletedTask, onDeleteTask}: TaskProps) {
  const[checkedTask, setCheckedTask] = useState(false)

  function handleCheckCompletedTask() {
    event?.preventDefault();

    onCheckCompletedTask(id)
  }

  function handleDeleteTask() {
    event?.preventDefault();

    onDeleteTask(id)
  }

  return(
    <div className={styles.container}>
      <span onClick={handleCheckCompletedTask} >
        {
          isCompleted ? <CheckCircle size={18} color={'#5E60CE'} /> : <Circle size={18}  />
        }
      </span>
      <p className={isCompleted ? styles.taskCompleted : styles.taskIncompleted}>{content}</p>
      <button onClick={handleDeleteTask}>
        <Trash size={18} />
      </button>
    </div>
  )
};