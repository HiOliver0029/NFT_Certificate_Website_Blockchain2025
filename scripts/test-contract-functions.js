const { ethers } = require("hardhat");
require("dotenv").config();

const CONTRACT_ADDRESS = "0x7B8DD9B91828D4A1E7167E7b21E73e014E5ae4Ed";

async function testContractFunctions() {
  console.log('🧪 測試合約函數...\n');
  
  try {
    // 連接到 Sepolia
    const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
    const wallet = new ethers.Wallet(process.env.SEPOLIA_PRIVATE_KEY, provider);
    
    // 合約 ABI
    const CONTRACT_ABI = [
      "function getCertificatesByOwner(address owner) public view returns (uint256[])",
      "function certificates(uint256 tokenId) public view returns (uint8 certType, string recipientName, string issuerName, uint256 issueDate, string customMessage, string imageURI)",
      "function getTotalCertificates() public view returns (uint256)",
      "function balanceOf(address owner) public view returns (uint256)"
    ];
    
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);
    const address = await wallet.getAddress();
    
    console.log('📋 測試資訊:');
    console.log(`   合約地址: ${CONTRACT_ADDRESS}`);
    console.log(`   測試地址: ${address}\n`);
    
    // 測試 1: 獲取總證書數
    console.log('測試 1: getTotalCertificates()');
    const totalCerts = await contract.getTotalCertificates();
    console.log(`✅ 總證書數: ${totalCerts}\n`);
    
    // 測試 2: 獲取用戶餘額
    console.log('測試 2: balanceOf()');
    const balance = await contract.balanceOf(address);
    console.log(`✅ 用戶證書數量: ${balance}\n`);
    
    // 測試 3: 獲取用戶的證書 token IDs
    console.log('測試 3: getCertificatesByOwner()');
    const tokenIds = await contract.getCertificatesByOwner(address);
    console.log(`✅ 證書 Token IDs: [${tokenIds.join(', ')}]\n`);
    
    // 測試 4: 獲取每個證書的詳細資訊
    if (tokenIds.length > 0) {
      console.log('測試 4: 獲取證書詳細資訊');
      for (const tokenId of tokenIds) {
        const cert = await contract.certificates(tokenId);
        console.log(`\n📜 證書 #${tokenId}:`);
        console.log(`   類型: ${cert.certType}`);
        console.log(`   接收者: ${cert.recipientName}`);
        console.log(`   發行者: ${cert.issuerName}`);
        console.log(`   發行日期: ${new Date(Number(cert.issueDate) * 1000).toLocaleString('zh-TW')}`);
        console.log(`   訊息: ${cert.customMessage}`);
        console.log(`   圖片 URI: ${cert.imageURI}`);
      }
    }
    
    console.log('\n✅ 所有測試完成！');
    console.log('\n💡 前端現在應該可以正常載入證書了');
    console.log('   請重新啟動前端應用: npm run frontend');
    
  } catch (error) {
    console.error('\n❌ 測試失敗:', error.message);
    if (error.data) {
      console.error('錯誤詳情:', error.data);
    }
  }
}

testContractFunctions()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
