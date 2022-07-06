import { ButtonHTMLAttributes, ChangeEvent, FormEvent, MouseEventHandler, useState } from 'react';
import  {v4 as uuidv4} from 'uuid';

import { CodesandboxLogo, Notepad, PlusCircle } from 'phosphor-react';
import { Task } from '../Task';

import styles from './styles.module.css';

type TaskProps = {
  id: string,
  content: string,
  isCompleted: boolean
}

export function TaskList() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [newTaskText, setNewTaskText] = useState('')

  function handleNewTaskContent(event: ChangeEvent<HTMLInputElement>) {
    event?.target.setCustomValidity('');
    setNewTaskText(event.target.value);
  }

  function handleTaskCreate(event :FormEvent) {
    event?.preventDefault();

    const newTask = {
      id: uuidv4(),
      content: newTaskText,
      isCompleted: false  
    }
    setTasks([...tasks, newTask])
    setNewTaskText('')


  };

  function handleCompletedTask(id: string) {
     const listWithCompletedTasks = tasks.map((task) => task.id === id ? {
      ...task, isCompleted: !task.isCompleted
    } : task);

    setTasks(listWithCompletedTasks);
    
  }; 

  function handleDeleteTask(taskToDeleteID: string) {
    const taskWithoutDeletedOne = tasks.filter((task) => {
      if (task.id != taskToDeleteID)
      return task
    })

    setTasks(taskWithoutDeletedOne);
   
  };

  const taskCounter = tasks.length;
  
  const completedTasksCounter = tasks.reduce((completedTasks=0, task) => {
    if( task.isCompleted === true) {
      completedTasks++
      return completedTasks
      

    } else {
      return completedTasks
    }
    
  }, 0);

   return (
    <div className={styles.content}>
      <header className={styles.header}>
        <form className={styles.form} onSubmit={handleTaskCreate}>
          <input 
            name='taksText'
            value={newTaskText}
            onChange={handleNewTaskContent}
            placeholder='Add a new task' 

            required
          />
          <button type='submit'>
            <span>Add <PlusCircle size={18}/></span>
          </button>
        </form>
      </header>

      <div className={styles.taskList}>
        <header><p className={styles.taksCounter}>Tasks <span>{taskCounter}</span></p>
        <p className={styles.finishedTasks}>Completed<span>{completedTasksCounter}</span> of
        <span>{taskCounter}</span></p></header>
        <main>
        {
          tasks.length <= 0  
          ? (
              <div className={styles.emptyList}>
                <Notepad size={56} />
                <p><strong>Nothing to show</strong></p>
                <p>A good time to add some tasks</p>
              </div>
            )
          :
            tasks.map((task) => (
              <Task key={task.id}
                id={task.id}
                content={task.content}
                isCompleted={task.isCompleted}
                onDeleteTask={() => handleDeleteTask(task.id)}
                onCheckCompletedTask={() => handleCompletedTask(task.id)}
              />
            ))
        }
        </main>
      </div>
    </div>
  )
}