const { ethers } = require("hardhat");

async function main() {
  console.log("正在部署永恆數位榮譽證書合約...");

  // 獲取合約工廠
  const EternalDigitalHonorCertificate = await ethers.getContractFactory("EternalDigitalHonorCertificate");
  
  // 部署合約
  const certificate = await EternalDigitalHonorCertificate.deploy();
  
  await certificate.waitForDeployment();
  
  const contractAddress = await certificate.getAddress();
  console.log("合約部署成功！");
  console.log("合約地址:", contractAddress);
  
  // 驗證合約部署
  console.log("\n驗證合約資訊...");
  const name = await certificate.name();
  const symbol = await certificate.symbol();
  const owner = await certificate.owner();
  
  console.log("合約名稱:", name);
  console.log("合約符號:", symbol);
  console.log("合約擁有者:", owner);
  
  // 顯示證書類型名稱
  console.log("\n支援的證書類型:");
  for (let i = 0; i < 4; i++) {
    const typeName = await certificate.getCertificateTypeName(i);
    const chineseName = await certificate.getCertificateTypeNameChinese(i);
    console.log(`${i}. ${typeName} (${chineseName})`);
  }
  
  console.log("\n=== 部署資訊 ===");
  console.log("網路:", (await ethers.provider.getNetwork()).name);
  console.log("Gas 使用量:", (await certificate.deploymentTransaction()).gasLimit.toString());
  
  console.log("\n請將以下資訊保存到 .env 檔案:");
  console.log(`REACT_APP_CONTRACT_ADDRESS=${contractAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });