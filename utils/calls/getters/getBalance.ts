export default async (neolineN3: any): Promise<any> => {
  let retData;
  try {
    const results = await neolineN3.getBalance();
    let temp = { neo: 0, gas: 0 };

    Object.keys(results).forEach((address) => {
      const balances = results[address];
      balances.forEach((balance: any) => {
        const { contract, symbol, amount } = balance;
        if (symbol == "NEO") {
          temp.neo = amount;
        } else {
          temp.gas = amount.slice(0, 3);
        }
      });
    });
    retData = temp;
  } catch (error: any) {
    const { type } = error;
    switch (type) {
      case "NO_PROVIDER":
        console.log("No provider available.");
        break;
      case "CONNECTION_DENIED":
        console.log("The user rejected the request to connect with your dApp");
        break;
      default:
        // Not an expected error object. Just write the error to the console.
        console.error(error);
        break;
    }
  }
  console.log(retData);
  return retData;
};
