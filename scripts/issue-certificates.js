const { ethers } = require("hardhat");

async function main() {
  // 合約地址 (部署後請更新)
  const contractAddress = process.env.CONTRACT_ADDRESS || "YOUR_CONTRACT_ADDRESS";
  
  if (contractAddress === "YOUR_CONTRACT_ADDRESS") {
    console.log("請先設定 CONTRACT_ADDRESS 環境變數");
    return;
  }

  // 獲取合約實例
  const EternalDigitalHonorCertificate = await ethers.getContractFactory("EternalDigitalHonorCertificate");
  const certificate = EternalDigitalHonorCertificate.attach(contractAddress);

  // 取得簽名者
  const [owner] = await ethers.getSigners();
  console.log("發行者地址:", owner.address);

  // 證書類型
  const CertificateType = {
    BLOCKCHAIN_PIONEER: 0,
    ETERNAL_FRIENDSHIP: 1,
    WEB3_CITIZEN: 2,
    COURSE_COMPLETION: 3
  };

  // 發行證書範例
  const certificates = [
    {
      recipient: "0x1234567890123456789012345678901234567890", // 接收者地址
      certType: CertificateType.BLOCKCHAIN_PIONEER,
      recipientName: "Alice",
      issuerName: "Digital Certificate Authority",
      customMessage: "恭喜您成為區塊鏈技術的先驅者！"
    },
    {
      recipient: "0x2345678901234567890123456789012345678901", // 接收者地址
      certType: CertificateType.ETERNAL_FRIENDSHIP,
      recipientName: "Bob",
      issuerName: "Alice",
      customMessage: "友誼長存，永不凋零！"
    },
    {
      recipient: "0x3456789012345678901234567890123456789012", // 接收者地址
      certType: CertificateType.WEB3_CITIZEN,
      recipientName: "Charlie",
      issuerName: "Web3 Community",
      customMessage: "歡迎加入 Web3.0 的世界！"
    }
  ];

  console.log("\n開始發行證書...");

  for (let i = 0; i < certificates.length; i++) {
    const cert = certificates[i];
    
    try {
      console.log(`\n發行第 ${i + 1} 張證書:`);
      console.log(`接收者: ${cert.recipientName} (${cert.recipient})`);
      console.log(`類型: ${await certificate.getCertificateTypeName(cert.certType)}`);
      
      const tx = await certificate.issueCertificate(
        cert.recipient,
        cert.certType,
        cert.recipientName,
        cert.issuerName,
        cert.customMessage
      );
      
      console.log("交易哈希:", tx.hash);
      
      const receipt = await tx.wait();
      console.log("證書發行成功！Gas 使用量:", receipt.gasUsed.toString());
      
      // 獲取 tokenId
      const logs = receipt.logs;
      const tokenId = logs.find(log => log.fragment?.name === 'CertificateIssued')?.args[0];
      
      if (tokenId) {
        console.log("Token ID:", tokenId.toString());
        
        // 生成並顯示 metadata
        const metadata = await certificate.generateMetadata(tokenId);
        console.log("Metadata URI:", metadata);
      }
      
    } catch (error) {
      console.error(`發行第 ${i + 1} 張證書失敗:`, error.message);
    }
  }

  // 顯示統計資訊
  console.log("\n=== 發行統計 ===");
  const totalCertificates = await certificate.getTotalCertificates();
  console.log("總證書數量:", totalCertificates.toString());

  for (let i = 0; i < 4; i++) {
    const count = await certificate.certificateCount(i);
    const typeName = await certificate.getCertificateTypeNameChinese(i);
    console.log(`${typeName}: ${count.toString()} 張`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });