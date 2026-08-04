import { Link } from 'react-router-dom'

const navigation = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/chat', label: 'Chat' },
  { to: '/history', label: 'Historial' },
  { to: '/profile', label: 'Perfil' },
]

export default function Sidebar() {
  return (
    <aside className="w-full rounded-3xl border border-[#2E314A] bg-[#2E314A] p-4 text-[#F5F5F5] shadow-2xl shadow-[#0F172A]/30 lg:w-80">
      <div className="mb-6 rounded-2xl bg-[#0F172A]/40 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1D9C8C]">AI Assistant</p>
        <h2 className="mt-2 text-2xl font-bold text-white">Marisol</h2>
        <p className="mt-1 text-sm text-[#F5F5F5]/70">Panel docente</p>
      </div>

      <nav className="space-y-2 text-sm">
        {navigation.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="block rounded-xl border border-transparent bg-[#0F172A]/40 px-3 py-3 transition hover:border-[#1D9C8C] hover:bg-[#1D9C8C] hover:text-[#0F172A]"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
