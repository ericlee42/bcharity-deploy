import { deployments } from "hardhat";

const main = async () => {
  const deployed = await deployments.all();
  const contracts = Object.keys(deployed);
  if (contracts.length === 0) {
    console.log("No deployed contracts got");
    return;
  }

  const addresses = contracts.reduce((p, c) => {
    p[c] = deployed[c].address;
    return p;
  }, {} as { [key: string]: string });

  console.log("deployed contracts:");
  console.log(addresses);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
