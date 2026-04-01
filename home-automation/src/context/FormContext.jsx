import { createContext, useContext, useReducer } from "react";

const FormContext = createContext(null);
const FormDispatchContext = createContext(null);

const initialState = {
    currStep: 1,
    pages:[
        {
        id: 1,
        number: 1,
        active: true,
        passed: false
        },
        {
        id: 2,
        number: 2,
        active: false,
        passed: false
        },
        {
        id: 3,
        number: 3,
        active: false,
        passed: false
        },
        {
        id: 4,
        number: 4,
        active: false,
        passed: false
        }
    ],
    formData: {
        location: "",
        houseType: "",
        surface: "",
        instalationDate: "",
        sensors: [],
        protocol: "",
        security: "",
        colorScheme: "",
        message: ""
    },
    visited: {},
    sumbitted: false
}

function formReducer(state, action) {
    switch (action.type){
        case 'NEXT_STEP':{
            const setPages = state.pages.map(page => {
                if(page.id <= state.currStep){
                    return {...page, active:false, passed:true}
                }else if(page.id === state.currStep + 1){
                    return {...page, active:true}
                }else return page;
            }); 
            return {...state, currStep: state.currStep + 1, pages:setPages };
        }
        case 'GO_BACK':{
            if(action.page > state.currStep){
                return state;
            }
            const setPages = state.pages.map(page =>{
                if(page.id < action.page){
                    return {...page, active:false, passed:true}
                }else if(page.id > action.page){
                    return {...page, active:false, passed:false}
                }else return page;
            })
            return {...state, currStep: state.currStep = action.page, pages:setPages};
        }
        case 'SET_DATA':
            return {...state, formData:{...state.formData, [action.field]: action.value}};
        case 'VISITED': 
            return {...state, visited:{...state.visited, [action.field]:true}};
        case 'SUBMITED':
            return {...state, subbitted: true}
        case 'SENSOR_TOGGLE':{
            const name = action.value;
            const sensorsNow = state.formData.sensors;
            const isSelected = sensorsNow.includes(name);
            const seunsorsUpdated = isSelected ? sensorsNow.filter(sensor => sensor != name) : [...sensorsNow, name];
            return {...state, formData:{...state.formData, sensors: seunsorsUpdated}}
        }
        default:
            return state;
    }
}

export function FormProvider({children}){
    const [state, dispatch] = useReducer(formReducer, initialState);
    return (
        <FormContext value={state}>
            <FormDispatchContext value={dispatch}>
                {children}
            </FormDispatchContext>
        </FormContext>
    )
}

export function useForm(){
    return useContext(FormContext);
}

export function useFormDispatch(){
    return useContext(FormDispatchContext)
}