'use client';

import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import Loader from '../Shared/Loader';

export default function GlobalLoaderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoading = useSelector((state: RootState) => state.loader.isLoading);

  return <>{isLoading ? <Loader /> : <div>{children}</div>}</>;
}
