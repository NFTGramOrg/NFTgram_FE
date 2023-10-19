import { NFT_ACCOUNTS_SCRIPT_HASH, NFT_SCRIPT_HASH } from "../../constants";

const follow = async (
  wcSdk: any,
  followerAccountId: string,
  followingAccountId: string
): Promise<void> => {
  const resp = await wcSdk.invokeFunction({
    invocations: [
      {
        scriptHash: NFT_ACCOUNTS_SCRIPT_HASH,
        operation: "follow",
        args: [
          { type: "ByteArray", value: followerAccountId },
          { type: "ByteArray", value: followingAccountId },
        ],
      },
    ],
    signers: [{ scopes: 1 }],
  });

  console.log(resp);
  window.alert(JSON.stringify(resp, null, 2));
};
export default follow;
