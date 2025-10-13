const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const { generateCertificateImage } = require('./generate-certificate-images');
require('dotenv').config();

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_API_KEY = process.env.PINATA_SECRET_API_KEY;

/**
 * 增強版 IPFS/Pinata 整合工具
 * 支持證書圖片生成和上傳，以及 metadata 管理
 */
class EnhancedIPFSUploader {
  constructor() {
    this.apiKey = PINATA_API_KEY;
    this.secretApiKey = PINATA_SECRET_API_KEY;
    this.pinataApiUrl = 'https://api.pinata.cloud';
    this.hasCredentials = !!(this.apiKey && this.secretApiKey);
    
    if (!this.hasCredentials) {
      console.log('⚠️  未設置 PINATA API 金鑰，將使用預設圖片 URL');
      console.log('   如需上傳到 IPFS，請在 .env 文件中設置:');
      console.log('   PINATA_API_KEY=your_api_key');
      console.log('   PINATA_SECRET_API_KEY=your_secret_key');
    }
  }

  /**
   * 上傳檔案到 IPFS
   */
  async uploadFile(filePath, name) {
    if (!this.hasCredentials) {
      throw new Error('未設置 PINATA API 金鑰');
    }

    try {
      const formData = new FormData();
      formData.append('file', fs.createReadStream(filePath));
      
      const metadata = JSON.stringify({
        name: name,
        keyvalues: {
          type: 'certificate-asset',
          timestamp: new Date().toISOString()
        }
      });
      formData.append('pinataMetadata', metadata);

      const response = await axios.post(`${this.pinataApiUrl}/pinning/pinFileToIPFS`, formData, {
        maxBodyLength: 'Infinity',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'pinata_api_key': this.apiKey,
          'pinata_secret_api_key': this.secretApiKey
        }
      });

      const ipfsHash = response.data.IpfsHash;
      console.log(`✅ 檔案上傳成功: ${name}`);
      console.log(`   IPFS Hash: ${ipfsHash}`);
      console.log(`   IPFS URL: https://ipfs.io/ipfs/${ipfsHash}`);
      
      return ipfsHash;
    } catch (error) {
      console.error(`❌ 檔案上傳失敗 (${name}):`, error.message);
      throw error;
    }
  }

  /**
   * 上傳 JSON metadata 到 IPFS
   */
  async uploadJSON(jsonData, name) {
    if (!this.hasCredentials) {
      console.log('🔄 使用本地 metadata (未上傳到 IPFS)');
      return null;
    }

    try {
      const response = await axios.post(`${this.pinataApiUrl}/pinning/pinJSONToIPFS`, jsonData, {
        headers: {
          'Content-Type': 'application/json',
          'pinata_api_key': this.apiKey,
          'pinata_secret_api_key': this.secretApiKey
        }
      });

      const ipfsHash = response.data.IpfsHash;
      console.log(`✅ JSON 上傳成功: ${name}`);
      console.log(`   IPFS Hash: ${ipfsHash}`);
      console.log(`   IPFS URL: https://ipfs.io/ipfs/${ipfsHash}`);
      
      return ipfsHash;
    } catch (error) {
      console.error(`❌ JSON 上傳失敗 (${name}):`, error.message);
      throw error;
    }
  }

  /**
   * 生成並上傳證書圖片
   */
  async generateAndUploadCertificate(certType, recipientName, issuerName, customMessage = '') {
    console.log(`🎨 生成證書圖片: 類型 ${certType}, 接收者 ${recipientName}`);
    
    // 生成 SVG
    const svgContent = generateCertificateImage(certType, recipientName, issuerName, customMessage);
    
    // 創建臨時檔案
    const tempDir = path.join(__dirname, '..', 'temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    
    const tempFileName = `cert_${Date.now()}_${certType}.svg`;
    const tempFilePath = path.join(tempDir, tempFileName);
    
    try {
      // 寫入臨時檔案
      fs.writeFileSync(tempFilePath, svgContent, 'utf8');
      
      if (this.hasCredentials) {
        // 上傳到 IPFS
        const ipfsHash = await this.uploadFile(tempFilePath, `certificate-${recipientName}-${certType}`);
        return `https://ipfs.io/ipfs/${ipfsHash}`;
      } else {
        // 返回預設圖片 URL
        const defaultImages = {
          0: 'https://example.com/blockchain-pioneer.svg',
          1: 'https://example.com/eternal-friendship.svg', 
          2: 'https://example.com/web3-citizen.svg',
          3: 'https://example.com/course-completion.svg'
        };
        console.log(`🖼️  使用預設圖片 URL: ${defaultImages[certType]}`);
        return defaultImages[certType];
      }
    } finally {
      // 清理臨時檔案
      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath);
      }
    }
  }

  /**
   * 上傳現有的證書圖片範例
   */
  async uploadSampleCertificates() {
    const certificatesDir = path.join(__dirname, '..', 'images', 'certificates');
    
    if (!fs.existsSync(certificatesDir)) {
      console.log('❌ 證書圖片目錄不存在，請先運行 generate-certificate-images.js');
      return {};
    }

    const results = {};
    const files = fs.readdirSync(certificatesDir).filter(file => file.endsWith('.svg'));
    
    console.log(`📁 找到 ${files.length} 個證書圖片文件`);
    
    for (const file of files) {
      const filePath = path.join(certificatesDir, file);
      
      try {
        if (this.hasCredentials) {
          const ipfsHash = await this.uploadFile(filePath, file);
          results[file] = `https://ipfs.io/ipfs/${ipfsHash}`;
        } else {
          results[file] = `https://example.com/${file}`;
          console.log(`🖼️  ${file} -> ${results[file]} (預設 URL)`);
        }
      } catch (error) {
        console.error(`❌ 上傳失敗: ${file}`, error.message);
        results[file] = `https://example.com/${file}`;
      }
    }
    
    return results;
  }

  /**
   * 創建完整的證書 metadata 並上傳
   */
  async createAndUploadMetadata(certData) {
    const { tokenId, certType, recipientName, issuerName, customMessage, imageURI } = certData;
    
    const certificateTypes = {
      0: { name: "區塊鏈先驅者證書", nameEn: "Blockchain Pioneer Certificate" },
      1: { name: "友情不滅證書", nameEn: "Eternal Friendship Certificate" },
      2: { name: "Web3.0 公民證", nameEn: "Web3.0 Citizen Certificate" }, 
      3: { name: "課程完成證明", nameEn: "Course Completion Certificate" }
    };

    const cert = certificateTypes[certType] || certificateTypes[0];
    
    const metadata = {
      name: `${cert.name} #${tokenId}`,
      description: `${customMessage || `頒發給 ${recipientName} 的${cert.name}`}\n\n發行者: ${issuerName}\n發行時間: ${new Date().toLocaleDateString('zh-TW')}\n\n此證書已永久記錄於以太坊區塊鏈上，可隨時驗證其真實性。`,
      image: imageURI,
      external_url: "https://eternal-certificate.example.com",
      attributes: [
        {
          trait_type: "Certificate Type",
          value: cert.nameEn
        },
        {
          trait_type: "Recipient",
          value: recipientName
        },
        {
          trait_type: "Issuer", 
          value: issuerName
        },
        {
          trait_type: "Issue Date",
          value: new Date().toISOString().split('T')[0]
        },
        {
          trait_type: "Certificate ID",
          value: certType.toString()
        }
      ]
    };

    if (this.hasCredentials) {
      try {
        const metadataHash = await this.uploadJSON(metadata, `metadata-${tokenId}`);
        return `https://ipfs.io/ipfs/${metadataHash}`;
      } catch (error) {
        console.error('❌ Metadata 上傳失敗，使用本地數據');
        return null;
      }
    } else {
      console.log('🔄 創建本地 metadata 文件');
      
      // 保存到本地
      const metadataDir = path.join(__dirname, '..', 'metadata');
      if (!fs.existsSync(metadataDir)) {
        fs.mkdirSync(metadataDir, { recursive: true });
      }
      
      const metadataFile = path.join(metadataDir, `token-${tokenId}.json`);
      fs.writeFileSync(metadataFile, JSON.stringify(metadata, null, 2), 'utf8');
      console.log(`📝 本地 metadata 已保存: ${metadataFile}`);
      
      return null;
    }
  }

  /**
   * 測試連接
   */
  async testConnection() {
    if (!this.hasCredentials) {
      console.log('ℹ️  未設置 PINATA 憑證，無法測試連接');
      return false;
    }

    try {
      const response = await axios.get(`${this.pinataApiUrl}/data/testAuthentication`, {
        headers: {
          'pinata_api_key': this.apiKey,
          'pinata_secret_api_key': this.secretApiKey
        }
      });
      
      console.log('✅ PINATA 連接測試成功');
      return true;
    } catch (error) {
      console.error('❌ PINATA 連接測試失敗:', error.message);
      return false;
    }
  }
}

module.exports = { EnhancedIPFSUploader };

// 如果直接執行此腳本，進行測試
if (require.main === module) {
  async function test() {
    const uploader = new EnhancedIPFSUploader();
    
    console.log('🧪 測試 IPFS 上傳器...');
    
    // 測試連接
    await uploader.testConnection();
    
    // 上傳範例圖片
    console.log('\n📤 上傳證書圖片範例...');
    const imageResults = await uploader.uploadSampleCertificates();
    
    console.log('\n🎯 上傳結果:');
    Object.entries(imageResults).forEach(([file, url]) => {
      console.log(`  ${file}: ${url}`);
    });
    
    console.log('\n🎉 測試完成!');
  }
  
  test().catch(console.error);
}