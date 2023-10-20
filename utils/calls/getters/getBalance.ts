export default async (neolineN3): Promise<any> => {
  let retData;
  try {
    const results = await neolineN3.getBalance();
    let temp = {};

    Object.keys(results).forEach((address) => {
      const balances = results[address];
      balances.forEach((balance) => {
        const { contract, symbol, amount } = balance;
        if (symbol == "NEO") {
          temp.neo = amount;
        } else {
          temp.gas = amount.slice(0, 3);
        }
      });
    });
    retData = temp;
  } catch (error) {
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
