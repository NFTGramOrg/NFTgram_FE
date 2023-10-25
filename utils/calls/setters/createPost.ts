import { NFT_ACCOUNTS_SCRIPT_HASH, NFT_SCRIPT_HASH } from "../../constants";

const createPost = async (
  neolineN3: any,
  accountId: string,
  prompt: string
): Promise<String> => {
  let txId;
  try {
    const post = await neolineN3.invoke({
      scriptHash: NFT_ACCOUNTS_SCRIPT_HASH,
      operation: "post",
      args: [
        { type: "ByteArray", value: accountId },
        { type: "String", value: prompt },
        { type: "Boolean", value: false },
        { type: "ByteArray", value: "" },
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
    console.log("Tx Hash: " + post.txid);

   txId= post.txid;
  } catch (er) {
    console.log(er);
  }

  return txId;
};
export default createPost;
