const STORAGE_KEY = 'VodniZdroje.app';

let prevState: any;

export const saveState = (state: any) => {
  if (state === prevState) {
    return;
  }
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
    prevState = state;
  } catch (error) {
    return;
  }
};

export const loadState = (): any => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);

    if (serializedState) {
      return JSON.parse(serializedState);
    }
  } catch (error) {
    return undefined;
  }

  return undefined;
};
