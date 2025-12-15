export interface SleepRecord {
  id: string;
  user_id: string;
  slept_at: string;
  woke_at: string;
  duration_hours: number;
  quality: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}
