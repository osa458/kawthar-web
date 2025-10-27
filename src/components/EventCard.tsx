import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Event } from '@/lib/data/events';
import { formatDate, formatTime, formatPrice } from '@/lib/utils';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

interface EventCardProps {
  event: Event;
  className?: string;
}

export function EventCard({ event, className }: EventCardProps) {
  return (
    <Link href={`/events/${event.slug}`} className="block">
      <Card className={`h-full hover:shadow-lg transition-shadow ${className}`}>
        <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg line-clamp-2">{event.title}</CardTitle>
            <Badge variant="secondary" className="ml-2 flex-shrink-0">
              {formatPrice(event.price)}
            </Badge>
          </div>
          <CardDescription className="line-clamp-2">
            {event.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>{formatTime(event.time)}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              <span>{event.attendees}/{event.capacity} attendees</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <Badge variant="outline">{event.category}</Badge>
            <span className="text-xs text-gray-500">{event.neighborhood}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

