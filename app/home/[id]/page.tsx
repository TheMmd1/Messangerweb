import { Suspense } from 'react';
import Spinner from '@/components/SpinnerComp/Index';
import ChatSection from '@/components/ChatSection/Index';

export default function page() {
  // بخش چت که به صورت داینامیک رندر میشود
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <Spinner color="#fff" />
        </div>
      }
    >
      <ChatSection />
    </Suspense>
  );
}
