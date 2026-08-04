import Sidebar from '../components/Sidebar'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] p-4 text-[#F5F5F5] md:p-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row">
        <Sidebar />

        <main className="flex-1 rounded-3xl border border-[#2E314A] bg-[#2E314A] p-6 shadow-2xl shadow-[#0F172A]/30">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1D9C8C]">Dashboard</p>
              <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">Hola Marisol</h1>
              <p className="mt-2 text-[#F5F5F5]/75">Bienvenida a tu espacio de trabajo con IA.</p>
            </div>

            <button className="rounded-xl bg-[#1D9C8C] px-4 py-2 font-semibold text-[#0F172A] transition hover:opacity-90">
              Nuevo Chat
            </button>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-2xl border border-[#0F172A]/40 bg-[#0F172A]/40 p-4">
              <h2 className="text-lg font-semibold text-white">Chats recientes</h2>
              <p className="mt-2 text-sm text-[#F5F5F5]/75">Actividad de álgebra</p>
            </div>
            <div className="rounded-2xl border border-[#0F172A]/40 bg-[#0F172A]/40 p-4">
              <h2 className="text-lg font-semibold text-white">Estadísticas</h2>
              <p className="mt-2 text-sm text-[#F5F5F5]/75">Cursos activos: 5</p>
            </div>
            <div className="rounded-2xl border border-[#0F172A]/40 bg-[#0F172A]/40 p-4">
              <h2 className="text-lg font-semibold text-white">Tokens utilizados</h2>
              <p className="mt-2 text-sm text-[#F5F5F5]/75">1450</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-[#0F172A]/40 bg-[#0F172A]/40 p-4">
            <h2 className="text-lg font-semibold text-white">Últimos documentos</h2>
            <p className="mt-2 text-sm text-[#F5F5F5]/75">Resumen de clase.pdf</p>
          </div>
        </main>
      </div>
    </div>
  )
}
