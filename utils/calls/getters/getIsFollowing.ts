import { NFT_ACCOUNTS_SCRIPT_HASH } from "../../constants";

export default async (
  neolineN3: any,
  followerAccountId: string,
  followingAccountId: string
): Promise<boolean> => {
  try {
    const response = await neolineN3.invokeRead({
      scriptHash: NFT_ACCOUNTS_SCRIPT_HASH,
      operation: "isFollowing",
      args: [
        { type: "ByteArray", value: followerAccountId },
        { type: "ByteArray", value: followingAccountId },
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
    const isFollowing = response.stack[0].value;
    return isFollowing;
  } catch (er) {
    console.log(er);
    return false;
  }
};
