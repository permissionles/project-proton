import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

interface NFTMetaData {
  id: string;
  identifier?: string;
}

export interface vestedTokenInterface {
  tokensDeposited?: string;
  tokensWithdrawn?: string;
  startEmission?: string;
  endEmission?: string;
  lockID?: string;
}
export interface authInterface {
  address?: string;
  token?: string;
  userWallet?: string;
  nftsOwned?: NFTMetaData[];
  name?: string;
  category?: string;
  createdAt?: Date;
  vestedToken: vestedTokenInterface;
}

const authAtom = atom<authInterface | null>({
  key: "auth",
  default: null,
  // effects_UNSTABLE: [persistAtom],
});

export { authAtom };
