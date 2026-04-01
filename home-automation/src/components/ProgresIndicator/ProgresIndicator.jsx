import { Fragment } from "react";
import tick from "../../assets/tick.svg";
import { useForm, useFormDispatch } from "../../context/FormContext";

export function ProgresIndicator() {
  const state = useForm();
  const dispatch = useFormDispatch();

  const pages = state.pages;

  function onClick(e) {
    dispatch({ type: "GO_BACK", page: Number(e.currentTarget.value)});
  }
  return (
    <>
      <h1
        className={`text-5xl text-blue-950 font-['Times_New_Roman'] font-bold m-2`}
      >
        Home Automation
      </h1>
      <h3
        className={`text-2xl text-blue-950/60 font-['Times_New_Roman'] font-medium m-2`}
      >
        Configure your home automation package
      </h3>
      <div className={`flex m-4 items-center`}>
        {pages.map((page, index) => {
          return (
            <Fragment key={page.id}>
              <button
                value={page.number}
                onClick={(e) => onClick(e)}
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-lg cursor-pointer z-10  ${page.active || page.passed ? "bg-blue-500 text-white" : "bg-gray-400 text-gray-200"} `}
              >
                {page.passed ? (
                  <img value={page.number} className={`w-6`} src={tick} />
                ) : (
                  page.number
                )}
              </button>
              {index !== pages.length - 1 && (
                <div className={"h-1 w-10 bg-gray-200  z-0"}></div>
              )}
            </Fragment>
          );
        })}
      </div>
    </>
  );
}

export default ProgresIndicator;
