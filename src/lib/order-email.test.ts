import { describe, test } from "node:test";
import { strict as assert } from "node:assert";
import { ORDER_EMAIL, ORDER_SUBJECT, orderEmailBody, orderMailto } from "./order-email";

const base = {
  name: "Test Person",
  email: "test@example.ch",
  address: "Beispielweg 1, 8050 Zürich",
  delivery: "Abholung Markt Bassersdorf (5. Dezember)",
  notes: "",
};

describe("order request e-mail template", () => {
  test("330 ml glasses carry 275 g each and 825 g in total", () => {
    const body = orderEmailBody({ ...base, jarId: "gross", quantity: 3 });
    assert.match(body, /^Grösse: 330-ml-Glas \(275 g\)$/m);
    assert.match(body, /^Gewicht pro Glas: 275 g$/m);
    assert.match(body, /^Anzahl Gläser: 3$/m);
    assert.match(body, /^Grundpreis: 12 CHF pro Glas$/m);
    assert.match(body, /^Total Gewicht: 825 g$/m);
    assert.match(body, /^Total: 36 CHF$/m);
  });

  test("205 ml glasses carry 165 g each and 330 g in total", () => {
    const body = orderEmailBody({ ...base, jarId: "klein", quantity: 2 });
    assert.match(body, /^Grösse: 205-ml-Glas \(165 g\)$/m);
    assert.match(body, /^Gewicht pro Glas: 165 g$/m);
    assert.match(body, /^Total Gewicht: 330 g$/m);
    assert.match(body, /^Total: 18 CHF$/m);
  });

  test("template never mentions the retired 250-g jar", () => {
    const body =
      orderEmailBody({ ...base, jarId: "gross", quantity: 1 }) +
      orderEmailBody({ ...base, jarId: "klein", quantity: 1 });
    assert.equal(/250[- ]?g/i.test(body), false);
  });

  test("mailto link carries the address, subject and encoded body", () => {
    const url = orderMailto({ ...base, jarId: "klein", quantity: 2, notes: "Bitte um 12 Uhr" });
    assert.ok(url.startsWith(`mailto:${ORDER_EMAIL}?subject=`));
    assert.ok(url.includes(encodeURIComponent(ORDER_SUBJECT)));
    assert.ok(url.includes(encodeURIComponent("Total Gewicht: 330 g")));
    assert.ok(url.includes(encodeURIComponent("Bitte um 12 Uhr")));
  });
});
