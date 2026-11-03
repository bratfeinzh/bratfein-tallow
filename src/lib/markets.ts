// Venue names are published by the linked organizers; selling hours follow Bratfein's confirmation.
export const markets = [
  {
    place: "Bassersdorf",
    date: "5. Dezember 2026",
    dateIso: "2026-12-05",
    begins: "10:00",
    ends: "18:00",
    time: "10:00 – 18:00",
    location: "Dorfplatz Bassersdorf",
    start: "2026-12-05T10:00:00+01:00",
    end: "2026-12-05T18:00:00+01:00",
    city: "Bassersdorf",
    source: "https://www.bassersdorf.ch/leben-standort/gewerbe/kultur/chlausmaert.html/218",
  },
  {
    place: "Wallisellen",
    date: "10. Dezember 2026",
    dateIso: "2026-12-10",
    begins: null,
    ends: null,
    time: "Zeit wird noch bekanntgegeben",
    location: "Signum-Platz, südlich des Bahnhofs Wallisellen",
    start: "2026-12-10",
    end: null,
    city: "Wallisellen",
    source: "https://qv-wallisellen-sued.ch/de/adventsmarkt",
  },
] as const;

export function zurichDate(now: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Zurich",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const value = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return `${value("year")}-${value("month")}-${value("day")}`;
}

export function upcomingMarkets(today: string) {
  return markets.filter((market) => market.dateIso >= today);
}

export function marketMapsUrl(location: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location)}`;
}