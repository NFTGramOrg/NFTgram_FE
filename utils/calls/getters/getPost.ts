import { NFT_ACCOUNTS_SCRIPT_HASH } from "../../constants";

export default async (
  wcSdk: any,
  accountId: string,
  postId: string
): Promise<string> => {
  const resp = await wcSdk.testInvoke({
    invocations: [
      {
        scriptHash: NFT_ACCOUNTS_SCRIPT_HASH,
        operation: "getAccount",
        args: [
          { type: "ByteArray", value: accountId },
          { type: "ByteArray", value: postId },
        ],
      },
    ],
    signers: [{ scopes: 1 }],
  });

  console.log(resp);
  return resp;
};
