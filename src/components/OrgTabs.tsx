'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Event } from '@/lib/data/events';
import { formatDate, formatTime, formatPrice } from '@/lib/utils';

interface OrgTabsProps {
  seasonal: Event[];
  recurring: Event[];
  special: Event[];
  className?: string;
}

export function OrgTabs({ seasonal, recurring, special, className }: OrgTabsProps) {
  const [activeTab, setActiveTab] = useState('seasonal');

  const EventCard = ({ event }: { event: Event }) => (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">{event.title}</CardTitle>
        <CardDescription>{event.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm text-gray-600">
          <p><strong>Date:</strong> {formatDate(event.date)}</p>
          <p><strong>Time:</strong> {formatTime(event.time)}</p>
          <p><strong>Location:</strong> {event.location}</p>
          <p><strong>Price:</strong> {formatPrice(event.price)}</p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className={className}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="seasonal">Seasonal ({seasonal.length})</TabsTrigger>
          <TabsTrigger value="recurring">Recurring ({recurring.length})</TabsTrigger>
          <TabsTrigger value="special">Special ({special.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="seasonal" className="mt-6">
          {seasonal.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {seasonal.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>No seasonal events available.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="recurring" className="mt-6">
          {recurring.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recurring.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>No recurring events available.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="special" className="mt-6">
          {special.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {special.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>No special events available.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

