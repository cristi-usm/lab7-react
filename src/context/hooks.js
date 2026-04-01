import { useContext } from "react";
import { StateContext, DispatchContext } from "./FormContext";

export function useFormState() {
  const context = useContext(StateContext);
  if (!context)
    throw new Error("useFormState must be used inside FormProvider");
  return context;
}

export function useFormDispatch() {
  const context = useContext(DispatchContext);
  if (!context)
    throw new Error("useFormDispatch must be used inside FormProvider");
  return context;
}
