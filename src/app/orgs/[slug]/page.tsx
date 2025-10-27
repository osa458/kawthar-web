import { notFound } from 'next/navigation';
import { getOrganizationBySlug, getOrganizations } from '@/lib/data/events';
import { OrgTabs } from '@/components/OrgTabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface OrgDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const organizations = await getOrganizations();
  return organizations.map((org) => ({
    slug: org.slug,
  }));
}

export async function generateMetadata({ params }: OrgDetailPageProps) {
  const org = await getOrganizationBySlug(params.slug);
  
  if (!org) {
    return {
      title: 'Organization Not Found',
    };
  }

  return {
    title: `${org.name} | Kawthar Organizations`,
    description: org.description,
    openGraph: {
      title: org.name,
      description: org.description,
      images: [org.image],
    },
  };
}

export default async function OrgDetailPage({ params }: OrgDetailPageProps) {
  const org = await getOrganizationBySlug(params.slug);

  if (!org) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/events">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <div className="aspect-square bg-gray-200 rounded-t-lg overflow-hidden">
                <img 
                  src={org.image} 
                  alt={org.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{org.name}</CardTitle>
                <CardDescription>
                  {org.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {org.website && (
                  <Button asChild className="w-full">
                    <a href={org.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Website
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Events Tabs */}
          <div className="lg:col-span-3">
            <OrgTabs
              seasonal={org.seasonal}
              recurring={org.recurring}
              special={org.special}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

