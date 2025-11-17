// components/form/CountryCityFields.tsx
'use client';

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import * as React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

// Load grouped data
import { cityMap, countries } from '@/lib/world-cities-data';

interface CountryCityFieldsProps<T extends FieldValues> {
  control: Control<T>;
  countryFieldName: Path<T>;
  cityFieldName: Path<T>;
  className?: string;
}

/**
 * Reusable Country → City fields using world-cities
 * City is disabled until country is selected
 */
export default function CountryCityFields<T extends FieldValues>({
  control,
  countryFieldName,
  cityFieldName,
  className,
}: CountryCityFieldsProps<T>) {
  return (
    <div className={cn('grid gap-4', className)}>
      {/* Country Field */}
      <Controller
        control={control}
        name={countryFieldName}
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>Country</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="max-h-60">
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage>{fieldState.error?.message}</FormMessage>
          </FormItem>
        )}
      />

      {/* City Field */}
      <Controller
        control={control}
        name={cityFieldName}
        render={({ field, fieldState }) => {
          const countryValue = control._getWatch(countryFieldName) as string;
          const cities = countryValue ? cityMap.get(countryValue) ?? [] : [];
          const isDisabled = !countryValue || cities.length === 0;

          // Reset city if country changes
          React.useEffect(() => {
            if (isDisabled && field.value) {
              field.onChange('');
            }
          }, [isDisabled, field]);

          return (
            <FormItem>
              <FormLabel>City</FormLabel>
              <Select
                disabled={isDisabled}
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        !countryValue
                          ? 'Select country first'
                          : cities.length === 0
                          ? 'No cities'
                          : 'Select a city'
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-60">
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          );
        }}
      />
    </div>
  );
}
