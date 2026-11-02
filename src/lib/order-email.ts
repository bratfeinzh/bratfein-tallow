// Order-request e-mail template for the shop form.
// Sizes, weights and prices come from src/lib/product.ts so the transmitted
// request can never drift from what the site shows.
import { findJar, totalChf, totalWeightG } from "./product";

export const ORDER_EMAIL = "bratfein.zh@gmail.com";
export const ORDER_SUBJECT = "Bestellung Bratfein Schweizer Speisefett";

export type OrderDetails = {
  name: string;
  email: string;
  address: string;
  jarId: string;
  quantity: number;
  delivery: string;
  notes: string;
};

/** Plain-text body of the order request, one field per line. */
export function orderEmailBody(order: OrderDetails): string {
  const jar = findJar(order.jarId);
  return [
    `Name: ${order.name}`,
    `E-Mail: ${order.email}`,
    `Adresse: ${order.address}`,
    `Grösse: ${jar?.label ?? order.jarId}`,
    `Gewicht pro Glas: ${jar ? `${jar.weightG} g` : "unbekannt"}`,
    `Anzahl Gläser: ${order.quantity}`,
    `Grundpreis: ${jar ? `${jar.priceLabel} pro Glas` : "unbekannt"}`,
    `Total Gewicht: ${totalWeightG(order.jarId, order.quantity)} g`,
    `Total: ${totalChf(order.jarId, order.quantity)} CHF`,
    `Abholung/Lieferung: ${order.delivery}`,
    `Bemerkungen: ${order.notes}`,
  ].join("\n");
}

/** Ready-to-open mailto link with subject and body encoded. */
export function orderMailto(order: OrderDetails): string {
  return `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent(
    ORDER_SUBJECT,
  )}&body=${encodeURIComponent(orderEmailBody(order))}`;
}
