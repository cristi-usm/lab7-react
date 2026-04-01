import { useFormState } from '../../context/FormContext'

export default function TeacherHero() {
  const { values } = useFormState()

  return (<>
    <div class="flex flex-col md:flex-row justify-between">
      <div class="flex flex-col md:flex-row gap-10">
        <div class="w-32 h-32 rounded-lg bg-slate-800 flex items-center justify-center text-3xl text-emerald-500">
          { values.firstName ? values.firstName[0].toUpperCase() : 'N' }
          { values.lastName ? values.lastName[0].toUpperCase() : 'N' }
        </div>

        <div class="flex flex-col gap-4">
          <h2 class="text-4xl font-bold">{ values.username || 'Username' }</h2>
          <p class="text-zinc-400">{ values.bio || 'Bio not available' }</p>

          <div class="flex gap-10">
            { values.stats.map((s, i) => (
              <div key={i}>
                <div class="text-xs text-zinc-500 uppercase">{s.label || 'Label'}</div>
                <div class="text-xl font-semibold">{s.value || '-'}</div>
              </div>
            )) }
          </div>
        </div>
      </div>
    </div>
  </>)
}

// <div className="bg-white border rounded-xl shadow-lg overflow-hidden sticky top-10">
//   <div className="h-24 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
//   <div className="p-6 -mt-12">
//     <div className="w-24 h-24 bg-white rounded-full border-4 border-white shadow-md flex items-center justify-center text-4xl mb-4 mx-auto md:mx-0">
//       👤
//     </div>
    
//     <h2 className="text-2xl font-bold text-gray-800 text-center md:text-left">
//       {values.firstName || 'First Name'} {values.lastName || 'Last Name'}
//     </h2>
    
//     <p className="text-gray-600 mt-2 text-center md:text-left italic">
//       {values.bio || 'Your bio will appear here...'}
//     </p>

//     <div className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start">
//       {values.stats.map((s, i) => (
//         <div key={i} className="bg-gray-50 p-3 rounded-lg border flex flex-col items-center min-w-[80px]">
//           <span className="text-xs text-gray-500 font-semibold uppercase">{s.label || 'Label'}</span>
//           <span className="text-lg font-bold text-blue-600">{s.value || '-'}</span>
//         </div>
//       ))}
//     </div>

//     {values.availabilityStart && (
//       <div className="mt-6 text-sm text-gray-500 border-t pt-4">
//         🗓 Starting from: <span className="font-semibold text-gray-700">{values.availabilityStart}</span>
//       </div>
//     )}
//   </div>
// </div>