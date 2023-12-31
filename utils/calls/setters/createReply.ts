import { NFT_ACCOUNTS_SCRIPT_HASH } from "../../constants";

const createReply = async (
  wcSdk: any,
  accountId: string,
  prompt: string,
  replyId: string
): Promise<void> => {
  const resp = await wcSdk.invokeFunction({
    invocations: [
      {
        scriptHash: NFT_ACCOUNTS_SCRIPT_HASH,
        operation: "post",
        args: [
          { type: "ByteArray", value: accountId },
          { type: "String", value: prompt },
          { type: "Boolean", value: true },
          { type: "ByteArray", value: replyId },
        ],
      },
    ],
    signers: [{ scopes: 1 }],
  });

  console.log(resp);
  window.alert(JSON.stringify(resp, null, 2));
};
export default createReply;
