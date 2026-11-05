import { describe, test } from "node:test";
import { strict as assert } from "node:assert";
import { findJar, jars, jarOfferLine, pricePer100gLabel, totalChf, totalWeightG } from "./product";

describe("confirmed product quantities", () => {
  test("330 ml glass holds 275 g and costs 12 CHF", () => {
    const jar = findJar("gross");
    assert.equal(jar?.volumeMl, 330);
    assert.equal(jar?.weightG, 275);
    assert.equal(jar?.priceChf, 12);
    assert.equal(jar?.priceLabel, "12 CHF");
  });

  test("205 ml glass holds 165 g and costs 9 CHF", () => {
    const jar = findJar("klein");
    assert.equal(jar?.volumeMl, 205);
    assert.equal(jar?.weightG, 165);
    assert.equal(jar?.priceChf, 9);
    assert.equal(jar?.priceLabel, "9 CHF");
  });

  test("only the two confirmed glasses are offered", () => {
    assert.deepEqual(
      jars.map((jar) => jar.shortLabel),
      ["330 ml / 275 g", "205 ml / 165 g"],
    );
    assert.equal(findJar("250 g"), undefined);
  });

  test("total price scales with the quantity", () => {
    assert.equal(totalChf("gross", 3), 36);
    assert.equal(totalChf("klein", 2), 18);
    assert.equal(totalChf("gross", 0), 12);
  });

  test("order email totals carry the confirmed weights", () => {
    assert.equal(totalWeightG("gross", 3), 825);
    assert.equal(totalWeightG("klein", 2), 330);
    assert.equal(totalWeightG("gross", 0), 275);
    assert.equal(totalWeightG("unknown", 2), 0);
  });


  test("offer line names both glasses with weight and price", () => {
    assert.equal(jarOfferLine, "330-ml-Glas (275 g) für 12 CHF, 205-ml-Glas (165 g) für 9 CHF");
  });

  test("price per 100 g matches the confirmed values", () => {
    assert.equal(pricePer100gLabel(findJar("gross")!), "4.36 CHF/100 g");
    assert.equal(pricePer100gLabel(findJar("klein")!), "5.45 CHF/100 g");
  });
});
