async function main() {
  console.log("🚀 測試永恆數位榮譽證書系統...\n");

  // 在本地網路測試合約
  const [owner, alice, bob] = await ethers.getSigners();
  
  console.log("👤 測試帳戶:");
  console.log("   Owner:", owner.address);
  console.log("   Alice:", alice.address);
  console.log("   Bob:", bob.address);

  // 部署合約
  console.log("\n📝 部署合約...");
  const EternalDigitalHonorCertificate = await ethers.getContractFactory("EternalDigitalHonorCertificate");
  const certificate = await EternalDigitalHonorCertificate.deploy();
  
  console.log("✅ 合約部署成功！地址:", await certificate.getAddress());
  console.log("🏷️  合約名稱:", await certificate.name());
  console.log("🔖 合約符號:", await certificate.symbol());

  // 發行證書
  console.log("\n📜 發行測試證書...");
  const tx = await certificate.issueCertificate(
    alice.address,
    0, // BLOCKCHAIN_PIONEER
    "Alice Chen",
    "測試發行者",
    "這是一張測試證書！"
  );
  await tx.wait();
  
  console.log("✅ 證書發行成功！");
  
  // 查詢證書
  const totalCerts = await certificate.getTotalCertificates();
  const aliceCerts = await certificate.getCertificatesByOwner(alice.address);
  
  console.log("📊 統計資訊:");
  console.log("   總證書數量:", totalCerts.toString());
  console.log("   Alice 的證書數量:", aliceCerts.length);
  
  if (aliceCerts.length > 0) {
    const cert = await certificate.certificates(aliceCerts[0]);
    console.log("   第一張證書詳情:");
    console.log("     接收者:", cert.recipientName);
    console.log("     發行者:", cert.issuerName);
    console.log("     訊息:", cert.customMessage);
  }

  console.log("\n🎉 測試完成！合約功能正常運作。");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ 測試失敗:", error);
    process.exit(1);
  });