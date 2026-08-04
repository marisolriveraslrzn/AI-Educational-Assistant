export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="mx-auto max-w-6xl rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h1 className="text-3xl font-bold">Historial</h1>
        <div className="mt-6 space-y-3">
          <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">Actividad de matemáticas</div>
          <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">Examen de historia</div>
          <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">Resumen de documento científico</div>
        </div>
      </div>
    </div>
  )
}
