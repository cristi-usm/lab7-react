import { Button } from "../Button/Button";
import { protocols, sensors } from "../../data/data.json";
import { useForm, useFormDispatch } from "../../context/FormContext";

export function Page2() {
  const state = useForm();
  const dispatch = useFormDispatch();

  const labelClasses = "text-sm text-blue-950/70 font-sans font-bold mb-1 ml-1";

  function onChange(e){
    dispatch({type: 'SET_DATA', field: e.target.name, value:e.target.value})
  }

  function onBlur(e){
    dispatch({type:'VISITED', field: e.target.name})
  }

  function validationFail(field) {
    const value = state.formData[field];
    const wasVisited = state.visited[field];
    return wasVisited && !value;
  }

  function handleNextClick(){
    const fields = ["sensors", "protocol", "security"];
    const hasErr =fields.some(field => {
      const value = state.formData[field]
      return !value;
    })
    if(!hasErr) {
      console.log('Sucees')
      dispatch({type: 'NEXT_STEP'})
    }else{
      fields.forEach(field => {
        dispatch({type: 'VISITED', field: field})
      })
    }
  }



  return (
    <div className={`flex flex-col justify-self-start wrap-normal m-2 gap-4`}>
      <h1 className={`text-4xl text-blue-950 font-['Times_New_Roman'] font-bold`}> Equipment selection </h1>
      <label className={labelClasses} htmlFor="sensors">
        Sensors
      </label>
      {sensors.map((sensor) => (
        <label key={sensor.id} className={labelClasses}>
          <input type="checkbox" name="sensors" checked={state.formData.sensors.includes(sensor.type)} value={sensor.type} onChange={(e) => dispatch({type: 'SENSOR_TOGGLE', value: e.target.value})} onBlur={(e) => onBlur(e)}/>
          <span className={labelClasses}>{sensor.type}</span>
        </label>
      ))}

      <label className={labelClasses} htmlFor="protocol">
        Communication Protocol
      </label>
      {protocols.map((protocol) => (
        <label key={protocol.id} className={labelClasses}>
          <input name="protocol" type="radio" checked={protocol.type === state.formData.protocol} value={protocol.type} onChange={(e) => onChange(e)} onBlur={(e) => onBlur(e)} required/>
          <span className={labelClasses}>{protocol.type}</span>
        </label>
      ))}
      {validationFail("protocol") && (<p className="text-red-500 text-xs mt-1 ml-1 font-bold italic">Field required</p>)}


      <label className={labelClasses} htmlFor="security">
        Security (Basic, Medium, Max)
      </label>
      <input className={`"w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"`} type="range" value={state.formData.security} id="security" name="security" min="1" max="3" onChange={(e) => onChange(e)} onBlur={(e) => onBlur(e)} required />
      {validationFail("security") && (<p className="text-red-500 text-xs mt-1 ml-1 font-bold italic">Field required</p>)}

      <Button onButtonClick={handleNextClick}>Next</Button>
    </div>
  );
}

export default Page2;
