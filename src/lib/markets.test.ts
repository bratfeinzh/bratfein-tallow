import { describe, test } from "node:test";
import { strict as assert } from "node:assert";
import { markets } from "./markets";

describe("confirmed market information", () => {
  test("Bassersdorf selling hours are 10:00–18:00 on 5 December 2026", () => {
    const market = markets.find((entry) => entry.place === "Bassersdorf");
    assert.equal(market?.time, "10:00 – 18:00");
    assert.equal(market?.start, "2026-12-05T10:00:00+01:00");
    assert.equal(market?.end, "2026-12-05T18:00:00+01:00");
  });

  test("Wallisellen has no confirmed selling time on 10 December 2026", () => {
    const market = markets.find((entry) => entry.place === "Wallisellen");
    assert.equal(market?.time, "Zeit noch unbestimmt");
    assert.equal(market?.start, "2026-12-10");
    assert.equal(market?.end, null);
  });
});