import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { getNamedAccounts, deployments } = hre;

  const { deploy, execute } = deployments;
  const {
    deployer,
    dev: devAddress,
    fee: feeAddress,
    vault: vaultAddress,
  } = await getNamedAccounts();

  const GiveToken = await deployments.get("GiveToken");
  const deployed = await deploy("MasterChef", {
    from: deployer,
    args: [GiveToken.address, 0, devAddress, feeAddress, vaultAddress],
    log: true,
  });

  // transfer GiveToken owership to MasterChef
  await execute(
    "GiveToken",
    { from: deployer, log: true },
    "transferOwnership",
    deployed.address
  );
};

func.tags = ["MasterChef"];
func.dependencies = ["GiveToken"];

export default func;
