'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, XCircle, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import type { IvTherapyListing } from '@/lib/types'
import { stateSlug, citySlug } from '@/lib/utils'

interface AdminTableProps {
  listings: IvTherapyListing[]
  total: number
  page: number
}

export default function AdminTable({ listings, total, page }: AdminTableProps) {
  const [statuses, setStatuses] = useState<Record<string, 'approved' | 'rejected'>>({})
  const totalPages = Math.ceil(total / 50)

  async function approve(id: string) {
    await fetch('/api/admin/approve', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    setStatuses(s => ({ ...s, [id]: 'approved' }))
  }

  async function reject(id: string) {
    await fetch('/api/admin/reject', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    setStatuses(s => ({ ...s, [id]: 'rejected' }))
  }

  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Clinic</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Location</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Tier</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {listings.map((listing) => {
              const status = statuses[listing.id]
              return (
                <tr key={listing.id} className={status === 'rejected' ? 'opacity-40' : ''}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div>
                        <Link
                          href={`/iv-therapy-clinics/${stateSlug(listing.state)}/${citySlug(listing.city)}/${listing.slug}`}
                          target="_blank"
                          className="font-medium text-brand-navy hover:text-brand-cyan flex items-center gap-1"
                        >
                          {listing.name}
                          <ExternalLink className="w-3 h-3" aria-label="Open" />
                        </Link>
                        {listing.phone && <div className="text-xs text-gray-500">{listing.phone}</div>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{listing.city}, {listing.state}</td>
                  <td className="px-4 py-3">
                    <span className={`badge ${
                      listing.listing_tier === 'featured' ? 'badge-featured' :
                      listing.listing_tier === 'verified' ? 'badge-verified' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {listing.listing_tier}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {status ? (
                      <span className={`text-xs font-semibold ${status === 'approved' ? 'text-green-600' : 'text-red-500'}`}>
                        {status.toUpperCase()}
                      </span>
                    ) : (
                      <span className={`text-xs font-semibold ${listing.is_approved ? 'text-green-600' : 'text-yellow-600'}`}>
                        {listing.is_approved ? 'LIVE' : 'PENDING'}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => approve(listing.id)}
                        className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Approve"
                      >
                        <CheckCircle className="w-4 h-4" aria-label="Approve" />
                      </button>
                      <button
                        onClick={() => reject(listing.id)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Reject"
                      >
                        <XCircle className="w-4 h-4" aria-label="Reject" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-6">
          {page > 1 && (
            <Link href={`/admin?page=${page - 1}`} className="btn-secondary px-4 py-2 inline-flex gap-1">
              <ChevronLeft className="w-4 h-4" aria-label="" /> Prev
            </Link>
          )}
          <span className="text-sm text-gray-600">Page {page} of {totalPages}</span>
          {page < totalPages && (
            <Link href={`/admin?page=${page + 1}`} className="btn-secondary px-4 py-2 inline-flex gap-1">
              Next <ChevronRight className="w-4 h-4" aria-label="" />
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
