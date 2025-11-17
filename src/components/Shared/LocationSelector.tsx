/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { City, Country } from 'country-state-city';
import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface LocationSelectorProps {
  onChange?: (location: { country: string; city: string }) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ onChange }) => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [cities, setCities] = useState<any[]>([]);

  // Load countries
  const countries = Country.getAllCountries().map((c) => ({
    name: c.name,
    isoCode: c.isoCode,
  }));

  // Update cities when country changes
  useEffect(() => {
    if (!selectedCountry) return;

    const cityList = City.getCitiesOfCountry(selectedCountry) || [];
    setCities(cityList);
    setSelectedCity('');

    // Notify reset
    onChange?.({
      country: selectedCountry,
      city: '',
    });
  }, [onChange, selectedCountry]);

  // Send location to parent
  useEffect(() => {
    if (!selectedCountry || !selectedCity) return;

    onChange?.({
      country: selectedCountry,
      city: selectedCity,
    });
  }, [onChange, selectedCity, selectedCountry]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Country Select */}
      <div>
        <label className="text-[#183136] text-md font-bold mb-2 block">
          Country
        </label>
        <Select onValueChange={setSelectedCountry}>
          <SelectTrigger className="text-[#183136] text-md pl-4 pr-2 py-6 shadow-sm shadow-gray-300/50 rounded-sm border border-gray-100 w-full">
            <SelectValue placeholder="Select Country" />
          </SelectTrigger>
          <SelectContent className="rounded-sm border-none bg-white w-full max-h-60 overflow-y-auto">
            <SelectGroup>
              <SelectLabel className="text-md font-bold">Country</SelectLabel>
              {countries.map((c) => (
                <SelectItem key={c.isoCode} value={c.isoCode}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* City Select */}
      <div>
        <label className="text-[#183136] text-md font-bold mb-2 block">
          City
        </label>
        <Select onValueChange={setSelectedCity} disabled={!selectedCountry}>
          <SelectTrigger className="text-[#183136] text-md pl-4 pr-2 py-6 shadow-sm shadow-gray-300/50 rounded-sm border border-gray-100 w-full">
            <SelectValue placeholder="Select City" />
          </SelectTrigger>
          <SelectContent className="rounded-sm border-none bg-white w-full max-h-60 overflow-y-auto">
            <SelectGroup>
              <SelectLabel className="text-md font-bold">City</SelectLabel>
              {cities.map((city) => (
                <SelectItem key={city.name} value={city.name}>
                  {city.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default LocationSelector;
