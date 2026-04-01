export default function TimeSlot({ type = 'default', children, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`
        border border-zinc-400/50 h-12 flex items-center justify-center cursor-pointer text-slate-800
        ${type === 'default' ? 'hover:bg-zinc-400' : ''}
        ${type === 'selected' ? 'bg-emerald-500 hover:bg-emerald-700' : ''}
      `}
    >
      {children}
    </div>
  )
}