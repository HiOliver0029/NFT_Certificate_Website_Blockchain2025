const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

/**
 * IPFS/Pinata 整合工具
 * 用於上傳證書圖片和 metadata 到 IPFS
 */
class IPFSUploader {
  constructor(apiKey, secretApiKey) {
    this.apiKey = apiKey;
    this.secretApiKey = secretApiKey;
    this.pinataApiUrl = 'https://api.pinata.cloud';
  }

  /**
   * 上傳檔案到 IPFS
   * @param {string} filePath 檔案路徑
   * @param {string} name 檔案名稱
   * @returns {Promise<string>} IPFS Hash
   */
  async uploadFile(filePath, name) {
    try {
      const formData = new FormData();
      formData.append('file', fs.createReadStream(filePath));
      
      const metadata = JSON.stringify({
        name: name,
        keyvalues: {
          type: 'certificate-asset'
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

      console.log(`檔案上傳成功: ${name}`);
      console.log(`IPFS Hash: ${response.data.IpfsHash}`);
      console.log(`IPFS URL: https://ipfs.io/ipfs/${response.data.IpfsHash}`);
      
      return response.data.IpfsHash;
    } catch (error) {
      console.error('檔案上傳失敗:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * 上傳 JSON metadata 到 IPFS
   * @param {Object} metadata Metadata 物件
   * @param {string} name Metadata 名稱
   * @returns {Promise<string>} IPFS Hash
   */
  async uploadMetadata(metadata, name) {
    try {
      const response = await axios.post(`${this.pinataApiUrl}/pinning/pinJSONToIPFS`, metadata, {
        headers: {
          'Content-Type': 'application/json',
          'pinata_api_key': this.apiKey,
          'pinata_secret_api_key': this.secretApiKey
        }
      });

      console.log(`Metadata 上傳成功: ${name}`);
      console.log(`IPFS Hash: ${response.data.IpfsHash}`);
      console.log(`IPFS URL: https://ipfs.io/ipfs/${response.data.IpfsHash}`);
      
      return response.data.IpfsHash;
    } catch (error) {
      console.error('Metadata 上傳失敗:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * 批量上傳證書圖片
   * @param {string} imagesDir 圖片目錄
   * @returns {Promise<Object>} 圖片名稱對應 IPFS Hash 的映射
   */
  async uploadCertificateImages(imagesDir) {
    const imageHashes = {};
    
    try {
      const files = fs.readdirSync(imagesDir);
      const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|svg)$/i.test(file));
      
      for (const file of imageFiles) {
        const filePath = path.join(imagesDir, file);
        const hash = await this.uploadFile(filePath, file);
        imageHashes[path.parse(file).name] = hash;
      }
      
      return imageHashes;
    } catch (error) {
      console.error('批量上傳圖片失敗:', error);
      throw error;
    }
  }

  /**
   * 生成證書 metadata 並上傳到 IPFS
   * @param {Object} certificateData 證書資料
   * @param {string} imageHash 圖片的 IPFS Hash
   * @returns {Promise<string>} Metadata 的 IPFS Hash
   */
  async generateAndUploadMetadata(certificateData, imageHash) {
    const metadata = {
      name: `${certificateData.typeName} #${certificateData.tokenId}`,
      description: "永恆數位榮譽證書 - 基於區塊鏈的不可竄改數位證書，證明持有者的成就與榮譽。此證書具有唯一性、永久性，並可在區塊鏈上公開驗證。",
      image: `https://ipfs.io/ipfs/${imageHash}`,
      external_url: "https://your-website.com",
      attributes: [
        {
          trait_type: "Certificate Type",
          value: certificateData.typeName
        },
        {
          trait_type: "Certificate Type (Chinese)",
          value: certificateData.chineseTypeName
        },
        {
          trait_type: "Recipient",
          value: certificateData.recipientName
        },
        {
          trait_type: "Issuer",
          value: certificateData.issuerName
        },
        {
          trait_type: "Issue Date",
          value: certificateData.issueDate
        },
        {
          trait_type: "Custom Message",
          value: certificateData.customMessage
        }
      ],
      properties: {
        category: "Digital Certificate",
        subcategory: certificateData.subcategory || "Achievement",
        language: "Traditional Chinese",
        version: "1.0"
      }
    };

    return await this.uploadMetadata(metadata, `${certificateData.typeName}-${certificateData.tokenId}`);
  }
}

module.exports = IPFSUploader;

// 使用範例
if (require.main === module) {
  const uploader = new IPFSUploader(
    process.env.PINATA_API_KEY,
    process.env.PINATA_SECRET_API_KEY
  );

  // 範例：上傳 metadata
  const exampleMetadata = require('./metadata/blockchain-pioneer-example.json');
  
  uploader.uploadMetadata(exampleMetadata, 'blockchain-pioneer-example')
    .then(hash => {
      console.log('成功上傳範例 metadata');
      console.log('可以在合約中使用這個 URI:', `https://ipfs.io/ipfs/${hash}`);
    })
    .catch(console.error);
}