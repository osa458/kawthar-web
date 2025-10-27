'use client';

import { useState, useEffect } from 'react';
import { CardGrid } from '@/components/CardGrid';
import { EventCard } from '@/components/EventCard';
import { FilterPane, FilterOptions } from '@/components/FilterPane';
import { EmptyState } from '@/components/EmptyState';
import { getEvents } from '@/lib/data/events';
import { Event } from '@/lib/data/events';
import { usePageView } from '@/lib/hooks/telemetry';

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({});
  
  usePageView('events');

  const neighborhoods = ['Downtown', 'Midtown', 'Arts District', 'University District', 'Little Arabia'];
  const categories = ['Religious', 'Educational', 'Cultural', 'Social', 'Business'];

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        const data = await getEvents(filters);
        setEvents(data);
      } catch (error) {
        console.error('Error loading events:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [filters]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="h-48 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Events</h1>
          <p className="text-gray-600">
            Discover cultural events, workshops, and community gatherings
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <div className="lg:w-1/4">
            <FilterPane
              filters={filters}
              onFiltersChange={setFilters}
              neighborhoods={neighborhoods}
              categories={categories}
            />
          </div>

          {/* Events Grid */}
          <div className="lg:w-3/4">
            {events.length > 0 ? (
              <CardGrid columns={3}>
                {events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </CardGrid>
            ) : (
              <EmptyState
                icon="calendar"
                title="No events found"
                description="Try adjusting your filters or check back later for new events."
                action={{
                  label: 'Clear Filters',
                  onClick: () => setFilters({})
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

