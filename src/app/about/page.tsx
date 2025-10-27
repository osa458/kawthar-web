'use client';

import { usePageView } from '@/lib/hooks/telemetry';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Users, Globe, Award } from 'lucide-react';

export default function AboutPage() {
  usePageView('about');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Kawthar
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We&apos;re passionate about connecting communities through culture, 
            tradition, and meaningful experiences.
          </p>
        </div>

        {/* Mission */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-700 text-center leading-relaxed">
              Kawthar is dedicated to fostering connections within Arabic communities 
              and beyond. We believe that cultural exchange, shared experiences, and 
              authentic relationships are the foundation of a vibrant, inclusive society. 
              Through events, markets, and community building, we create spaces where 
              traditions are celebrated and new friendships are formed.
            </p>
          </CardContent>
        </Card>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-center">Cultural Heritage</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                We honor and preserve Arabic traditions while embracing modern expressions 
                of culture and identity.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-center">Community First</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Our community&apos;s needs and aspirations guide every decision we make 
                and every event we create.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-center">Inclusivity</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                We welcome people from all backgrounds to learn, share, and grow 
                together in mutual respect.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-center">Excellence</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                We strive for the highest quality in everything we do, from events 
                to community support.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Story */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Our Story</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                Kawthar began as a simple idea: to create a platform where Arabic communities 
                could come together to celebrate their rich cultural heritage while building 
                bridges with the broader community.
              </p>
              <p>
                What started as small gatherings has grown into a vibrant ecosystem of events, 
                markets, and connections. Today, we&apos;re proud to serve thousands of community 
                members across multiple cities, hosting hundreds of events annually and supporting 
                local merchants and artisans.
              </p>
              <p>
                Our name &quot;Kawthar&quot; refers to the abundant goodness and blessings that come 
                from community and cultural connection. It&apos;s this spirit of abundance and 
                generosity that drives everything we do. Every event, every connection, every 
                experience is verified for quality and authenticity.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
