'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Store, Users, Settings, LogOut, Plus } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    events: 0,
    merchants: 0,
    organizations: 0
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  useEffect(() => {
    // Fetch stats from API
    const fetchStats = async () => {
      try {
        const [eventsRes, merchantsRes, orgsRes] = await Promise.all([
          fetch('/api/admin/events'),
          fetch('/api/admin/merchants'),
          fetch('/api/admin/organizations')
        ]);
        
        const events = await eventsRes.json();
        const merchants = await merchantsRes.json();
        const organizations = await orgsRes.json();

        setStats({
          events: events.length,
          merchants: merchants.length,
          organizations: organizations.length
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    if (session) {
      fetchStats();
    }
  }, [session]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">Kawthar Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {session.user?.name || session.user?.email}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOut({ callbackUrl: '/admin/login' })}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.events}</div>
              <p className="text-xs text-muted-foreground">
                Total events in database
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Merchants</CardTitle>
              <Store className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.merchants}</div>
              <p className="text-xs text-muted-foreground">
                Total merchants in database
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Organizations</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.organizations}</div>
              <p className="text-xs text-muted-foreground">
                Total organizations in database
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="events" className="space-y-6">
          <TabsList>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="merchants">Merchants</TabsTrigger>
            <TabsTrigger value="organizations">Organizations</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Events Management</h2>
              <Button asChild>
                <Link href="/admin/events/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </Link>
              </Button>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>All Events</CardTitle>
                <CardDescription>
                  Manage your events, edit details, and control visibility
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Events list will be loaded here...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="merchants" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Merchants Management</h2>
              <Button asChild>
                <Link href="/admin/merchants/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Merchant
                </Link>
              </Button>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>All Merchants</CardTitle>
                <CardDescription>
                  Manage your merchants, edit details, and control visibility
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Merchants list will be loaded here...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="organizations" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Organizations Management</h2>
              <Button asChild>
                <Link href="/admin/organizations/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Organization
                </Link>
              </Button>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>All Organizations</CardTitle>
                <CardDescription>
                  Manage your organizations, edit details, and control visibility
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Organizations list will be loaded here...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Media Management</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Upload Media
              </Button>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Media Library</CardTitle>
                <CardDescription>
                  Manage images and files used across your content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Media library will be loaded here...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
