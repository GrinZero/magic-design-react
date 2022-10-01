import { useState } from 'react';

type UseUpdateReturn = [() => void, number];

const useUpdate = (): UseUpdateReturn => {
  const [updateFlag, setUpdateFlag] = useState(1);
  return [
    () => {
      setUpdateFlag((prev) => prev + 1);
    },
    updateFlag,
  ];
};

export default useUpdate;
