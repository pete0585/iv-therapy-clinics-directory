import { permanentRedirect } from 'next/navigation'

interface Props { params: Promise<{ state: string; city: string; slug: string }> }

export default async function IvTherapyListingPage({ params }: Props) {
  const { slug } = await params
  permanentRedirect(`/listings/${slug}`)
}
