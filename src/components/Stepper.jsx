import { useFormState } from '../hooks/useForm';

const pasi = ['Echipă', 'Jucători', 'Turneu', 'Review'];

export default function Stepper() {
  const { step } = useFormState();

  return (
    <div className="flex items-center justify-center mb-8 gap-0">
      {pasi.map((pas, i) => (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300
                ${i < step ? 'bg-orange-500 border-orange-500 text-white' : ''}
                ${i === step ? 'bg-gray-900 border-orange-500 text-orange-500' : ''}
                ${i > step ? 'bg-gray-800 border-gray-600 text-gray-500' : ''}
              `}
            >
              {i < step ? '✓' : i + 1}
            </div>
            <span
              className={`text-xs mt-1 font-medium transition-all duration-300
                ${i === step ? 'text-orange-500' : i < step ? 'text-orange-400' : 'text-gray-600'}
              `}
            >
              {pas}
            </span>
          </div>
          {i < pasi.length - 1 && (
            <div
              className={`w-16 h-0.5 mb-4 transition-all duration-300
                ${i < step ? 'bg-orange-500' : 'bg-gray-700'}
              `}
            />
          )}
        </div>
      ))}
    </div>
  );
}
