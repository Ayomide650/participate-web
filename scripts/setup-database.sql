-- Create participants table
CREATE TABLE IF NOT EXISTS participants (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  uid text NOT NULL UNIQUE,
  account_name text NOT NULL,
  email text,
  created_at timestamp with time zone DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_participants_created_at ON participants(created_at);
CREATE INDEX IF NOT EXISTS idx_participants_uid ON participants(uid);

-- Enable Row Level Security
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts and reads
DROP POLICY IF EXISTS "Allow all access to participants" ON participants;
CREATE POLICY "Allow all access to participants" ON participants
FOR ALL USING (true);
