import React from "react";
import dynamic from "next/dynamic";

const SplashScreen = dynamic(() => import("../components/SplashComp"), {
  ssr: false,
});

const LoginForm = dynamic(() => import("@/components/LoginFormComp/LoginForm"), {
  ssr: false,
});

const page = () => {
  return (
    <React.Fragment>
      <SplashScreen />
      <LoginForm />
    </React.Fragment>
  );
};

export default page;
