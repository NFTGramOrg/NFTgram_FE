import { GAS_SCRIPT_HASH } from "../../constants";

export default async (wcSdk: any): Promise<string> => {
  const resp = await wcSdk.testInvoke({
    invocations: [
      {
        scriptHash: GAS_SCRIPT_HASH,
        operation: "balanceOf",
        args: [{ type: "Hash160", value: wcSdk.getAccountAddress() ?? "" }],
      },
    ],
    signers: [{ scopes: 1 }],
  });

  console.log(resp);
  return resp.stack[0].value;
};
