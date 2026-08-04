import { useState } from 'react'
import api from '../services/api'

const specialistOptions = [
  { value: 'profesor_ia', label: 'Profesor IA' },
  { value: 'corrector', label: 'Corrector' },
  { value: 'generador_examenes', label: 'Generador de exámenes' },
  { value: 'generador_rubricas', label: 'Generador de rúbricas' },
  { value: 'tutor', label: 'Tutor' },
  { value: 'resumidor', label: 'Resumidor' },
  { value: 'traductor', label: 'Traductor' },
]

export default function ChatPage() {
  const [question, setQuestion] = useState('')
  const [specialist, setSpecialist] = useState('profesor_ia')
  const [answer, setAnswer] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setAnswer('')

    if (!question.trim()) {
      setError('Escribe una pregunta para comenzar la conversación.')
      return
    }

    setLoading(true)

    try {
      const response = await api.post('/api/chat', {
        question,
        specialist
      })

      setAnswer(response.data.answer || 'No se recibió respuesta.')
      setQuestion('')
    } catch (err) {
      const message = err?.response?.data?.message || 'No se pudo completar la solicitud.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="mx-auto max-w-6xl rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h1 className="text-3xl font-bold">Chat IA</h1>
        <p className="mt-2 text-slate-300">Genera actividades, resúmenes, exámenes y materiales con IA.</p>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_320px]">
          <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-800 bg-slate-800 p-4">
            <label className="mb-2 block text-sm font-medium text-slate-200">Especialista</label>
            <select
              value={specialist}
              onChange={(event) => setSpecialist(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2"
            >
              {specialistOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <label className="mt-4 mb-2 block text-sm font-medium text-slate-200">Pregunta</label>
            <textarea
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              rows="5"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2"
              placeholder="Escribe una solicitud para el asistente educativo..."
            />

            {error && <p className="mt-3 rounded-lg bg-rose-900/50 px-3 py-2 text-sm text-rose-200">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="mt-4 rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-slate-950 disabled:opacity-60"
            >
              {loading ? 'Generando...' : 'Enviar'}
            </button>

            <div className="mt-4 rounded-lg bg-slate-700 p-3">
              <p className="text-sm text-slate-200">Pregunta del usuario</p>
              <p className="mt-2 text-cyan-100">{question || 'Tu solicitud aparecerá aquí...'}</p>
            </div>

            <div className="mt-4 rounded-lg bg-cyan-500/20 p-3 text-cyan-100">
              <p className="text-sm">Respuesta de IA</p>
              <p className="mt-2">{answer || 'La respuesta aparecerá aquí al enviar la petición.'}</p>
            </div>
          </form>

          <div className="rounded-2xl border border-slate-800 bg-slate-800 p-4">
            <h2 className="font-semibold">Chats recientes</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>Actividad de Álgebra</li>
              <li>Rúbrica de biología</li>
              <li>Resumen de documento</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
