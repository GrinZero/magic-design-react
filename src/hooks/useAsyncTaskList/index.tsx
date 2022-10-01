import { useRef } from 'react';

type AsyncTaskFrom = 'normal' | 'clear';
type AsyncTaskItem = (from?: AsyncTaskFrom) => unknown;
type AsyncTask = [NodeJS.Timeout, AsyncTaskItem | null];

const useAsyncTaskList = (): [
  (task: AsyncTaskItem, delay: number) => void,
  (runAction?: boolean) => void,
  () => AsyncTask[],
] => {
  const tasks = useRef<Record<number, AsyncTask>>({});

  const clearTasks = (runAction = true) => {
    for (const [timeID, action] of Object.values(tasks.current)) {
      clearTimeout(timeID);
      runAction && action?.('clear');
    }
    tasks.current = {};
  };
  const addTask = (task: AsyncTaskItem, delay: number) => {
    const key = ~~(Math.random() * 1000) + Date.now();
    const action = (from: AsyncTaskFrom = 'normal') => {
      task(from);
      delete tasks.current[key];
    };
    const timeID = setTimeout(action, delay);
    tasks.current[key] = [timeID, action];
  };

  return [addTask, clearTasks, () => Object.values(tasks.current)];
};

export default useAsyncTaskList;
