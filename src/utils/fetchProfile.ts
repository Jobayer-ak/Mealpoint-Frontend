// utils/fetchProfile.ts
export const fetchUserProfile = async (token: string) => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/auth/profile`, {
    headers: { Authorization: `${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch profile');
  return res.json();
};
