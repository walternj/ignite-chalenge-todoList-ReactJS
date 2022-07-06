
import styles from './App.module.css'
import { Header } from './components/Header';
import { TaskList } from './components/TaskList';

function App() {

  return (
    <div className={styles.wrapper}>
     <Header/>
     <TaskList/>
    </div>
  )
}

export default App;
