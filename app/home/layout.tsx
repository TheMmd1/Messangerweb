// layout صفحه اصلی و چت
import ReduxProvider from '../reduxProvider';
import ReduxDefaultValue from '../ReduxProviders/ReduxDefaultValue';
import Index from '@/components/HomeComp/index';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <ReduxDefaultValue>
        <Index>{children}</Index>
      </ReduxDefaultValue>
    </ReduxProvider>
  );
}
