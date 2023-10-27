import { NFT_ACCOUNTS_SCRIPT_HASH } from "../../constants";

export default async (neolineN3: any, accountId: string): Promise<any> => {
  try {
    console.log(accountId)
    const response = await neolineN3.invokeRead({
      scriptHash: NFT_ACCOUNTS_SCRIPT_HASH,
      operation: "getAccount",
      args: [
        { type: "ByteArray", value: accountId },
      ],
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
    const account=response.stack[0].value;
    return account;
  } catch (er) {
  console.log(er)
  return []
  }
};
