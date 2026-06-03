import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'IV Therapy Clinic Finder — Find IV Drip Clinics Near You',
    template: '%s | IVTherapyClinicFinder',
  },
  description: 'Find IV therapy and IV hydration clinics near you. Compare treatments, pricing, and medical oversight. Myers Cocktail, NAD+, hangover recovery, and more.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.ivtherapyclinicfinder.com'),
  openGraph: {
    siteName: 'IVTherapyClinicFinder',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

function Header() {
  return (
    <header className="bg-brand-navy text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="text-brand-cyan font-black text-xl tracking-tight">IV</span>
              <span className="font-bold text-white text-sm leading-tight">Therapy<br />Clinic Finder</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/iv-therapy-clinics" className="text-gray-300 hover:text-brand-cyan transition-colors">
              Browse Clinics
            </Link>
            <Link href="/iv-therapy/myers-cocktail" className="text-gray-300 hover:text-brand-cyan transition-colors">
              Myers Cocktail
            </Link>
            <Link href="/iv-therapy/nad-plus-therapy" className="text-gray-300 hover:text-brand-cyan transition-colors">
              NAD+
            </Link>
            <Link href="/iv-therapy/hangover-recovery" className="text-gray-300 hover:text-brand-cyan transition-colors">
              Hangover IV
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/submit"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-brand-navy bg-brand-cyan rounded-lg hover:bg-brand-cyan-dark transition-colors"
            >
              Add Your Clinic
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-brand-navy text-gray-300 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-1 mb-3">
              <span className="text-brand-cyan font-black text-xl">IV</span>
              <span className="font-bold text-white text-sm">Therapy Clinic Finder</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              The most complete directory of IV therapy and IV hydration clinics in the United States.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3 text-sm">Browse</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/iv-therapy-clinics" className="hover:text-brand-cyan transition-colors">All Clinics</Link></li>
              <li><Link href="/iv-therapy-clinics/florida" className="hover:text-brand-cyan transition-colors">Florida</Link></li>
              <li><Link href="/iv-therapy-clinics/texas" className="hover:text-brand-cyan transition-colors">Texas</Link></li>
              <li><Link href="/iv-therapy-clinics/california" className="hover:text-brand-cyan transition-colors">California</Link></li>
              <li><Link href="/iv-therapy-clinics/new-york" className="hover:text-brand-cyan transition-colors">New York</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3 text-sm">Treatments</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/iv-therapy/myers-cocktail" className="hover:text-brand-cyan transition-colors">Myers Cocktail</Link></li>
              <li><Link href="/iv-therapy/nad-plus-therapy" className="hover:text-brand-cyan transition-colors">NAD+ Therapy</Link></li>
              <li><Link href="/iv-therapy/hangover-recovery" className="hover:text-brand-cyan transition-colors">Hangover Recovery</Link></li>
              <li><Link href="/iv-therapy/glutathione" className="hover:text-brand-cyan transition-colors">Glutathione</Link></li>
              <li><Link href="/iv-therapy/athletic-recovery" className="hover:text-brand-cyan transition-colors">Athletic Recovery</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3 text-sm">For Clinics</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/submit" className="hover:text-brand-cyan transition-colors">Add Your Clinic</Link></li>
              <li><Link href="/iv-therapy-clinics" className="hover:text-brand-cyan transition-colors">Claim Your Listing</Link></li>
              <li><Link href="/submit#pricing" className="hover:text-brand-cyan transition-colors">Pricing</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-sm text-gray-500">
            © {currentYear} IVTherapyClinicFinder. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Directory information is for educational purposes. Always verify credentials before booking.
          </p>
        </div>
      </div>
    </footer>
  )
}
