CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  email text NOT NULL CHECK (char_length(email) <= 255 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  address text CHECK (address IS NULL OR char_length(address) <= 300),
  jar_size text NOT NULL CHECK (jar_size IN ('gross','klein')),
  quantity integer NOT NULL CHECK (quantity BETWEEN 1 AND 99),
  delivery text NOT NULL CHECK (delivery IN ('bassersdorf','wallisellen','lieferung')),
  notes text CHECK (notes IS NULL OR char_length(notes) <= 1000),
  status text NOT NULL DEFAULT 'neu',
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (delivery <> 'lieferung' OR (address IS NOT NULL AND char_length(trim(address)) > 0))
);
GRANT INSERT ON public.orders TO anon, authenticated;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit an order" ON public.orders FOR INSERT TO anon, authenticated WITH CHECK (status = 'neu');