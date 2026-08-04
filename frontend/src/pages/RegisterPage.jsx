import { Link } from 'react-router-dom'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Registro</p>
        <h1 className="mt-2 text-3xl font-bold">Crear cuenta</h1>
        <div className="mt-6 space-y-4">
          <input className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2" placeholder="Nombre" />
          <input className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2" placeholder="Apellido" />
          <input className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2" placeholder="Email" />
          <input type="password" className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2" placeholder="Contraseña" />
          <button className="w-full rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-slate-950">Registrarme</button>
          <Link to="/login" className="block text-center text-cyan-300">Ya tengo cuenta</Link>
        </div>
      </div>
    </div>
  )
}
