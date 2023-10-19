import { NFT_ACCOUNTS_SCRIPT_HASH } from "../../constants";

export default async (wcSdk: any, content: string): Promise<string> => {
  const resp = await wcSdk.testInvoke({
    invocations: [
      {
        scriptHash: NFT_ACCOUNTS_SCRIPT_HASH,
        operation: "getPostId",
        args: [{ type: "String", value: content }],
      },
    ],
    signers: [{ scopes: 1 }],
  });

  console.log(resp);
  return resp.stack[0].value;
};
