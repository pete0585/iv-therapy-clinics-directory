import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const adminAuth = cookieStore.get('admin_auth')

  if (!adminAuth?.value || adminAuth.value !== process.env.ADMIN_PASSWORD) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-brand-navy text-white py-4 px-6 flex items-center justify-between">
        <span className="font-bold text-lg">IVTherapyClinicFinder Admin</span>
        <form action="/api/admin/logout" method="post">
          <button type="submit" className="text-sm text-gray-300 hover:text-white">Sign Out</button>
        </form>
      </div>
      {children}
    </div>
  )
}
