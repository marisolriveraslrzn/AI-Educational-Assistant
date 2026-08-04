import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import ChatPage from './pages/ChatPage'
import HistoryPage from './pages/HistoryPage'
import ProfilePage from './pages/ProfilePage'
import api from './services/api'

const templatePrompts = {
  exam: 'Genera un examen de 5 preguntas sobre matemáticas para secundaria, con respuestas al final.',
  summary: 'Resume este texto en 5 puntos clave para docentes.',
  sheet: 'Crea una planilla con objetivo, actividad, recursos y evaluación para una clase de historia.',
  infographic: 'Diseña una infografía educativa sobre la fotosíntesis con estructura visual clara.',
}

function HomePage() {
  const [prompt, setPrompt] = useState(templatePrompts.exam)
  const [mode, setMode] = useState('exam')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleTemplate = (template) => {
    setMode(template)
    setPrompt(templatePrompts[template])
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setAnswer('')

    if (!prompt.trim()) {
      setError('Escribe una petición para continuar.')
      return
    }

    setLoading(true)

    try {
      const response = await api.post('/api/chat', { prompt, mode })
      setAnswer(response.data.answer || 'No se recibió respuesta.')
    } catch (err) {
      setError(err?.response?.data?.message || 'No se pudo completar la solicitud.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F5F5F5]">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-6 rounded-3xl border border-[#2E314A] bg-[#2E314A] p-6 shadow-2xl shadow-[#0F172A]/40">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1D9C8C]">MVP docente</p>
          <h1 className="mt-2 text-4xl font-bold text-white">Asistente de contenidos para docentes</h1>
          <p className="mt-3 max-w-3xl text-[#F5F5F5]/80">
            Crea exámenes, resúmenes, plantillas, infografías y materiales didácticos con Gemini en una sola pantalla.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <form onSubmit={handleSubmit} className="rounded-3xl border border-[#2E314A] bg-[#2E314A] p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              {['exam', 'summary', 'sheet', 'infographic'].map((template) => (
                <button
                  key={template}
                  type="button"
                  onClick={() => handleTemplate(template)}
                  className={`rounded-xl px-3 py-2 font-semibold transition ${mode === template ? 'bg-[#1D9C8C] text-[#0F172A]' : 'bg-[#0F172A] text-[#F5F5F5]'}`}
                >
                  {template === 'exam' ? 'Examen' : template === 'summary' ? 'Resumen' : template === 'sheet' ? 'Planilla' : 'Infografía'}
                </button>
              ))}
            </div>

            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              rows="7"
              className="mt-4 w-full rounded-2xl border border-[#0F172A] bg-[#0F172A] p-4 text-[#F5F5F5] outline-none focus:border-[#1D9C8C]"
              placeholder="Escribe lo que quieres crear para tus estudiantes..."
            />

            {error && <p className="mt-3 rounded-xl bg-rose-950/60 px-3 py-2 text-sm text-rose-200">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="mt-4 rounded-xl bg-[#1D9C8C] px-4 py-2 font-semibold text-[#0F172A] disabled:opacity-60"
            >
              {loading ? 'Generando...' : 'Generar respuesta'}
            </button>
          </form>

          <div className="rounded-3xl border border-[#2E314A] bg-[#2E314A] p-5">
            <h2 className="text-xl font-bold text-white">Resultado</h2>
            <div className="mt-4 min-h-[260px] rounded-2xl bg-[#0F172A] p-4 text-sm text-[#F5F5F5]/90">
              {answer || 'La respuesta de Gemini aparecerá aquí.'}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/chat" className="rounded-lg border border-[#2E314A] bg-[#2E314A] px-4 py-2">Abrir chat</Link>
          <Link to="/dashboard" className="rounded-lg border border-[#2E314A] bg-[#2E314A] px-4 py-2">Dashboard</Link>
          <Link to="/history" className="rounded-lg border border-[#2E314A] bg-[#2E314A] px-4 py-2">Historial</Link>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  )
}
