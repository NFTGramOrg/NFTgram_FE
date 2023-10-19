import { NFT_ACCOUNTS_SCRIPT_HASH, NFT_SCRIPT_HASH } from "../../constants";

const createAccount = async (wcSdk: any, tokenId: string): Promise<void> => {
  const resp = await wcSdk.invokeFunction({
    invocations: [
      {
        scriptHash: NFT_ACCOUNTS_SCRIPT_HASH,
        operation: "createAccount",
        args: [
          { type: "Hash160", value: NFT_SCRIPT_HASH },
          { type: "ByteArray", value: tokenId },
        ],
      },
    ],
    signers: [{ scopes: 1 }],
  });

  console.log(resp);
  window.alert(JSON.stringify(resp, null, 2));
};

export default createAccount;
