import { NFT_ACCOUNTS_SCRIPT_HASH, NFT_SCRIPT_HASH } from "../../constants";

const createAccount = async (
  neolineN3: any,
  tokenId: string
): Promise<void> => {
  const account = await neolineN3.invoke({
    scriptHash: NFT_ACCOUNTS_SCRIPT_HASH,
    operation: "createAccount",
    args: [
      { type: "Hash160", value: NFT_SCRIPT_HASH },
      { type: "ByteArray", value: tokenId },
    ],
    fee: "0.0001",
    broadcastOverride: false,
    signers: [
      {
        account: "db598f072e85e59f7320388583e727cc73dd3a01",
        scopes: 16,
        allowedContracts: [NFT_ACCOUNTS_SCRIPT_HASH],
        allowedGroups: [],
      },
    ],
  });
  console.log(account);
};

export default createAccount;
