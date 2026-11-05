// Single source of truth for the confirmed jar sizes, weights and prices.
// Public product facts live here so pages, MCP tools and the AI assistant never drift.

export type JarId = "gross" | "klein";

export type Jar = {
  id: JarId;
  volumeMl: number;
  weightG: number;
  priceChf: number;
  /** Full label, e.g. "330-ml-Glas (275 g)". */
  label: string;
  /** Compact label, e.g. "330 ml / 275 g". */
  shortLabel: string;
  /** Price as shown in the UI, e.g. "12 CHF". */
  priceLabel: string;
};

const grossJar = {
  id: "gross",
  volumeMl: 330,
  weightG: 275,
  priceChf: 12,
  label: "330-ml-Glas (275 g)",
  shortLabel: "330 ml / 275 g",
  priceLabel: "12 CHF",
} as const satisfies Jar;

const kleinJar = {
  id: "klein",
  volumeMl: 205,
  weightG: 165,
  priceChf: 9,
  label: "205-ml-Glas (165 g)",
  shortLabel: "205 ml / 165 g",
  priceLabel: "9 CHF",
} as const satisfies Jar;

/** Tuple on purpose: `jars[0]` stays defined for callers with a fallback. */
export const jars = [grossJar, kleinJar] as const satisfies readonly Jar[];

export const defaultJarId: JarId = grossJar.id;


export function findJar(id: string): Jar | undefined {
  return jars.find((jar) => jar.id === id);
}

export function jarLabel(id: string): string {
  return findJar(id)?.label ?? id;
}

export function totalChf(id: string, quantity: number): number {
  const price = findJar(id)?.priceChf ?? 0;
  return price * Math.max(1, Math.floor(quantity));
}

/** Total net weight in grams for an order, e.g. 3 × 275 g = 825 g. */
export function totalWeightG(id: string, quantity: number): number {
  const weight = findJar(id)?.weightG ?? 0;
  return weight * Math.max(1, Math.floor(quantity));
}


/** Price per 100 g, e.g. "4.36 CHF/100 g". Derived from price and weight so the two never drift. */
export function pricePer100gLabel(jar: Pick<Jar, "priceChf" | "weightG">): string {
  return `${((jar.priceChf / jar.weightG) * 100).toFixed(2)} CHF/100 g`;
}

/** "330-ml-Glas (275 g) für 12 CHF, 205-ml-Glas (165 g) für 9 CHF" */
export const jarOfferLine = jars.map((jar) => `${jar.label} für ${jar.priceLabel}`).join(", ");
