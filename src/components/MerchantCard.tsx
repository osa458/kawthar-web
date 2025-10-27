import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Merchant } from '@/lib/data/events';
import { Star, MapPin, Clock, ExternalLink } from 'lucide-react';

interface MerchantCardProps {
  merchant: Merchant;
  className?: string;
}

export function MerchantCard({ merchant, className }: MerchantCardProps) {
  return (
    <Card className={`h-full hover:shadow-lg transition-shadow ${className}`}>
      <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
        <img 
          src={merchant.image} 
          alt={merchant.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {merchant.featured && (
          <Badge className="absolute top-2 left-2 bg-primary">
            Featured
          </Badge>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{merchant.name}</CardTitle>
        <CardDescription className="line-clamp-2">
          {merchant.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Rating */}
          <div className="flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(merchant.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {merchant.rating} ({merchant.reviewCount} reviews)
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{merchant.neighborhood}</span>
          </div>

          {/* Hours */}
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            <span>{merchant.hours}</span>
          </div>

          {/* Category */}
          <Badge variant="outline">{merchant.category}</Badge>

          {/* Actions */}
          <div className="flex space-x-2 pt-2">
            <Button asChild variant="outline" size="sm" className="flex-1">
              <Link href={`/market/${merchant.slug}`}>
                View Details
              </Link>
            </Button>
            {merchant.website && (
              <Button asChild variant="ghost" size="sm">
                <a href={merchant.website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

