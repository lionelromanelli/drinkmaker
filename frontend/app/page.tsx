'use client'

import { useState } from 'react'
import axios from 'axios'
import DrinkCard from '@/components/DrinkCard'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003/api'

interface Drink {
  nombre: string
  ingredientes: string[]
  preparacion: string[]
}

export default function Home() {
  const [ingredients, setIngredients] = useState('')
  const [drinks, setDrinks] = useState<Drink[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [hasSearched, setHasSearched] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!ingredients.trim()) return

    setLoading(true)
    setError('')
    setHasSearched(true)
    setDrinks([]) // Clear previous results

    try {
      const response = await axios.post(`${API_BASE_URL}/drinks`, {
        ingredients: ingredients.trim()
      })

      setDrinks(response.data || [])
    } catch (err) {
      setError('No se pudieron obtener recomendaciones. Intenta nuevamente.')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-semibold">🍸</span>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-700 bg-clip-text text-transparent">
                DrinkMaker
              </h1>
            </div>
            <p className="text-gray-500 text-base font-light tracking-wide">
              Crea cócteles únicos con tus ingredientes
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Search Input */}
        <div className="mb-12">
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tus ingredientes y presiona ENTER (ej: vodka, jugo de naranja, hielo...)"
                className="w-full px-6 py-4 text-lg bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                disabled={loading}
              />
              {loading && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          </form>

          {/* Loading State */}
          {loading && (
            <div className="text-center mt-8">
              <div className="mb-4">
                <div className="text-4xl animate-pulse">🦙</div>
              </div>
              <p className="text-gray-500 text-sm">Creando cócteles perfectos para ti...</p>
              <p className="text-gray-400 text-xs mt-1">esto puede tomar unos segundos</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="mt-6 text-center">
              <div className="inline-block bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {drinks.length > 0 && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-xl font-light text-gray-800 mb-2">
                Tus cócteles recomendados
              </h2>
              <p className="text-gray-500 text-sm">
                {drinks.length} receta{drinks.length > 1 ? 's' : ''} encontrada{drinks.length > 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {drinks.map((drink, index) => (
                <DrinkCard key={index} drink={drink} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && drinks.length === 0 && hasSearched && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-gray-500">No se encontraron cócteles con esos ingredientes</p>
            <p className="text-gray-400 text-sm mt-2">Intenta con otros ingredientes</p>
          </div>
        )}

      </div>

      {/* Footer */}
      <div className="text-center pb-8">
        <p className="text-xs text-gray-400">
          Powered by AI llama3.2 model
        </p>
      </div>
    </div>
  )
}