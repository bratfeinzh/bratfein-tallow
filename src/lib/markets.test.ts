import { describe, expect, test } from "bun:test";
import { markets } from "./markets";

describe("confirmed market information", () => {
  test("Bassersdorf selling hours are 10:00–18:00 on 5 December 2026", () => {
    const market = markets.find((entry) => entry.place === "Bassersdorf");
    expect(market?.time).toBe("10:00 – 18:00");
    expect(market?.start).toBe("2026-12-05T10:00:00+01:00");
    expect(market?.end).toBe("2026-12-05T18:00:00+01:00");
  });

  test("Wallisellen has no confirmed selling time on 10 December 2026", () => {
    const market = markets.find((entry) => entry.place === "Wallisellen");
    expect(market?.time).toBe("Zeit noch unbestimmt");
    expect(market?.start).toBe("2026-12-10");
    expect(market?.end).toBeNull();
  });
});