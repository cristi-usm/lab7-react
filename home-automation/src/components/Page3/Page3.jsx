import { Button } from "../Button/Button";
import { colorScheme } from "../../data/data.json";
import { useForm, useFormDispatch } from "../../context/FormContext";

export function Page3() {
  const state = useForm();
  const dispatch = useFormDispatch();

  const labelClasses = "text-sm text-blue-950/70 font-sans font-bold mb-1 ml-1";
  const inputClasses = `
    w-full px-4 py-2 
    border border-blue-200 rounded-lg 
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
    transition-all duration-200 bg-white shadow-sm
  `;

  function onChange(e) {
    dispatch({type:'SET_DATA', field: e.target.name, value: e.target.value})
  }
  function onBlur(e) {
    dispatch({type:'VISITED', field: e.target.name})
  }

  function validationFail(field) {
    const value = state.formData[field];
    const wasVisited = state.visited[field];
    return wasVisited && (!value || value === "--Select--");
  }

    function handleNextClick(){
    const value = state.formData['colorScheme']
    const hasErr = !value || value === "--Select--";
    if(!hasErr) {
      dispatch({type: 'NEXT_STEP'})
    }else{
      console.log("Err")
        dispatch({type: 'VISITED', field: 'colorScheme'})
    }
  }
  return (
    <div className={`flex flex-col justify-self-start wrap-normal m-2 gap-4`}>
      <h1
        className={`text-4xl text-blue-950 font-['Times_New_Roman'] font-bold`}
      >
        Other details
      </h1>
      <label className={labelClasses} htmlFor="colorScheme">
        Color Scheme
      </label>
      <select
        id="colorScheme"
        name="colorScheme"
        value={state.formData['colorScheme']}
        onChange={(e) => onChange(e)}
        onBlur={(e) => onBlur(e)}
        className={`${inputClasses} appearance-none cursor-pointer`}
      >
        <option>--Select--</option>
        {colorScheme.map((color) => (
          <option key={color.id}>{color.type}</option>
        ))}
      </select>
      {validationFail("colorScheme") && (<p className="text-red-500 text-xs mt-1 ml-1 font-bold italic">Field required</p>)}

      <label className={labelClasses} htmlFor="message">
        Additional information from costumer
      </label>
      <textarea className={inputClasses} id="message" name="message" rows="5" cols="30" onChange={(e) => onChange(e)}></textarea>

      <Button onButtonClick={handleNextClick}>Next</Button>
    </div>
  );
}

export default Page3;
