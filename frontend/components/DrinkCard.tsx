interface Drink {
  nombre: string
  ingredientes: string[]
  preparacion: string[]
}

interface DrinkCardProps {
  drink: Drink
}

export default function DrinkCard({ drink }: DrinkCardProps) {
  // Array of gradient combinations for variety
  const gradients = [
    'from-pink-500 to-rose-500',
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-indigo-500',
    'from-green-500 to-emerald-500',
    'from-orange-500 to-amber-500',
    'from-red-500 to-pink-500',
    'from-teal-500 to-green-500',
    'from-violet-500 to-purple-500'
  ]

  // Get a consistent gradient based on drink name
  const gradientIndex = drink.nombre.length % gradients.length
  const gradient = gradients[gradientIndex]

  return (
    <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full flex flex-col transform hover:-translate-y-2">
      {/* Header with gradient */}
      <div className={`bg-gradient-to-r ${gradient} p-6 relative`}>
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <span className="text-xl">🍹</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white drop-shadow-sm">
                {drink.nombre}
              </h3>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
      </div>

      <div className="p-6 flex-grow flex flex-col">
        {/* Ingredients Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-sm">🥃</span>
            </div>
            <h4 className="text-sm font-semibold text-green-700 uppercase tracking-wider">
              Ingredientes
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {drink.ingredientes.map((ingredient, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 px-3 py-1.5 rounded-full text-sm font-medium border border-green-200"
              >
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                {ingredient}
              </span>
            ))}
          </div>
        </div>

        {/* Preparation Section */}
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-sm">📋</span>
            </div>
            <h4 className="text-sm font-semibold text-blue-700 uppercase tracking-wider">
              Preparación
            </h4>
          </div>
          <ol className="space-y-3">
            {drink.preparacion.map((step, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className={`flex-shrink-0 w-7 h-7 bg-gradient-to-r ${gradient} rounded-full flex items-center justify-center shadow-sm`}>
                  <span className="text-white text-xs font-bold">
                    {index + 1}
                  </span>
                </div>
                <span className="text-gray-700 text-sm leading-relaxed flex-grow pt-0.5">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Footer with stats */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-xs">🧪</span>
                </div>
                <span>{drink.ingredientes.length}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-xs">⚡</span>
                </div>
                <span>{drink.preparacion.length} pasos</span>
              </div>
            </div>

            {/* Difficulty indicator */}
            <div className="flex items-center gap-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i < Math.min(3, Math.ceil(drink.preparacion.length / 3))
                      ? `bg-gradient-to-r ${gradient}`
                      : 'bg-gray-200'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}