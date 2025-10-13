const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 開始部署到 Sepolia 測試網...");
  
  // 獲取部署者帳戶
  const [deployer] = await ethers.getSigners();
  const deployerAddress = await deployer.getAddress();
  const balance = await ethers.provider.getBalance(deployerAddress);
  
  console.log("📋 部署資訊:");
  console.log("  部署者地址:", deployerAddress);
  console.log("  部署者餘額:", ethers.formatEther(balance), "ETH");
  
  // 檢查餘額是否足夠
  if (balance < ethers.parseEther("0.01")) {
    console.log("⚠️  警告: 帳戶餘額可能不足以支付部署費用");
    console.log("   建議至少有 0.01 ETH 來支付 gas 費用");
  }
  
  // 獲取網路資訊
  const network = await ethers.provider.getNetwork();
  console.log("  網路:", network.name);
  console.log("  Chain ID:", network.chainId.toString());
  
  if (network.chainId !== 11155111n) {
    throw new Error("❌ 請確保您連接到 Sepolia 測試網 (Chain ID: 11155111)");
  }
  
  console.log("\n📝 開始編譯合約...");
  
  // 部署合約
  const EternalDigitalHonorCertificate = await ethers.getContractFactory("EternalDigitalHonorCertificate");
  
  console.log("🔄 正在部署 EternalDigitalHonorCertificate 合約...");
  const startTime = Date.now();
  
  const certificate = await EternalDigitalHonorCertificate.deploy();
  await certificate.waitForDeployment();
  
  const deployTime = ((Date.now() - startTime) / 1000).toFixed(2);
  const contractAddress = await certificate.getAddress();
  
  console.log("\n✅ 部署完成!");
  console.log("📍 合約地址:", contractAddress);
  console.log("⏱️  部署時間:", deployTime, "秒");
  
  // 獲取部署交易資訊
  const deployTx = certificate.deploymentTransaction();
  if (deployTx) {
    console.log("📄 部署交易 Hash:", deployTx.hash);
    console.log("⛽ Gas 使用量:", deployTx.gasLimit.toString());
    
    // 等待交易確認
    console.log("\n⏳ 等待區塊確認...");
    const receipt = await deployTx.wait(2); // 等待 2 個區塊確認
    console.log("✅ 已確認", receipt.confirmations, "個區塊");
    console.log("💰 實際 Gas 使用:", receipt.gasUsed.toString());
  }
  
  // 驗證合約基本功能
  console.log("\n🧪 驗證合約基本功能...");
  try {
    const contractName = await certificate.name();
    const contractSymbol = await certificate.symbol();
    const contractOwner = await certificate.owner();
    
    console.log("✅ 合約名稱:", contractName);
    console.log("✅ 合約符號:", contractSymbol);
    console.log("✅ 合約擁有者:", contractOwner);
    
    // 檢查合約擁有者是否為部署者
    if (contractOwner.toLowerCase() === deployerAddress.toLowerCase()) {
      console.log("✅ 擁有者驗證通過");
    } else {
      console.log("⚠️  擁有者驗證異常");
    }
    
  } catch (error) {
    console.log("❌ 合約驗證失敗:", error.message);
  }
  
  // 輸出部署總結
  console.log("\n🎯 部署總結:");
  console.log("─".repeat(50));
  console.log("合約名稱: EternalDigitalHonorCertificate");
  console.log("網路: Sepolia Testnet"); 
  console.log("合約地址:", contractAddress);
  console.log("部署者:", deployerAddress);
  console.log("區塊鏈瀏覽器:", `https://sepolia.etherscan.io/address/${contractAddress}`);
  console.log("─".repeat(50));
  
  // 生成前端配置
  console.log("\n📱 前端配置更新:");
  console.log(`REACT_APP_CONTRACT_ADDRESS=${contractAddress}`);
  console.log("REACT_APP_NETWORK_ID=11155111");
  
  // 生成環境變數更新建議
  console.log("\n📋 請更新您的 .env 文件:");
  console.log(`REACT_APP_CONTRACT_ADDRESS=${contractAddress}`);
  
  // OpenSea 連結 (測試網)
  console.log("\n🌊 OpenSea 測試網連結:");
  console.log(`https://testnets.opensea.io/assets/sepolia/${contractAddress}`);
  
  console.log("\n🎉 部署完成! 合約已成功部署到 Sepolia 測試網");
  
  return contractAddress;
}

// 執行部署並處理錯誤
main()
  .then((contractAddress) => {
    console.log("\n🎊 所有操作完成!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ 部署失敗:");
    console.error(error);
    process.exit(1);
  });