const { ethers } = require("hardhat");
const { EnhancedIPFSUploader } = require('./enhanced-ipfs-uploader');
const readline = require('readline');

// 合約 ABI (簡化版)
const CONTRACT_ABI = [
  "function issueCertificate(address recipient, uint256 certType, string memory recipientName, string memory issuerName, string memory customMessage, string memory imageURI) public returns (uint256)",
  "function batchIssueCertificates(address[] memory recipients, uint256 certType, string[] memory recipientNames, string memory issuerName, string memory customMessage) public returns (uint256[] memory)",
  "function getCertificatesByOwner(address owner) public view returns (tuple(uint256 tokenId, uint256 certType, string recipientName, string issuerName, uint256 issueDate, string customMessage, string imageURI)[])",
  "function getTotalCertificates() public view returns (uint256)",
  "function owner() public view returns (address)",
  "event CertificateIssued(uint256 indexed tokenId, address indexed recipient, uint256 certType, string recipientName)"
];

// 證書類型定義
const CERTIFICATE_TYPES = {
  0: { name: "區塊鏈先驅者證書", nameEn: "Blockchain Pioneer", emoji: "🚀" },
  1: { name: "友情不滅證書", nameEn: "Eternal Friendship", emoji: "💝" },
  2: { name: "Web3.0 公民證", nameEn: "Web3.0 Citizen", emoji: "🌐" },
  3: { name: "課程完成證明", nameEn: "Course Completion", emoji: "🎓" }
};

class CertificateIssuer {
  constructor(contractAddress, network = 'localhost') {
    this.contractAddress = contractAddress;
    this.network = network;
    this.contract = null;
    this.signer = null;
    this.uploader = new EnhancedIPFSUploader();
  }

  /**
   * 初始化合約連接
   */
  async initialize() {
    try {
      console.log('🔗 初始化合約連接...');
      
      // 獲取簽名者
      const [signer] = await ethers.getSigners();
      this.signer = signer;
      
      // 連接合約
      this.contract = new ethers.Contract(this.contractAddress, CONTRACT_ABI, signer);
      
      // 驗證連接
      const owner = await this.contract.owner();
      const signerAddress = await signer.getAddress();
      
      console.log(`✅ 合約地址: ${this.contractAddress}`);
      console.log(`✅ 簽名者地址: ${signerAddress}`);
      console.log(`✅ 合約擁有者: ${owner}`);
      
      if (owner.toLowerCase() !== signerAddress.toLowerCase()) {
        console.log('⚠️  警告: 您不是合約擁有者，可能無法發行證書');
      }
      
      return true;
    } catch (error) {
      console.error('❌ 合約初始化失敗:', error.message);
      return false;
    }
  }

  /**
   * 發行單張證書
   */
  async issueSingleCertificate(recipientData) {
    const { recipient, certType, recipientName, issuerName, customMessage } = recipientData;
    
    console.log(`\n🎯 發行證書給 ${recipientName}...`);
    console.log(`   類型: ${CERTIFICATE_TYPES[certType].emoji} ${CERTIFICATE_TYPES[certType].name}`);
    console.log(`   接收者: ${recipient}`);
    
    try {
      // 生成並上傳證書圖片
      console.log('🎨 生成證書圖片...');
      const imageURI = await this.uploader.generateAndUploadCertificate(
        certType, recipientName, issuerName, customMessage
      );
      
      // 發行證書
      console.log('📝 發送交易...');
      const tx = await this.contract.issueCertificate(
        recipient,
        certType,
        recipientName,
        issuerName,
        customMessage || `恭喜獲得 ${CERTIFICATE_TYPES[certType].name}`,
        imageURI
      );
      
      console.log(`🔄 交易已發送: ${tx.hash}`);
      console.log('⏳ 等待交易確認...');
      
      const receipt = await tx.wait();
      
      // 解析事件獲取 tokenId
      const event = receipt.logs.find(log => {
        try {
          return this.contract.interface.parseLog(log).name === 'CertificateIssued';
        } catch {
          return false;
        }
      });
      
      if (event) {
        const parsedLog = this.contract.interface.parseLog(event);
        const tokenId = parsedLog.args.tokenId.toString();
        
        console.log(`✅ 證書發行成功!`);
        console.log(`   Token ID: #${tokenId}`);
        console.log(`   Gas 使用: ${receipt.gasUsed.toString()}`);
        console.log(`   區塊號: ${receipt.blockNumber}`);
        
        // 創建並上傳 metadata (如果可能)
        if (this.uploader.hasCredentials) {
          console.log('📤 上傳 metadata...');
          await this.uploader.createAndUploadMetadata({
            tokenId,
            certType,
            recipientName,
            issuerName,
            customMessage,
            imageURI
          });
        }
        
        return { success: true, tokenId, transactionHash: tx.hash };
      } else {
        throw new Error('無法解析證書發行事件');
      }
      
    } catch (error) {
      console.error(`❌ 證書發行失敗:`, error.message);
      return { success: false, error: error.message };
    }
  }

