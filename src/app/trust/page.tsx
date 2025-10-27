'use client';

import { usePageView } from '@/lib/hooks/telemetry';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Lock, Users, Eye, CheckCircle } from 'lucide-react';

export default function TrustPage() {
  usePageView('trust');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Trust & Safety
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your safety and security are our top priorities. Learn about our 
            comprehensive safety measures and community guidelines.
          </p>
        </div>

        {/* Key Safety Measures */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-center">Adult-Only Community</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                All community features and events are restricted to adults 18+ only. 
                This ensures appropriate interactions and maintains a mature environment.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-center">Invite-First Access</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Community access is invitation-based to ensure quality and safety. 
                Members must be invited by existing trusted community members.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-center">Verified Organizers</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                All event organizers undergo thorough verification including identity 
                confirmation, background checks, and community references.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-center">Transparency Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Quarterly transparency reports detail safety metrics, incident reports, 
                and community health indicators for full accountability.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Community Guidelines */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Community Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Respectful Communication</h3>
                  <p className="text-gray-600">
                    Treat all community members with kindness, respect, and dignity. 
                    Harassment, discrimination, or hate speech will not be tolerated.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Age Verification</h3>
                  <p className="text-gray-600">
                    All community features require age verification (18+). 
                    This ensures appropriate interactions and content.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Authentic Participation</h3>
                  <p className="text-gray-600">
                    Use your real identity and participate genuinely. 
                    Fake profiles or misleading information are prohibited.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Cultural Sensitivity</h3>
                  <p className="text-gray-600">
                    Be mindful of cultural differences and traditions. 
                    Ask questions respectfully and learn from each other.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transparency Report */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Transparency Report</CardTitle>
            <CardDescription className="text-center">
              Quarterly reports on community safety and platform health
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Q4 2024 Report Coming Soon</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Our first quarterly transparency report will be published in January 2025, 
                detailing safety metrics, incident reports, and community health indicators.
              </p>
              <Button variant="outline" disabled>
                Report Not Yet Available
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
