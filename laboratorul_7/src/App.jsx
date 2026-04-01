import { FormProvider, useFormState, useFormDispatch } from "./context/FormContext";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Review from "./components/Review";
import Preview from "./components/Preview";
import Stepper from "./components/Stepper";
import { valideazaPas } from "./context/Validare";
import "./index.css";

function Form() {
  const { pasCurent, valori } = useFormState();
  const dispatch = useFormDispatch();

  const next = () => {
    const errors = valideazaPas(pasCurent, valori);
    dispatch({ type: "SET_ERRORS", errors });

    if (Object.keys(errors).length === 0) {
      dispatch({ type: "SET_STEP", step: pasCurent + 1 });
    }
  };

  const back = () => {
    dispatch({ type: "SET_STEP", step: pasCurent - 1 });
  };

  return (
    <div className="container">
  <div className="form">
    <Stepper />

    {pasCurent === 1 && <Step1 />}
    {pasCurent === 2 && <Step2 />}
    {pasCurent === 3 && <Step3 />}
    {pasCurent === 4 && <Review />}

    <div className="buttons">
      <button onClick={back} disabled={pasCurent === 1}>Back</button>
      {pasCurent < 4 && <button onClick={next}>Next</button>}
    </div>
  </div>

  <Preview />
</div>
  );
}

export default function App() {
  return (
    <FormProvider>
      <Form />
    </FormProvider>
  );
}