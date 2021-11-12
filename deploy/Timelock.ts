import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { getNamedAccounts, deployments } = hre;

  const { deploy, execute } = deployments;
  const { deployer } = await getNamedAccounts();

  const deployed = await deploy("Timelock", {
    from: deployer,
    args: [deployer, 75600],
    waitConfirmations: 1,
  });

  await execute(
    "MasterChef",
    { from: deployer, log: true },
    "transferOwnership",
    deployed.address
  );
};

func.tags = ["Timelock"];
func.dependencies = ["MasterChef"];

export default func;
