export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h1 className="text-3xl font-bold">Perfil</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">Nombre: Marisol</div>
          <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">Rol: Docente</div>
          <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">Cursos: 5</div>
          <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">Tokens: 1450</div>
        </div>
      </div>
    </div>
  )
}
