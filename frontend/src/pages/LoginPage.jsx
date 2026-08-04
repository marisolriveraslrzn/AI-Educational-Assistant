import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function LoginPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  })
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register'
      const response = await api.post(endpoint, form)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      navigate('/dashboard')
    } catch (err) {
      setError(err?.response?.data?.message || 'No se pudo completar la operación')
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-12">
        <div className="grid w-full gap-8 rounded-3xl border border-slate-800 bg-slate-900 p-8 lg:grid-cols-2">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.3em] text-cyan-300">Fase 2</p>
            <h1 className="text-4xl font-bold">Acceso a la plataforma</h1>
            <p className="mt-3 text-slate-300">
              Docentes y estudiantes pueden registrarse e iniciar sesión para acceder a cursos,
              actividades y herramientas de IA.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl bg-slate-800 p-6">
            <div className="flex gap-2 rounded-xl bg-slate-700 p-1">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`flex-1 rounded-lg px-3 py-2 ${mode === 'login' ? 'bg-cyan-500 text-slate-950' : 'text-slate-200'}`}
              >
                Iniciar sesión
              </button>
              <button
                type="button"
                onClick={() => setMode('register')}
                className={`flex-1 rounded-lg px-3 py-2 ${mode === 'register' ? 'bg-cyan-500 text-slate-950' : 'text-slate-200'}`}
              >
                Registrarse
              </button>
            </div>

            {mode === 'register' && (
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2"
                placeholder="Nombre completo"
              />
            )}

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2"
              placeholder="Correo electrónico"
              type="email"
            />

            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2"
              placeholder="Contraseña"
              type="password"
            />

            {mode === 'register' && (
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2"
              >
                <option value="student">Estudiante</option>
                <option value="teacher">Docente</option>
              </select>
            )}

            {error && <p className="rounded-lg bg-rose-900/50 px-3 py-2 text-sm text-rose-200">{error}</p>}

            <button className="w-full rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-slate-950">
              {mode === 'login' ? 'Entrar' : 'Crear cuenta'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
