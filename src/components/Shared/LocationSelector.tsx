/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { City, Country } from 'country-state-city';
import { useEffect, useState } from 'react';
import { Input } from '../ui/input';
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
  onChange?: (location: {
    country: string;
    city: string;
    postalCode: string;
  }) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ onChange }) => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [cities, setCities] = useState<any[]>([]);
  const [loadingPostal, setLoadingPostal] = useState(false);

  // Load countries
  const countries = Country.getAllCountries().map((c) => ({
    name: c.name,
    isoCode: c.isoCode,
  }));

  // Update cities when country changes
  useEffect(() => {
    if (!selectedCountry) return;
    const cityList = City?.getCitiesOfCountry(selectedCountry)?.map((c) => ({
      name: c.name,
      postalCode: c?.postalCode || '',
    }));
    setCities(cityList);
    setSelectedCity('');
    setPostalCode('');
  }, [selectedCountry]);

  // Fetch postal code when city is selected
  useEffect(() => {
    if (!selectedCity || !selectedCountry) return;

    const cityObj = cities.find((c) => c.name === selectedCity);
    if (cityObj && cityObj.postalCode) {
      setPostalCode(cityObj.postalCode);
      onChange?.({
        country: selectedCountry,
        city: selectedCity,
        postalCode: cityObj.postalCode,
      });
      return;
    }

    // Optional: Fetch from Zippopotam.us
    const fetchPostal = async () => {
      setLoadingPostal(true);
      try {
        const res = await fetch(
          `https://api.zippopotam.us/${selectedCountry.toLowerCase()}/${selectedCity}`
        );
        if (!res.ok) {
          setPostalCode('N/A');
          return;
        }
        const data = await res.json();
        const code = data.places?.[0]?.['post code'] || 'N/A';
        setPostalCode(code);
        onChange?.({
          country: selectedCountry,
          city: selectedCity,
          postalCode: code,
        });
      } catch {
        setPostalCode('N/A');
      } finally {
        setLoadingPostal(false);
      }
    };
    fetchPostal();
  }, [selectedCity, selectedCountry, cities, onChange]);

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

      {/* Postal Code */}
      <div>
        <label className="text-[#183136] text-md font-bold mb-2 block">
          Postal Code
        </label>
        <Input
          value={loadingPostal ? 'Loading...' : postalCode}
          readOnly
          className="text-black text-md shadow-sm shadow-gray-300/50 rounded-sm border border-gray-100 py-7 w-full sm:w-[350px] md:w-full bg-gray-50"
        />
      </div>
    </div>
  );
};

export default LocationSelector;
