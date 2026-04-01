export function Button ({onButtonClick, children}) {
    return (
        <button onClick={onButtonClick} className={`w-30 h-auto rounded-sm p-1 bg-blue-500 text-white font-['Times_New_Roman'] font-bold cursor-pointer`}>{children}</button>
    )
}

export default Button;