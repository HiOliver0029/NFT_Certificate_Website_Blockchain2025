# 部署和使用指南

## 📋 部署前準備

### 1. 環境設置
```bash
# 複製環境變數檔案
cp .env.example .env
```

在 `.env` 檔案中填入以下資訊：
- `SEPOLIA_RPC_URL`: Sepolia 測試網 RPC URL (推薦使用 Infura)
- `SEPOLIA_PRIVATE_KEY`: 部署者錢包的私鑰
- `ETHERSCAN_API_KEY`: Etherscan API 金鑰 (用於合約驗證)
- `PINATA_API_KEY`: Pinata API 金鑰
- `PINATA_SECRET_API_KEY`: Pinata 秘密金鑰

### 2. 獲取測試 ETH
訪問 [Sepolia Faucet](https://sepoliafaucet.com/) 獲取測試 ETH

## 🚀 部署步驟

### 1. 編譯合約
```bash
npx hardhat compile
```

### 2. 部署到 Sepolia 測試網
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### 3. 記錄合約地址
部署成功後，將合約地址保存到 `.env` 檔案：
```
REACT_APP_CONTRACT_ADDRESS=0x你的合約地址
```

### 4. (可選) 驗證合約
```bash
npx hardhat verify --network sepolia 你的合約地址
```

## 🎨 準備證書圖片

### 1. 設計證書圖片
在 `images/` 目錄中放入 4 種證書類型的圖片：
- `blockchain-pioneer.png`
- `eternal-friendship.png`
- `web3-citizen.png`
- `course-completion.png`

### 2. 上傳圖片到 IPFS
```bash
node scripts/ipfs-uploader.js
```

### 3. 更新合約中的圖片 URI
使用合約的 `updateCertificateImage` 函數更新圖片連結。

## 📜 發行證書

### 1. 使用腳本發行
編輯 `scripts/issue-certificates.js` 中的接收者地址，然後執行：
```bash
CONTRACT_ADDRESS=你的合約地址 npx hardhat run scripts/issue-certificates.js --network sepolia
```

### 2. 直接調用合約函數
```javascript
await certificate.issueCertificate(
  "0x接收者地址",
  0, // 證書類型 (0-3)
  "接收者姓名",
  "發行者姓名",
  "自定義訊息"
);
```

## 🌐 啟動前端

### 1. 安裝前端依賴
```bash
cd frontend
npm install
```

### 2. 啟動開發伺服器
```bash
npm start
```

### 3. 使用前端
1. 確保安裝了 Metamask
2. 切換到 Sepolia 測試網
3. 連接錢包
4. 查看您的證書

## 🔍 在 OpenSea 查看

證書發行後，可以在以下位置查看：
```
https://testnets.opensea.io/assets/sepolia/你的合約地址/TokenID
```

## 📊 常用操作

### 查看證書統計
```bash
npx hardhat console --network sepolia
```

在控制台中：
```javascript
const contract = await ethers.getContractAt("EternalDigitalHonorCertificate", "你的合約地址");
const total = await contract.getTotalCertificates();
console.log("總證書數量:", total.toString());
```

### 查看用戶證書
```javascript
const userCertificates = await contract.getCertificatesByOwner("用戶地址");
console.log("用戶證書:", userCertificates);
```

### 生成證書 Metadata
```javascript
const metadata = await contract.generateMetadata(tokenId);
console.log("證書 Metadata:", metadata);
```

## 🛠 故障排除

### 1. 合約編譯失敗
- 檢查 Solidity 版本是否正確
- 確保 OpenZeppelin 依賴已安裝

### 2. 部署失敗
- 檢查錢包是否有足夠的 ETH
- 確認 RPC URL 和私鑰正確

### 3. 前端連接失敗
- 檢查 Metamask 是否安裝
- 確認網路是否為 Sepolia
- 檢查合約地址是否正確

### 4. IPFS 上傳失敗
- 檢查 Pinata API 金鑰
- 確認網路連接正常
- 檢查檔案大小是否超限

## 🎯 最佳實踐

1. **安全性**
   - 不要將私鑰提交到版本控制
   - 使用測試網進行開發
   - 正式環境前進行充分測試

2. **Gas 優化**
   - 批量發行證書以節省 Gas
   - 在低 Gas 價格時進行操作

3. **用戶體驗**
   - 提供清晰的錯誤訊息
   - 實時顯示交易狀態
   - 支援多種錢包

4. **維護**
   - 定期備份 IPFS 內容
   - 監控合約狀態
   - 更新前端依賴

## 📈 擴展功能

1. **多語言支援**
   - 添加英文界面
   - 支援更多語言

2. **進階功能**
   - 證書轉讓功能
   - 批量操作界面
   - 證書模板系統

3. **整合服務**
   - 郵件通知
   - 社交媒體分享
   - 統計分析

## 🆘 技術支援

如果遇到問題，請：
1. 檢查本指南中的故障排除部分
2. 查看 GitHub Issues
3. 聯繫開發團隊