import { FormProvider }  from "./context/FormContext";
import { ProgresIndicator } from "./components/ProgresIndicator";
import { PreviewDataSegment } from './components/PreviewDataSegment';
import { Page1 } from "./components/Page1";
import { Page2 } from "./components/Page2";
import { Page3 } from "./components/Page3";
import { Page4 } from "./components/Page4";
import { useForm } from "./context/FormContext";

function Content() {
    const state = useForm();
  function getStep(){
    const currStep = Number(state.currStep);
    switch (currStep){
      case 1: return <>
        <ProgresIndicator></ProgresIndicator> <Page1></Page1>
      </>;
      case 2: return <>
        <ProgresIndicator></ProgresIndicator> <Page2></Page2>
      </>;
      case 3: return <>
        <ProgresIndicator></ProgresIndicator> <Page3></Page3>
      </>;
      case 4: return <>
        <ProgresIndicator></ProgresIndicator> <Page4></Page4>
      </>;
      case 5: return <>
      <ProgresIndicator></ProgresIndicator>
      <div className={`text-5xl text-blue-950 font-['Times_New_Roman'] font-bold m-2`}>Form was successfully sent</div>
      </>
    }
  }
  return <>{getStep()}</>
}

function App() {
  return (
    <FormProvider>
      <div className={`w-4/5 m-auto`}>
        <div className={`flex flex-col md:flex-row gap-8 items-start max-w-7xl m-auto p-4`}>
          <div className={`flex-1 w-full`}>
            <Content/>
          </div>
          <div className={`w-full md:w-80 lg:w-96 sticky top-4`}>
            <PreviewDataSegment></PreviewDataSegment>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}

export default App;
