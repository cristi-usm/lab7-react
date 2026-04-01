export default function Input({ label, error, ...props }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm font-semibold text-gray-700">{label}</label>}
      <input 
        className={`border p-2 rounded transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none ${error ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
        {...props} 
      />
      {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
    </div>
  )
}
