import { ReactNode } from 'react';

// رندر صفحه home
export default function page({ children }: { children?: ReactNode }) {
  return <>{children}</>;
}