  /**
   * 批量發行證書
   */
  async issueBatchCertificates(batchData) {
    const { recipients, certType, recipientNames, issuerName, customMessage } = batchData;
    
    console.log(`\n🎯 批量發行 ${recipients.length} 張證書...`);
    console.log(`   類型: ${CERTIFICATE_TYPES[certType].emoji} ${CERTIFICATE_TYPES[certType].name}`);
    
    try {
      console.log('📝 發送批量發行交易...');
      const tx = await this.contract.batchIssueCertificates(
        recipients,
        certType,
        recipientNames,
        issuerName,
        customMessage || `恭喜獲得 ${CERTIFICATE_TYPES[certType].name}`
      );
      
      console.log(`🔄 交易已發送: ${tx.hash}`);
      console.log('⏳ 等待交易確認...');
      
      const receipt = await tx.wait();
      
      // 解析所有發行事件
      const events = receipt.logs
        .filter(log => {
          try {
            return this.contract.interface.parseLog(log).name === 'CertificateIssued';
          } catch {
            return false;
          }
        })
        .map(log => this.contract.interface.parseLog(log));
      
      console.log(`✅ 批量發行成功!`);
      console.log(`   發行數量: ${events.length}`);
      console.log(`   Gas 使用: ${receipt.gasUsed.toString()}`);
      console.log(`   區塊號: ${receipt.blockNumber}`);
      
      // 顯示每張證書的 Token ID
      events.forEach((event, index) => {
        console.log(`   證書 ${index + 1}: Token ID #${event.args.tokenId.toString()} -> ${recipientNames[index]}`);
      });
      
      return { 
        success: true, 
        tokenIds: events.map(e => e.args.tokenId.toString()),
        transactionHash: tx.hash 
      };
      
    } catch (error) {
      console.error(`❌ 批量發行失敗:`, error.message);
      return { success: false, error: error.message };
    }
  }

  /**
   * 查詢用戶證書
   */
  async getUserCertificates(address) {
    try {
      console.log(`🔍 查詢 ${address} 的證書...`);
      
      const certificates = await this.contract.getCertificatesByOwner(address);
      
      console.log(`📋 找到 ${certificates.length} 張證書:`);
      
      certificates.forEach((cert, index) => {
        const certInfo = CERTIFICATE_TYPES[cert.certType];
        const issueDate = new Date(Number(cert.issueDate) * 1000).toLocaleDateString('zh-TW');
        
        console.log(`\n   ${index + 1}. ${certInfo.emoji} ${certInfo.name}`);
        console.log(`      Token ID: #${cert.tokenId.toString()}`);
        console.log(`      接收者: ${cert.recipientName}`);
        console.log(`      發行者: ${cert.issuerName}`);
        console.log(`      發行日期: ${issueDate}`);
        console.log(`      訊息: ${cert.customMessage}`);
      });
      
      return certificates;
    } catch (error) {
      console.error(`❌ 查詢失敗:`, error.message);
      return [];
    }
  }

