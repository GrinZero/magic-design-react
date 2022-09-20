import { useRef } from 'react';

type AsyncTask = [number | undefined, (() => unknown) | null];

const useAsyncTaskList = (): [
  (task: () => unknown, delay: number) => void,
  (runAction?: boolean) => void,
  AsyncTask[],
] => {
  const tasks = useRef<Record<number, AsyncTask>>({});

  const clearTasks = (runAction = true) => {
    for (const [timeID, task] of Object.values(tasks.current)) {
      clearTimeout(timeID);
      runAction && task?.();
    }
    tasks.current = {};
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
