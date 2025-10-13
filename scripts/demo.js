const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 開始演示永恆數位榮譽證書系統...\n");

  // 部署合約
  console.log("📝 步驟 1: 部署智能合約");
  const EternalDigitalHonorCertificate = await ethers.getContractFactory("EternalDigitalHonorCertificate");
  const certificate = await EternalDigitalHonorCertificate.deploy();
  await certificate.waitForDeployment();
  
  const contractAddress = await certificate.getAddress();
  console.log("✅ 合約部署成功！");
  console.log("📍 合約地址:", contractAddress);
  console.log("🏷️  合約名稱:", await certificate.name());
  console.log("🔖 合約符號:", await certificate.symbol());
  
  // 取得簽名者
  const [owner, alice, bob, charlie] = await ethers.getSigners();
  console.log("\n👤 參與者地址:");
  console.log("   發行者 (Owner):", owner.address);
  console.log("   Alice:", alice.address);
  console.log("   Bob:", bob.address);
  console.log("   Charlie:", charlie.address);

  // 證書類型
  const CertificateType = {
    BLOCKCHAIN_PIONEER: 0,
    ETERNAL_FRIENDSHIP: 1,
    WEB3_CITIZEN: 2,
    COURSE_COMPLETION: 3
  };

  console.log("\n🏆 步驟 2: 發行各種類型的證書");
  
  // 發行區塊鏈先驅者證書給 Alice
  console.log("\n📜 發行證書 #1: 區塊鏈先驅者證書");
  const tx1 = await certificate.issueCertificate(
    alice.address,
    CertificateType.BLOCKCHAIN_PIONEER,
    "Alice Chen",
    "Digital Certificate Authority",
    "恭喜您成為區塊鏈技術的先驅者！您的探索精神值得永久紀念。"
  );
  await tx1.wait();
  console.log("✅ 證書 #1 發行成功！接收者: Alice Chen");

  // 發行友情不滅證書給 Bob
  console.log("\n📜 發行證書 #2: 友情不滅證書");
  const tx2 = await certificate.issueCertificate(
    bob.address,
    CertificateType.ETERNAL_FRIENDSHIP,
    "Bob Wang",
    "Alice Chen",
    "我們的友誼如星辰般永恆，這份證書見證我們不變的友情！"
  );
  await tx2.wait();
  console.log("✅ 證書 #2 發行成功！接收者: Bob Wang");

  // 發行 Web3.0 公民證給 Charlie
  console.log("\n📜 發行證書 #3: Web3.0 公民證");
  const tx3 = await certificate.issueCertificate(
    charlie.address,
    CertificateType.WEB3_CITIZEN,
    "Charlie Li",
    "Web3 Community",
    "歡迎加入 Web3.0 的世界！您現在是去中心化未來的一員。"
  );
  await tx3.wait();
  console.log("✅ 證書 #3 發行成功！接收者: Charlie Li");

  // 批量發行課程完成證明
  console.log("\n📜 發行證書 #4-5: 批量發行課程完成證明");
  const tx4 = await certificate.batchIssueCertificates(
    [alice.address, bob.address],
    CertificateType.COURSE_COMPLETION,
    ["Alice Chen", "Bob Wang"],
    "區塊鏈學院",
    "恭喜完成區塊鏈開發課程！您已掌握智能合約開發技能。"
  );
  await tx4.wait();
  console.log("✅ 批量證書發行成功！接收者: Alice Chen, Bob Wang");

  console.log("\n📊 步驟 3: 查看系統統計");
  
  // 顯示統計資訊
  const totalCertificates = await certificate.getTotalCertificates();
  console.log("📈 總證書發行數量:", totalCertificates.toString());
  
  console.log("\n📋 各類型證書統計:");
  for (let i = 0; i < 4; i++) {
    const count = await certificate.certificateCount(i);
    const typeName = await certificate.getCertificateTypeNameChinese(i);
    console.log(`   ${typeName}: ${count.toString()} 張`);
  }

  console.log("\n👥 步驟 4: 查看用戶證書");
  
  // 查看 Alice 的證書
  console.log("\n🔍 Alice 的證書:");
  const aliceCertificates = await certificate.getCertificatesByOwner(alice.address);
  for (const tokenId of aliceCertificates) {
    const cert = await certificate.certificates(tokenId);
    const typeName = await certificate.getCertificateTypeNameChinese(cert.certType);
    console.log(`   Token #${tokenId}: ${typeName} - "${cert.customMessage}"`);
  }

  // 查看 Bob 的證書
  console.log("\n🔍 Bob 的證書:");
  const bobCertificates = await certificate.getCertificatesByOwner(bob.address);
  for (const tokenId of bobCertificates) {
    const cert = await certificate.certificates(tokenId);
    const typeName = await certificate.getCertificateTypeNameChinese(cert.certType);
    console.log(`   Token #${tokenId}: ${typeName} - "${cert.customMessage}"`);
  }

  // 查看 Charlie 的證書
  console.log("\n🔍 Charlie 的證書:");
  const charlieCertificates = await certificate.getCertificatesByOwner(charlie.address);
  for (const tokenId of charlieCertificates) {
    const cert = await certificate.certificates(tokenId);
    const typeName = await certificate.getCertificateTypeNameChinese(cert.certType);
    console.log(`   Token #${tokenId}: ${typeName} - "${cert.customMessage}"`);
  }

  console.log("\n🎯 步驟 5: 生成證書 Metadata");
  
  // 生成第一張證書的 metadata
  console.log("\n📄 證書 #1 的 Metadata:");
  const metadata1 = await certificate.generateMetadata(1);
  
  // 解碼 base64 metadata
  const base64Data = metadata1.replace('data:application/json;base64,', '');
  const jsonData = Buffer.from(base64Data, 'base64').toString('utf8');
  const parsedMetadata = JSON.parse(jsonData);
  
  console.log("   名稱:", parsedMetadata.name);
  console.log("   描述:", parsedMetadata.description);
  console.log("   圖片:", parsedMetadata.image);
  console.log("   屬性數量:", parsedMetadata.attributes.length);

  console.log("\n🌐 步驟 6: OpenSea 連結");
  console.log("在 OpenSea Testnet 查看證書 (Sepolia 網路):");
  for (let i = 1; i <= totalCertificates; i++) {
    console.log(`   證書 #${i}: https://testnets.opensea.io/assets/sepolia/${contractAddress}/${i}`);
  }

  console.log("\n🎉 演示完成！");
  console.log("\n📋 總結:");
  console.log(`✅ 成功部署智能合約到地址: ${contractAddress}`);
  console.log(`✅ 發行了 ${totalCertificates} 張數位證書`);
  console.log(`✅ 涵蓋 4 種不同類型的證書`);
  console.log(`✅ 支援批量發行和個別查詢`);
  console.log(`✅ 生成符合 OpenSea 標準的 metadata`);
  
  console.log("\n🔗 下一步:");
  console.log("1. 將合約部署到 Sepolia 測試網");
  console.log("2. 上傳證書圖片到 IPFS");
  console.log("3. 啟動前端應用程式");
  console.log("4. 邀請朋友領取證書！");

  console.log("\n💡 前端應用設置:");
  console.log(`請在 frontend/.env 中設置:`);
  console.log(`REACT_APP_CONTRACT_ADDRESS=${contractAddress}`);
  console.log(`REACT_APP_NETWORK_ID=11155111`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ 演示過程中發生錯誤:", error);
    process.exit(1);
  });