  /**
   * 獲取合約統計
   */
  async getContractStats() {
    try {
      const totalCerts = await this.contract.getTotalCertificates();
      
      console.log(`📊 合約統計:`);
      console.log(`   總證書數: ${totalCerts.toString()}`);
      
      return { totalCertificates: totalCerts.toString() };
    } catch (error) {
      console.error(`❌ 統計查詢失敗:`, error.message);
      return null;
    }
  }
}

/**
 * 互動式證書發行工具
 */
async function interactiveCertificateIssuer() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (prompt) => {
    return new Promise(resolve => rl.question(prompt, resolve));
  };

  try {
    console.log('🏆 永恆數位榮譽證書發行工具');
    console.log('═'.repeat(40));
    
    // 輸入合約地址
    const contractAddress = await question('請輸入合約地址 (或按 Enter 使用預設): ');
    const finalAddress = contractAddress.trim() || "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    
    // 初始化發行器
    const issuer = new CertificateIssuer(finalAddress);
    const initialized = await issuer.initialize();
    
    if (!initialized) {
      console.log('❌ 初始化失敗，請檢查合約地址和網路連接');
      return;
    }

    while (true) {
      console.log('\n' + '─'.repeat(40));
      console.log('請選擇操作:');
      console.log('1. 發行單張證書');
      console.log('2. 批量發行證書');
      console.log('3. 查詢用戶證書');
      console.log('4. 查看合約統計');
      console.log('5. 退出');
      
      const choice = await question('請輸入選項 (1-5): ');
      
      switch (choice) {
        case '1':
          // 發行單張證書
          console.log('\n📝 發行單張證書');
          const recipient = await question('接收者地址: ');
          
          console.log('\n證書類型:');
          Object.entries(CERTIFICATE_TYPES).forEach(([key, type]) => {
            console.log(`${key}. ${type.emoji} ${type.name}`);
          });
          
          const certType = parseInt(await question('選擇證書類型 (0-3): '));
          const recipientName = await question('接收者姓名: ');
          const issuerName = await question('發行者姓名: ');
          const customMessage = await question('自定義訊息 (可留空): ');
          
          await issuer.issueSingleCertificate({
            recipient,
            certType,
            recipientName,
            issuerName,
            customMessage
          });
          break;
          
        case '2':
          // 批量發行證書
          console.log('\n📝 批量發行證書');
          console.log('請輸入接收者資訊 (格式: 地址,姓名)，每行一個，輸入空行結束:');
          
          const recipients = [];
          const recipientNames = [];
          
          while (true) {
            const input = await question('> ');
            if (!input.trim()) break;
            
            const [address, name] = input.split(',').map(s => s.trim());
            if (address && name) {
              recipients.push(address);
              recipientNames.push(name);
            }
          }
          
          if (recipients.length === 0) {
            console.log('❌ 未輸入有效的接收者資訊');
            break;
          }
          
          console.log('\n證書類型:');
          Object.entries(CERTIFICATE_TYPES).forEach(([key, type]) => {
            console.log(`${key}. ${type.emoji} ${type.name}`);
          });
          
          const batchCertType = parseInt(await question('選擇證書類型 (0-3): '));
          const batchIssuerName = await question('發行者姓名: ');
          const batchCustomMessage = await question('自定義訊息 (可留空): ');
          
          await issuer.issueBatchCertificates({
            recipients,
            certType: batchCertType,
            recipientNames,
            issuerName: batchIssuerName,
            customMessage: batchCustomMessage
          });
          break;
          
        case '3':
          // 查詢用戶證書
          const queryAddress = await question('請輸入要查詢的地址: ');
          await issuer.getUserCertificates(queryAddress);
          break;
          
        case '4':
          // 查看合約統計
          await issuer.getContractStats();
          break;
          
        case '5':
          console.log('👋 再見!');
          rl.close();
          return;
          
        default:
          console.log('❌ 無效的選項，請重新選擇');
      }
    }
    
  } catch (error) {
    console.error('❌ 發生錯誤:', error.message);
  } finally {
    rl.close();
  }
}

module.exports = { CertificateIssuer };

// 如果直接執行此腳本，啟動互動式工具
if (require.main === module) {
  interactiveCertificateIssuer().catch(console.error);
}