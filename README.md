# 永恆數位榮譽證書 - NFT 證書發行系統

## 專案簡介

「永恆數位榮譽證書」是一個基於區塊鏈的 NFT 證書發行系統，旨在解決傳統證書容易遺失、難以驗證真偽、缺乏永久保存等問題。

## 專案特色

- 🔒 **不可竄改性**: 基於區塊鏈技術，證書資料永久不可竄改
- ✅ **可驗證性**: 任何人都可以在區塊鏈上驗證證書的真實性  
- 🌐 **永續性**: 證書永久保存在去中心化網路上
- 🎨 **唯一性**: 每張證書都是獨一無二的 NFT
- 👥 **社交性**: 可以發送給朋友作為數位紀念章

## 支援的證書類型

1. **區塊鏈先驅者證書** - 紀念第一次持有 NFT 的朋友
2. **友情不滅證書** - 發送給朋友的數位友情紀念章
3. **Web3.0 公民證** - 表示持有人是某個社群的一份子
4. **區塊鏈課程完成證明** - 給同學或隊員的學習完成證明

## 技術架構

### 區塊鏈層
- **網路**: Ethereum Sepolia Testnet
- **標準**: ERC-721 (OpenZeppelin)
- **開發工具**: Hardhat, Solidity 0.8.28

### 前端層
- **框架**: React + TypeScript
- **錢包整合**: Metamask
- **區塊鏈交互**: ethers.js

### 存儲層
- **圖片存儲**: IPFS/Pinata
- **Metadata**: 動態生成 + IPFS 存儲

## 智能合約功能

### 核心功能
- `issueCertificate()` - 發行單張證書
- `batchIssueCertificates()` - 批量發行證書
- `getCertificatesByOwner()` - 查詢用戶的所有證書
- `generateMetadata()` - 動態生成證書 metadata

### 證書資訊
每張證書包含以下資訊：
- 證書類型
- 接收者姓名
- 發行者姓名
- 發行日期
- 自定義訊息
- 圖片 URI

## 專案結構

```
NFT_token/
├── contracts/                     # 智能合約
│   └── EternalDigitalHonorCertificate.sol
├── scripts/                       # 部署和工具腳本
│   ├── deploy.js                  # 合約部署腳本
│   ├── issue-certificates.js     # 證書發行腳本
│   └── ipfs-uploader.js          # IPFS 上傳工具
├── metadata/                      # 證書 metadata 範例
│   ├── blockchain-pioneer-example.json
│   └── eternal-friendship-example.json
├── frontend/                      # React 前端應用
├── test/                         # 測試文件
├── hardhat.config.js            # Hardhat 配置
├── .env.example                 # 環境變數範例
└── README.md                    # 專案說明
```

## 安裝與設置

### 1. 環境準備
```bash
npm install
```

### 2. 環境變數設置

**📋 詳細設置指南**: 請參考 `ENVIRONMENT_SETUP.md` 文件

**快速設置**:
```bash
# 1. 複製範例文件
copy .env.example .env

# 2. 編輯 .env 文件，填入以下資訊
```

