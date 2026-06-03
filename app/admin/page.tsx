import type { Metadata } from 'next'
import { getAllListingsAdmin } from '@/lib/data'
import AdminTable from '@/components/AdminTable'

export const metadata: Metadata = {
  title: 'Admin — IV Therapy Clinic Finder',
  robots: { index: false },
}

interface PageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function AdminPage({ searchParams }: PageProps) {
  const { page: pageParam } = await searchParams
  const page = parseInt(pageParam ?? '1', 10)

  const { listings, total } = await getAllListingsAdmin(page).catch(() => ({ listings: [], total: 0 }))

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-brand-navy">Listings ({total.toLocaleString()})</h1>
      </div>
      <AdminTable listings={listings} total={total} page={page} />
    </div>
  )
}
