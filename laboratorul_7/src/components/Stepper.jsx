import { useFormState } from "../context/FormContext";

export default function Stepper() {
  const { pasCurent } = useFormState();

  return (
    <div className="stepper">
  {[1,2,3,4].map(step => (
    <div
      key={step}
      className={`step ${pasCurent === step ? "active" : ""}`}
    >
      {step}
    </div>
  ))}
</div>
  );
}