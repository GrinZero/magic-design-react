import { useRef, useState } from 'react';

type AsyncTask = [number | undefined, (() => unknown) | null];

const useAsyncTaskList = (): [(task: () => unknown, delay: number) => void, () => void, AsyncTask[]] => {
  const tasks = useRef<Record<number, AsyncTask>>({});
  const [update, setUpdate] = useState(0);

  const clearTasks = () => {
    for (const [timeID, task] of Object.values(tasks.current)) {
      clearTimeout(timeID);
      task?.();
    }
    tasks.current = {};
    setUpdate(update + 1);
  };
  const addTask = (task: () => unknown, delay: number) => {
    const key = ~~(Math.random() * 1000) + Date.now();
    const action = () => {
      task();
      delete tasks.current[key];
    };
    const timeID = setTimeout(action, delay);
    tasks.current[key] = [timeID, action];
  };

  return [addTask, clearTasks, Object.values(tasks.current)];
};

export default useAsyncTaskList;