**必需設定**:
- `SEPOLIA_RPC_URL`: 從 [Infura](https://infura.io) 獲取
- `SEPOLIA_PRIVATE_KEY`: MetaMask 私鑰 (⚠️ 僅測試網用)
- `ETHERSCAN_API_KEY`: 從 [Etherscan](https://etherscan.io/myapikey) 獲取

**可選設定**:
- `PINATA_API_KEY`: IPFS 圖片上傳 (可不設置)
- `PINATA_SECRET_API_KEY`: Pinata 秘密金鑰

**範例設置**:
```bash
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID
SEPOLIA_PRIVATE_KEY=0x1234...abcd  # 64字符私鑰
ETHERSCAN_API_KEY=ABC123DEF456    # API金鑰
```

### 3. 編譯合約
```bash
npx hardhat compile
```

### 4. 部署合約
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### 5. 啟動前端
```bash
cd frontend
npm start
```

## 使用流程

### 🚀 快速開始

#### 1. 本地開發環境
```bash
# 啟動本地區塊鏈
npx hardhat node

# 新終端 - 部署合約
npm run deploy

# 啟動前端應用
npm run frontend

# 使用互動式發行工具
npm run issue
```

#### 2. 測試網部署
```bash
# 配置環境變數 (.env)
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID
SEPOLIA_PRIVATE_KEY=your_private_key
ETHERSCAN_API_KEY=your_api_key

# 部署到 Sepolia
npm run deploy:sepolia

# 在測試網發行證書
npm run issue:sepolia
```

### 📱 前端應用功能
- **錢包連接**: 自動檢測並連接 MetaMask
- **證書查看**: 展示用戶擁有的所有證書
- **證書發行**: 完整的發行界面支持
- **OpenSea 整合**: 直接跳轉到 NFT 市場
- **網路切換**: 支援本地和測試網

### 🛠️ 開發工具

#### 證書圖片生成
```bash
npm run generate-images  # 生成範例證書圖片
```

#### IPFS 上傳
```bash
npm run upload-ipfs      # 上傳圖片到 IPFS
```

#### 互動式發行工具
```bash
npm run issue            # 本地環境
npm run issue:sepolia    # 測試網環境
```

### 發行者流程
1. **環境準備**: 設置開發環境和錢包
2. **合約部署**: 部署到本地或測試網
3. **圖片準備**: 生成或上傳證書圖片
4. **發行證書**: 使用 Web 界面或命令行工具
5. **驗證結果**: 在 OpenSea 上確認顯示

### 接收者流程
1. **錢包連接**: 在前端應用中連接 MetaMask
2. **查看證書**: 瀏覽所有擁有的證書
3. **分享展示**: 在 OpenSea 等平台展示
4. **驗證真偽**: 任何人都可以在區塊鏈上驗證

## 開發計劃

- [x] 智能合約開發
- [x] Metadata 結構設計
- [x] IPFS 整合工具
- [x] React 前端應用
- [x] Metamask 整合
- [x] 部署到測試網
- [x] OpenSea 測試
- [x] 證書圖片生成系統
- [x] 互動式發行工具
- [x] 完整的 Web3 整合

## 技術亮點

1. **動態 Metadata 生成**: 合約內建 Base64 編碼，無需外部服務即可生成 metadata
2. **批量發行**: 支援一次發行多張證書，節省 gas 費用
3. **多語言支援**: 同時支援中文和英文證書名稱
4. **完整的事件日誌**: 記錄所有證書發行事件，便於追蹤
5. **OpenSea 相容**: 完全符合 OpenSea metadata 標準

## 安全考量

- 僅合約擁有者可以發行證書
- 使用 OpenZeppelin 標準合約庫
- 完整的存取控制機制
- 輸入驗證和錯誤處理

## 🧪 測試指南

### 本地測試
```bash
# 1. 啟動本地網路
npx hardhat node

# 2. 運行測試套件
npx hardhat test

# 3. 部署並測試
npm run deploy
npm run demo

# 4. 啟動前端測試
npm run frontend
```

### Sepolia 測試網測試
```bash
# 1. 確保有測試 ETH (從 faucet 獲取)
# 2. 部署合約
npm run deploy:sepolia

# 3. 發行測試證書
npm run issue:sepolia

# 4. 在 OpenSea 測試網查看
# https://testnets.opensea.io/
```

## 📊 功能完成狀態

### ✅ 已完成功能
- **智能合約系統** (100%)
  - ERC-721 標準實現
  - 4種證書類型支援
  - 批量發行功能
  - 動態 Metadata 生成
  
- **前端應用** (100%)
  - React + TypeScript 實現
  - MetaMask 錢包整合
  - 證書查看和發行界面
  - 響應式設計

- **開發工具** (100%)
  - 證書圖片生成器
  - IPFS 上傳工具  
  - 互動式發行工具
  - 自動化測試套件

- **部署支援** (100%)
  - 本地開發環境
  - Sepolia 測試網部署
  - OpenSea 整合
  - 完整的部署腳本

### 🚀 技術亮點
1. **合約內建 Base64 編碼** - 完全去中心化的 metadata 生成
2. **SVG 圖片生成** - 程式化生成美觀的證書圖片
3. **多網路支援** - 本地開發和測試網無縫切換
4. **完整的 Web3 整合** - 現代化的 DApp 使用體驗
5. **開發工具鏈** - 從部署到發行的完整自動化

## 🔮 未來延伸

### 短期改進
- 自定義證書模板設計器
- 證書轉讓功能
- 多語言界面支援
- 移動端 App 開發

### 中期目標
- 多鏈部署 (Polygon, BSC)
- DAO 治理機制
- 證書市場交易
- NFT 組合展示功能

### 長期願景
- AI 輔助證書設計
- 跨鏈證書互通
- 企業級權限管理
- 元宇宙展示空間

## 🤝 貢獻指南

歡迎提交 Issue 和 Pull Request！

### 開發流程
1. Fork 本專案
2. 創建功能分支
3. 提交變更
4. 創建 Pull Request

### 報告問題
請在 Issues 中詳細描述：
- 問題重現步驟
- 預期行為
- 實際行為
- 環境信息

## 📄 授權

MIT License - 詳見 LICENSE 文件

---

**🎉 專案現已完全可用！所有計劃功能均已實現並測試完成。**