import { useForm } from "../../context/FormContext";

export function PreviewDataSegment() {
  const state = useForm();

  const {location, houseType, surface, instalationDate, sensors, protocol, security, colorScheme, message} = state.formData;

  function getSecurity(){
    if (Number(security) === 1){
      return "Baisc";
    }else if(Number(security) === 2){
      return "Medium";
    }else return "Max";
  }

  const fielName = `text-sm font-['Times_New_Roman'] font-semibold text-blue-950/60 uppercase tracking-tighter`;
  const fieldData = `text-lg font-['Times_New_Roman'] font-medium text-blue-900 ml-2`;

  return (
    <div className={`flex flex-col justify-self-start wrap-normal m-2 gap-4`}>    
      <h2 className={`text-xl font-['Times_New_Roman'] font-bold text-blue-900 border-b-2 border-blue-100 pb-1 mt-4 mb-2 uppercase tracking-wide`}>Form Priview</h2>
      {location && <h3 className={fielName}>Location: <span className={fieldData}>{location}</span></h3>}
      {houseType && <h3 className={fielName}>House type: <span className={fieldData}>{houseType}</span></h3>}
      {surface && <h3 className={fielName}>Surface: <span className={fieldData}>{surface}</span></h3>}
      {instalationDate && <h3 className={fielName}>Instalation Date: <span className={fieldData}>{instalationDate}</span></h3>}

      {sensors.length > 0 && <h3 className={fielName}>Sensors: {sensors.map((sensor, index) => (<span className={fieldData} key={index}>{sensor} </span>))}</h3>}
      {protocol && <h3 className={fielName}>Protocol: <span className={fieldData}>{protocol}</span></h3>}
      {security && <h3 className={fielName}>Security: <span className={fieldData}>{getSecurity()}</span></h3>}

      {colorScheme && <h3 className={fielName}>Color Scheme: <span className={fieldData}>{colorScheme}</span></h3>}
      {message && <h3 className={fielName}>Message for Installers: <span className={fieldData}>{message}</span></h3>}
    </div>
  );
}

export default PreviewDataSegment;