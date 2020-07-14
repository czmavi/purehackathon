// tslint:disable: no-console
const logger = (store: { getState: () => void; }) => (next: (arg0: any) => void) => (action: { type: any; }) => {
  console.group(action.type);
  console.info('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result;
};

export default logger;
