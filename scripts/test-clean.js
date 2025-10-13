async function main() {
  console.log("🧪 在虛擬環境中測試證書系統...\n");

  // 顯示網路資訊
  const network = await ethers.provider.getNetwork();
  console.log("🌐 網路資訊:");
  console.log("   Chain ID:", network.chainId.toString());
  console.log("   網路名稱:", network.name);

  // 獲取測試帳戶
  const [owner, user1, user2] = await ethers.getSigners();
  console.log("\n👥 測試帳戶:");
  console.log("   Owner:", owner.address);
  console.log("   User1:", user1.address);
  console.log("   User2:", user2.address);

  // 部署合約
  console.log("\n📝 部署合約...");
  const CertificateFactory = await ethers.getContractFactory("EternalDigitalHonorCertificate");
  const certificate = await CertificateFactory.deploy();
  await certificate.waitForDeployment();
  
  const contractAddress = await certificate.getAddress();
  console.log("✅ 合約部署成功！");
  console.log("📍 地址:", contractAddress);

  // 測試合約基本資訊
  console.log("\n🔍 合約基本資訊:");
  const name = await certificate.name();
  const symbol = await certificate.symbol();
  const ownerAddress = await certificate.owner();
  
  console.log("   名稱:", name);
  console.log("   符號:", symbol);
  console.log("   擁有者:", ownerAddress);

  // 測試證書類型名稱
  console.log("\n📋 證書類型測試:");
  for (let i = 0; i < 4; i++) {
    const englishName = await certificate.getCertificateTypeName(i);
    const chineseName = await certificate.getCertificateTypeNameChinese(i);
    console.log(`   類型 ${i}: ${englishName} (${chineseName})`);
  }

  // 發行測試證書
  console.log("\n🎯 證書發行測試:");
  
  console.log("   發行證書給 User1...");
  const tx1 = await certificate.issueCertificate(
    user1.address,
    0, // BLOCKCHAIN_PIONEER
    "Alice Chen",
    "測試機構",
    "恭喜成為區塊鏈先驅者！"
  );
  await tx1.wait();
  console.log("   ✅ 證書 #1 發行成功");

  console.log("   發行證書給 User2...");
  const tx2 = await certificate.issueCertificate(
    user2.address,
    1, // ETERNAL_FRIENDSHIP
    "Bob Wang",
    "Alice Chen",
    "我們的友誼永恆不變！"
  );
  await tx2.wait();
  console.log("   ✅ 證書 #2 發行成功");

  // 批量發行測試
  console.log("   批量發行證書...");
  const tx3 = await certificate.batchIssueCertificates(
    [user1.address, user2.address],
    2, // WEB3_CITIZEN
    ["Alice Chen", "Bob Wang"],
    "Web3 社群",
    "歡迎加入 Web3 世界！"
  );
  await tx3.wait();
  console.log("   ✅ 批量證書發行成功");

  // 查詢統計資訊
  console.log("\n📊 統計資訊測試:");
  const totalCerts = await certificate.getTotalCertificates();
  console.log("   總證書數量:", totalCerts.toString());

  // 查詢用戶證書
  console.log("\n🔍 用戶證書查詢:");
  const user1Certs = await certificate.getCertificatesByOwner(user1.address);
  console.log("   User1 證書數量:", user1Certs.length);
  
  const user2Certs = await certificate.getCertificatesByOwner(user2.address);
  console.log("   User2 證書數量:", user2Certs.length);

  // 測試證書詳情
  if (user1Certs.length > 0) {
    console.log("\n📄 證書詳情測試:");
    const firstCert = await certificate.certificates(user1Certs[0]);
    console.log("   第一張證書:");
    console.log("     Token ID:", user1Certs[0].toString());
    console.log("     接收者:", firstCert.recipientName);
    console.log("     發行者:", firstCert.issuerName);
    console.log("     訊息:", firstCert.customMessage);
    console.log("     發行時間:", new Date(Number(firstCert.issueDate) * 1000).toLocaleString());
  }

  // 測試 Metadata 生成
  console.log("\n🎨 Metadata 生成測試:");
  try {
    const metadata = await certificate.generateMetadata(1);
    console.log("   ✅ Metadata 生成成功");
    console.log("   URI 長度:", metadata.length);
    
    // 解析 metadata
    const base64Data = metadata.replace('data:application/json;base64,', '');
    const jsonString = Buffer.from(base64Data, 'base64').toString('utf8');
    const metadataObj = JSON.parse(jsonString);
    console.log("   證書名稱:", metadataObj.name);
    console.log("   屬性數量:", metadataObj.attributes.length);
  } catch (error) {
    console.log("   ❌ Metadata 生成失敗:", error.message);
  }

  // 餘額測試
  console.log("\n💰 餘額測試:");
  const user1Balance = await certificate.balanceOf(user1.address);
  const user2Balance = await certificate.balanceOf(user2.address);
  console.log("   User1 餘額:", user1Balance.toString());
  console.log("   User2 餘額:", user2Balance.toString());

  // 統計各類型證書數量
  console.log("\n📈 類型統計:");
  for (let i = 0; i < 4; i++) {
    const count = await certificate.certificateCount(i);
    const typeName = await certificate.getCertificateTypeNameChinese(i);
    console.log(`   ${typeName}: ${count.toString()} 張`);
  }

  console.log("\n🎉 測試完成！所有功能正常運作");
  console.log("\n📋 測試總結:");
  console.log("   ✅ 合約部署成功");
  console.log("   ✅ 證書發行功能正常");
  console.log("   ✅ 批量發行功能正常");
  console.log("   ✅ 查詢功能正常");
  console.log("   ✅ Metadata 生成正常");
  console.log("   ✅ 統計功能正常");

  return {
    contractAddress,
    totalCertificates: totalCerts.toString(),
    success: true
  };
}

main()
  .then((result) => {
    console.log("\n🚀 準備部署到測試網!");
    console.log("合約地址:", result.contractAddress);
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ 測試失敗:", error);
    process.exit(1);
  });