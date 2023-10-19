import { NFT_ACCOUNTS_SCRIPT_HASH } from "../../constants";

export default async (wcSdk: any, accountId: string): Promise<string> => {
  const resp = await wcSdk.testInvoke({
    invocations: [
      {
        scriptHash: NFT_ACCOUNTS_SCRIPT_HASH,
        operation: "getAccount",
        args: [{ type: "ByteArray", value: accountId }],
      },
    ],
    signers: [{ scopes: 1 }],
  });

  console.log(resp);
  return resp;
};
