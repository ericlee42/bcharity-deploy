import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { getNamedAccounts, deployments } = hre;

  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("Referral", {
    from: deployer,
    args: [],
    waitConfirmations: 1,
  });
};

func.tags = ["Referral"];

export default func;
