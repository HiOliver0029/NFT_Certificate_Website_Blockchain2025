const { ethers } = require("hardhat");
require("dotenv").config();

// 您最新部署的合約地址
const CONTRACT_ADDRESS = "0x7B8DD9B91828D4A1E7167E7b21E73e014E5ae4Ed";

// 簡化的合約 ABI
const CONTRACT_ABI = [
  "function issueCertificate(address to, uint8 certType, string memory recipientName, string memory issuerName, string memory customMessage) public returns (uint256)",
  "function getTotalCertificates() public view returns (uint256)",
  "function ownerOf(uint256 tokenId) public view returns (address)",
  "function tokenURI(uint256 tokenId) public view returns (string)",
  "event CertificateIssued(uint256 indexed tokenId, address indexed recipient, uint8 certType, string recipientName)"
];

// 證書類型
const CERT_TYPES = {
  0: "🚀 區塊鏈先驅者證書",
  1: "💝 友情不滅證書",
  2: "🌐 Web3.0 公民證",
  3: "🎓 課程完成證明"
};

async function issueFirstCertificate() {
  console.log('🎊 準備發行您的第一個 NFT 證書！\n');
  
  try {
    // 連接到 Sepolia
    const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
    const wallet = new ethers.Wallet(process.env.SEPOLIA_PRIVATE_KEY, provider);
    
    // 連接合約
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);
    
    console.log('📋 發行資訊:');
    console.log(`   合約地址: ${CONTRACT_ADDRESS}`);
    console.log(`   發行者地址: ${await wallet.getAddress()}`);
    console.log(`   當前已發行數量: ${await contract.getTotalCertificates()}\n`);
    
    // 第一個證書的資訊
    const certInfo = {
      recipient: await wallet.getAddress(), // 發給自己
      certType: 0, // 區塊鏈先驅者證書
      recipientName: "Oliver Lin",
      issuerName: "Eternal Digital Honor Certificate System",
      customMessage: "恭喜您成功部署並發行了第一個區塊鏈 NFT 證書！這標誌著您在 Web3 開發旅程中邁出了重要的一步。🚀"
    };
    
    console.log('🎯 證書詳情:');
    console.log(`   類型: ${CERT_TYPES[certInfo.certType]}`);
    console.log(`   接收者: ${certInfo.recipientName}`);
    console.log(`   接收地址: ${certInfo.recipient}`);
    console.log(`   發行者: ${certInfo.issuerName}`);
    console.log(`   訊息: ${certInfo.customMessage}\n`);
    
    console.log('⏳ 正在發行證書...');
    
    // 發行證書
    const tx = await contract.issueCertificate(
      certInfo.recipient,
      certInfo.certType,
      certInfo.recipientName,
      certInfo.issuerName,
      certInfo.customMessage
    );
    
    console.log(`📤 交易已提交: ${tx.hash}`);
    console.log('⏳ 等待區塊確認...');
    
    // 等待交易確認
    const receipt = await tx.wait();
    
    console.log('\n✅ 證書發行成功！\n');
    
    // 解析事件獲取 tokenId
    const event = receipt.logs.find(log => {
      try {
        return contract.interface.parseLog(log).name === 'CertificateIssued';
      } catch {
        return false;
      }
    });
    
    let tokenId;
    if (event) {
      const parsedLog = contract.interface.parseLog(event);
      tokenId = parsedLog.args.tokenId;
      console.log('🎉 證書發行詳情:');
      console.log(`   Token ID: #${tokenId}`);
      console.log(`   交易 Hash: ${receipt.hash}`);
      console.log(`   區塊號: ${receipt.blockNumber}`);
      console.log(`   Gas 使用: ${receipt.gasUsed.toString()}`);
    }
    
    // 獲取當前總數
    const totalCerts = await contract.getTotalCertificates();
    console.log(`\n📊 系統統計:`);
    console.log(`   總發行數量: ${totalCerts} 個證書`);
    
    // 提供查看連結
    console.log('\n🔍 查看您的證書:');
    console.log(`   Etherscan: https://sepolia.etherscan.io/tx/${receipt.hash}`);
    console.log(`   OpenSea: https://testnets.opensea.io/assets/sepolia/${CONTRACT_ADDRESS}/${tokenId || '1'}`);
    
    console.log('\n🎊 恭喜！您已成功發行第一個 NFT 證書！');
    console.log('💡 提示: 在 OpenSea 上查看證書可能需要幾分鐘時間。');
    
    return tokenId;
    
  } catch (error) {
    console.error('\n❌ 發行失敗:', error.message);
    if (error.data) {
      console.error('錯誤詳情:', error.data);
    }
    throw error;
  }
}

// 執行發行
issueFirstCertificate()
  .then((tokenId) => {
    console.log(`\n✨ 完成！您的第一個證書 Token ID: #${tokenId}`);
    process.exit(0);
  })
  .catch((error) => {
    console.error('執行失敗:', error);
    process.exit(1);
  });
