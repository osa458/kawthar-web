'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePageView } from '@/lib/hooks/telemetry';
import { Users, Shield, Heart, LogIn } from 'lucide-react';

export default function MeetPage() {
  usePageView('meet');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Meet & Connect
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Build meaningful relationships with like-minded individuals in your community. 
            Connect through shared interests, cultural experiences, and authentic conversations.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <CardTitle>Community Building</CardTitle>
              <CardDescription>
                Join groups and events that align with your interests and values
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <CardTitle>Meaningful Connections</CardTitle>
              <CardDescription>
                Form lasting friendships through shared cultural experiences
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <CardTitle>Safe Environment</CardTitle>
              <CardDescription>
                Connect in a respectful, inclusive, and secure community space
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="bg-primary text-primary-foreground">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-4">Ready to Connect?</CardTitle>
            <CardDescription className="text-lg opacity-90">
              Sign in to access our community features and start building meaningful connections today.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button size="lg" variant="secondary" className="mb-4">
              <LogIn className="h-5 w-5 mr-2" />
              Sign In to Connect
            </Button>
            <p className="text-sm opacity-75">
              Must be 18+ to participate in community features
            </p>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <div className="mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start">
            <Shield className="h-6 w-6 text-yellow-600 mr-3 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-2">Important Notice</h3>
              <p className="text-yellow-700">
                <strong>No minors policy:</strong> All community features and meetups are restricted to adults 18 years and older. 
                This ensures a safe and appropriate environment for all participants. 
                Please verify your age when signing up for community access.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

