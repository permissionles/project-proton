import { FC, useEffect, useState } from "react";
// import { authAtom } from "src/_state";

const VestingPage: FC = () => {
  // const auth = useRecoilValue(authAtom);

  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  return (
    <>
      {isPageLoaded && (
        <div>
          {/* {auth?.address && (
            <>
              <Header />
              <VestingWelcome />
            </>
          )}
          {!auth?.address && <ConnectWalletPage />} */}
        </div>
      )}
    </>
  );
};

export default VestingPage;
