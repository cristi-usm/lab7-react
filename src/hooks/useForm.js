import { useContext } from 'react';
import { StateContext, DispatchContext } from '../context/FormContext';

export function useFormState() {
  const context = useContext(StateContext);
  if (!context) throw new Error('useFormState trebuie folosit în FormProvider');
  return context;
}

export function useFormDispatch() {
  const context = useContext(DispatchContext);
  if (!context) throw new Error('useFormDispatch trebuie folosit în FormProvider');
  return context;
}
