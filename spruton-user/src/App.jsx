import { AppRoutes } from "./routes";
import { Loading } from "./components/loading/loading";
import { useTonAddress, useTonWallet } from "@tonconnect/ui-react";
import { useSetWalletMutation } from "./context/service/user.service";
import { useEffect } from "react";

function App() {
  // const isOpen = useSelector((state) => state.box.openAddBox);
  const userFriendlyAddress = useTonAddress();
  const wallet = useTonWallet();
  const [set] = useSetWalletMutation();

  useEffect(() => {
    if (wallet) {
      console.log("Hamyon ulandi:", userFriendlyAddress);
      try {
        set({ wallet: userFriendlyAddress });
      } catch (error) {
        console.log(error);
      }
    }
  }, [wallet, userFriendlyAddress]);

  return (
    <div className="wrapper">
      <AppRoutes />
      <Loading />
    </div>
  );
}

export default App;
