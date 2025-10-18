'use client';
import { setUserProfile } from '@/redux/features/user/userSlice';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../redux/hook/hook';

export default function UserSyncProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      if (status === 'authenticated' && session?.user?.accessToken) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/profile`,
          {
            headers: {
              Authorization: `${session.user.accessToken}`,
            },
          }
        );
        if (res.ok) {
          const data = await res.json();
          dispatch(setUserProfile(data.data));
        }
      }
    };
    fetchProfile();
  }, [session, status, dispatch]);

  return <>{children}</>;
}
