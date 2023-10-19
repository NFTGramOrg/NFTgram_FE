import { NFT_ACCOUNTS_SCRIPT_HASH, NFT_SCRIPT_HASH } from "../../constants";
const react = async (
  wcSdk: any,
  postId: string,
  userAccountId: string,
  receiverAccountId: string,
  reaction: string
): Promise<void> => {
  const resp = await wcSdk.invokeFunction({
    invocations: [
      {
        scriptHash: NFT_ACCOUNTS_SCRIPT_HASH,
        operation: "follow",
        args: [
          { type: "Hash160", value: postId },
          { type: "ByteArray", value: userAccountId },
          { type: "ByteArray", value: receiverAccountId },
          { type: "ByteArray", value: reaction },
        ],
      },
    ],
    signers: [{ scopes: 1 }],
  });

  console.log(resp);
  window.alert(JSON.stringify(resp, null, 2));
};
export default react;
