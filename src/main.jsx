import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { FormProvider } from "./context/FormContext";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FormProvider>
      <App />
    </FormProvider>
  </StrictMode>,
);
