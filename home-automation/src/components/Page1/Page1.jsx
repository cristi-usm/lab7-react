import { Button } from "../Button/Button";
import { houseType } from "../../data/data.json";
import { useForm, useFormDispatch } from "../../context/FormContext";

export function Page1() {
  const state = useForm();
  const dispatch = useFormDispatch();

  const inputClasses = `
    w-full px-4 py-2 
    border border-blue-200 rounded-lg 
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
    transition-all duration-200 bg-white shadow-sm
  `;
  const labelClasses = "text-sm text-blue-950/70 font-sans font-bold mb-1 ml-1";

  function validationFail(field) {
    const value = state.formData[field];
    const wasVisited = state.visited[field];
    return (
      wasVisited &&
      (!value || value.toString().trim() === "" || value === "--Select--")
    );
  }

  function surfaceValidationFailed() {
    const value = state.formData["surface"];
    if (!value) return false;
    return value > 0 ? false : true;
  }

  function dateValidationFail() {
    const value = state.formData["instalationDate"];
    if (!value) return false;
    const userDate = new Date(value);
    const currDate = new Date();
    userDate.setHours(0, 0, 0, 0);
    currDate.setHours(0, 0, 0, 0);
    return userDate < currDate ? true : false;
  }

  function handleNextClick() {
    const fields = ["location", "houseType", "surface", "instalationDate"];
    const hasErr = fields.some((field) => {
      const value = state.formData[field];
      return (
        !value ||
        value.toString().trim() === "" ||
        value === "--Select--" ||
        dateValidationFail() ||
        surfaceValidationFailed()
      );
    });
    if (!hasErr) {
      dispatch({ type: "NEXT_STEP" });
    } else {
      console.log("Err");
      fields.forEach((field) => {
        dispatch({ type: "VISITED", field: field });
      });
    }
  }

  function onChange(e) {
    dispatch({ type: "SET_DATA", field: e.target.name, value: e.target.value });
  }

  function onBlur(e) {
    dispatch({ type: "VISITED", field: e.target.name });
  }

  return (
    <div className={`flex flex-col justify-self-start wrap-normal m-2 gap-4`}>
      <h1
        className={`text-4xl text-blue-950 font-['Times_New_Roman'] font-bold`}
      >
        House Details
      </h1>

      <label className={labelClasses} htmlFor="location">
        Location
      </label>
      <input
        className={inputClasses}
        type="text"
        name="location"
        value={state.formData["location"]}
        placeholder="E.g. Chisinau, Moldova"
        onChange={(e) => onChange(e)}
        onBlur={(e) => onBlur(e)}
        required
      />
      {validationFail("location") && (
        <p className="text-red-500 text-xs mt-1 ml-1 font-bold italic">
          Field required
        </p>
      )}

      <label className={labelClasses} htmlFor="houseType">
        House type
      </label>
      <select
        id="houseType"
        name="houseType"
        onChange={(e) => onChange(e)}
        onBlur={(e) => onBlur(e)}
        value={state.formData["houseType"]}
        className={`${inputClasses}  appearance-none cursor-pointer`}
      >
        <option>--Select--</option>
        {houseType.map((houseType) => (
          <option key={houseType.id}>{houseType.type}</option>
        ))}
      </select>
      {validationFail("houseType") && (
        <p className="text-red-500 text-xs mt-1 ml-1 font-bold italic">
          Field required
        </p>
      )}

      <label className={labelClasses} htmlFor="surface">
        Home surface (sq.m.)
      </label>
      <input
        className={inputClasses}
        name="surface"
        type="number"
        value={state.formData["surface"]}
        onChange={(e) => onChange(e)}
        onBlur={(e) => onBlur(e)}
        required
      />
      {validationFail("surface") && (
        <p className="text-red-500 text-xs mt-1 ml-1 font-bold italic">
          Field required
        </p>
      )}
      {surfaceValidationFailed() && (
        <p className="text-red-500 text-xs mt-1 ml-1 font-bold italic">
          Surface is invalid
        </p>
      )}

      <label className={labelClasses} htmlFor="instalationDate">
        Instalation date
      </label>
      <input
        className={inputClasses}
        name="instalationDate"
        type="date"
        value={state.formData["instalationDate"]}
        onChange={(e) => onChange(e)}
        onBlur={(e) => onBlur(e)}
        required
      />
      {validationFail("instalationDate") && (
        <p className="text-red-500 text-xs mt-1 ml-1 font-bold italic">
          Field required
        </p>
      )}
      {dateValidationFail() && (
        <p className="text-red-500 text-xs mt-1 ml-1 font-bold italic">
          Date is invalid
        </p>
      )}

      <Button onButtonClick={handleNextClick}>Next</Button>
    </div>
  );
}

export default Page1;
