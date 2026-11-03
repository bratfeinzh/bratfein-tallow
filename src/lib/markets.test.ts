import { describe, test } from "node:test";
import { strict as assert } from "node:assert";
import { markets, upcomingMarkets, zurichDate, marketMapsUrl } from "./markets";

describe("confirmed market information", () => {
  test("Bassersdorf selling hours are 10:00–18:00 on 5 December 2026", () => {
    const market = markets.find((entry) => entry.place === "Bassersdorf");
    assert.equal(market?.time, "10:00 – 18:00");
    assert.equal(market?.start, "2026-12-05T10:00:00+01:00");
    assert.equal(market?.end, "2026-12-05T18:00:00+01:00");
  });

  test("Wallisellen has no confirmed selling time on 10 December 2026", () => {
    const market = markets.find((entry) => entry.place === "Wallisellen");
    assert.equal(market?.begins, null);
    assert.equal(market?.ends, null);
    assert.equal(market?.start, "2026-12-10");
    assert.equal(market?.end, null);
  });
});

describe("location page scheduling", () => {
  test("both confirmed markets are upcoming on 3 November 2026", () => {
    assert.deepEqual(upcomingMarkets("2026-11-03").map((m) => m.place), ["Bassersdorf", "Wallisellen"]);
  });
  test("a market remains visible on its date", () => {
    assert.deepEqual(upcomingMarkets("2026-12-05").map((m) => m.place), ["Bassersdorf", "Wallisellen"]);
  });
  test("past dates are hidden", () => {
    assert.deepEqual(upcomingMarkets("2026-12-06").map((m) => m.place), ["Wallisellen"]);
  });
  test("no markets remain after 10 December 2026", () => {
    assert.equal(upcomingMarkets("2026-12-11").length, 0);
  });
  test("today uses the Zurich calendar date rather than UTC", () => {
    assert.equal(zurichDate(new Date("2026-12-04T23:30:00Z")), "2026-12-05");
  });
  test("Google Maps routes target the exact venue", () => {
    const url = new URL(marketMapsUrl("Signum-Platz, südlich des Bahnhofs Wallisellen"));
    assert.equal(url.origin, "https://www.google.com");
    assert.equal(url.searchParams.get("destination"), "Signum-Platz, südlich des Bahnhofs Wallisellen");
  });
});