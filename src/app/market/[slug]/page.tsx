import { notFound } from 'next/navigation';
import { getMerchantBySlug, getMerchants } from '@/lib/data/events';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Clock, Phone, ExternalLink, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface MerchantDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const merchants = await getMerchants();
  return merchants.map((merchant) => ({
    slug: merchant.slug,
  }));
}

export async function generateMetadata({ params }: MerchantDetailPageProps) {
  const merchant = await getMerchantBySlug(params.slug);
  
  if (!merchant) {
    return {
      title: 'Merchant Not Found',
    };
  }

  return {
    title: `${merchant.name} | Kawthar Market`,
    description: merchant.description,
    openGraph: {
      title: merchant.name,
      description: merchant.description,
      images: [merchant.image],
    },
  };
}

export default async function MerchantDetailPage({ params }: MerchantDetailPageProps) {
  const merchant = await getMerchantBySlug(params.slug);

  if (!merchant) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/market">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Market
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                <img 
                  src={merchant.image} 
                  alt={merchant.name}
                  className="w-full h-full object-cover"
                />
                {merchant.featured && (
                  <Badge className="absolute top-4 left-4 bg-primary">
                    Featured
                  </Badge>
                )}
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl mb-2">{merchant.name}</CardTitle>
                    <CardDescription className="text-lg">
                      {merchant.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Rating */}
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(merchant.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-3 text-lg">
                      {merchant.rating} ({merchant.reviewCount} reviews)
                    </span>
                  </div>

                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-3 text-gray-500" />
                    <span className="text-lg">{merchant.neighborhood}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-3 text-gray-500" />
                    <span className="text-lg">{merchant.hours}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-3 text-gray-500" />
                    <span className="text-lg">{merchant.phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Merchant Info */}
            <Card>
              <CardHeader>
                <CardTitle>Merchant Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900">Category</h4>
                  <Badge variant="outline">{merchant.category}</Badge>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Neighborhood</h4>
                  <p className="text-gray-600">{merchant.neighborhood}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Hours</h4>
                  <p className="text-gray-600">{merchant.hours}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Phone</h4>
                  <p className="text-gray-600">{merchant.phone}</p>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Visit Merchant</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {merchant.website && (
                  <Button asChild className="w-full" size="lg">
                    <a href={merchant.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Website
                    </a>
                  </Button>
                )}
                <Button variant="outline" className="w-full" size="lg">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

