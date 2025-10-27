'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MapPin, Tag } from 'lucide-react';

export interface FilterOptions {
  dateRange?: {
    start: string;
    end: string;
  };
  neighborhood?: string;
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
}

interface FilterPaneProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  neighborhoods?: string[];
  categories?: string[];
  className?: string;
}

export function FilterPane({ 
  filters, 
  onFiltersChange, 
  neighborhoods = [], 
  categories = [],
  className 
}: FilterPaneProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (field: 'start' | 'end', value: string) => {
    onFiltersChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [field]: value
      } as FilterOptions['dateRange']
    });
  };

  const handleNeighborhoodChange = (value: string) => {
    onFiltersChange({
      ...filters,
      neighborhood: value === 'all' ? undefined : value
    });
  };

  const handleCategoryChange = (value: string) => {
    onFiltersChange({
      ...filters,
      category: value === 'all' ? undefined : value
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  return (
    <div className={`bg-white border rounded-lg shadow-sm ${className}`}>
      {/* Mobile Filter Toggle */}
      <div className="md:hidden p-4 border-b">
        <Button 
          variant="outline" 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full justify-between"
        >
          Filters
          <span className="ml-2">{isOpen ? '−' : '+'}</span>
        </Button>
      </div>

      {/* Filter Content */}
      <div className={`p-4 space-y-6 ${isOpen ? 'block' : 'hidden md:block'}`}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Filters</h3>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear All
          </Button>
        </div>

        {/* Date Range */}
        <div className="space-y-3">
          <Label className="flex items-center text-sm font-medium">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="start-date" className="text-xs text-gray-500">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={filters.dateRange?.start || ''}
                onChange={(e) => handleDateChange('start', e.target.value)}
                className="text-sm"
              />
            </div>
            <div>
              <Label htmlFor="end-date" className="text-xs text-gray-500">End Date</Label>
              <Input
                id="end-date"
                type="date"
                value={filters.dateRange?.end || ''}
                onChange={(e) => handleDateChange('end', e.target.value)}
                className="text-sm"
              />
            </div>
          </div>
        </div>

        {/* Neighborhood */}
        <div className="space-y-3">
          <Label className="flex items-center text-sm font-medium">
            <MapPin className="h-4 w-4 mr-2" />
            Neighborhood
          </Label>
          <Select value={filters.neighborhood || 'all'} onValueChange={handleNeighborhoodChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select neighborhood" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Neighborhoods</SelectItem>
              {neighborhoods.map((neighborhood) => (
                <SelectItem key={neighborhood} value={neighborhood}>
                  {neighborhood}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Category */}
        <div className="space-y-3">
          <Label className="flex items-center text-sm font-medium">
            <Tag className="h-4 w-4 mr-2" />
            Category
          </Label>
          <Select value={filters.category || 'all'} onValueChange={handleCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Price Range</Label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="min-price" className="text-xs text-gray-500">Min Price</Label>
              <Input
                id="min-price"
                type="number"
                placeholder="0"
                value={filters.priceRange?.min || ''}
                onChange={(e) => onFiltersChange({
                  ...filters,
                  priceRange: {
                    ...filters.priceRange,
                    min: e.target.value ? Number(e.target.value) : undefined
                  } as FilterOptions['priceRange']
                })}
                className="text-sm"
              />
            </div>
            <div>
              <Label htmlFor="max-price" className="text-xs text-gray-500">Max Price</Label>
              <Input
                id="max-price"
                type="number"
                placeholder="100"
                value={filters.priceRange?.max || ''}
                onChange={(e) => onFiltersChange({
                  ...filters,
                  priceRange: {
                    ...filters.priceRange,
                    max: e.target.value ? Number(e.target.value) : undefined
                  } as FilterOptions['priceRange']
                })}
                className="text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
