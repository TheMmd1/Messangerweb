'use client';

import '../i18n';
import { Provider } from 'react-redux';
import store from '@/store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AuxProps {
  children: React.ReactNode;
}

// رپر ریداکس برای کل پروژه
const ReduxProvider = ({ children }: AuxProps) => {
  return (
    <div>
      <Provider store={store}>
        {children}
        {/* کانتینر توست برای آلارم ها */}
        <ToastContainer
          bodyClassName={() => 'font-IranYekanRegular text-[1.5dvh] !rounded-[10px] flex items-center justify-center gap-x-2'}
          position="top-right"
          theme="light"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={true}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Provider>
    </div>
  );
};

export default ReduxProvider;
