CREATE TABLE IF NOT EXISTS public.booked_flights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  flight_number TEXT NOT NULL,
  from_airport TEXT NOT NULL,
  to_airport TEXT NOT NULL,
  departure_time TEXT NOT NULL,
  arrival_time TEXT NOT NULL,
  flight_date TEXT NOT NULL,
  seats TEXT NOT NULL,
  cabin_class TEXT NOT NULL,
  passengers INTEGER NOT NULL DEFAULT 1,
  aircraft TEXT NOT NULL,
  registration TEXT,
  price NUMERIC NOT NULL,
  passenger_name TEXT NOT NULL,
  is_return_flight BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.booked_flights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own flights" ON public.booked_flights
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own flights" ON public.booked_flights
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own flights" ON public.booked_flights
  FOR DELETE USING (auth.uid() = user_id);
