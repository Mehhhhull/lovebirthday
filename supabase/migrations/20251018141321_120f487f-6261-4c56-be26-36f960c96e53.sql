-- Create moods table
CREATE TABLE public.moods (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  mood text NOT NULL,
  note text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.moods ENABLE ROW LEVEL SECURITY;

-- RLS policies for moods
CREATE POLICY "Anyone can view moods"
  ON public.moods
  FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own moods"
  ON public.moods
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own moods"
  ON public.moods
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create bucket_list table
CREATE TABLE public.bucket_list (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  completed boolean NOT NULL DEFAULT false,
  completed_by uuid REFERENCES profiles(id),
  completed_at timestamp with time zone,
  created_by uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.bucket_list ENABLE ROW LEVEL SECURITY;

-- RLS policies for bucket_list
CREATE POLICY "Anyone can view bucket list items"
  ON public.bucket_list
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create bucket list items"
  ON public.bucket_list
  FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Anyone can update bucket list items"
  ON public.bucket_list
  FOR UPDATE
  USING (true);

CREATE POLICY "Users can delete their own items"
  ON public.bucket_list
  FOR DELETE
  USING (auth.uid() = created_by);

-- Add trigger for bucket_list updated_at
CREATE TRIGGER update_bucket_list_updated_at
  BEFORE UPDATE ON public.bucket_list
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();