import { useWalletConnect } from "@cityofzion/wallet-connect-sdk-react";
import { NEO_SCRIPT_HASH } from "../../constants";

export default async (wcSdk): Promise<string> => {
  const resp = await wcSdk.testInvoke({
    invocations: [
      {
        scriptHash: NEO_SCRIPT_HASH,
        operation: "balanceOf",
        args: [{ type: "Hash160", value: wcSdk.getAccountAddress() ?? "" }],
      },
    ],
    signers: [{ scopes: 1 }],
  });

  console.log(resp);
  return JSON.stringify(resp, null, 2);
};
