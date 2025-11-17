// lib/world-cities-data.ts
import cities from 'world';

// Group cities by country
const cityMap = new Map<string, string[]>();
const countrySet = new Set<string>();

cities.forEach((city: any) => {
  const country = city.country;
  const cityName = city.name;

  countrySet.add(country);

  if (!cityMap.has(country)) {
    cityMap.set(country, []);
  }
  cityMap.get(country)!.push(cityName);
});

// Sort countries alphabetically
const countries = Array.from(countrySet).sort((a, b) => a.localeCompare(b));

export { cityMap, countries };
