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
複製 `.env.example` 到 `.env` 並填入以下資訊：
- `SEPOLIA_RPC_URL`: Sepolia 測試網 RPC URL (可使用 Infura)
- `SEPOLIA_PRIVATE_KEY`: 部署者的私鑰
- `ETHERSCAN_API_KEY`: Etherscan API 金鑰 (用於合約驗證)
- `PINATA_API_KEY`: Pinata API 金鑰 (用於 IPFS)
- `PINATA_SECRET_API_KEY`: Pinata 秘密金鑰

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

### 發行者流程
1. 部署智能合約到 Sepolia 測試網
2. 準備證書圖片並上傳到 IPFS
3. 使用 `issueCertificate()` 函數發行證書
4. 將證書發送給接收者

### 接收者流程
1. 連接 Metamask 錢包
2. 在前端應用中查看自己的證書
3. 在 OpenSea testnet 上展示證書
4. 分享證書給其他人驗證

## 開發計劃

- [x] 智能合約開發
- [x] Metadata 結構設計
- [x] IPFS 整合工具
- [ ] React 前端應用
- [ ] Metamask 整合
- [ ] 部署到測試網
- [ ] OpenSea 測試

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

## 限制與延伸

### 當前限制
- 僅支援 4 種預定義證書類型
- 圖片 URI 需要手動更新
- 發行權限集中於合約擁有者

### 未來延伸
- 支援自定義證書類型
- 分散式發行權限管理
- 證書轉讓和交易功能
- 多鏈部署支援
- 證書失效機制

## 貢獻指南

歡迎提交 Issue 和 Pull Request 來改進這個專案！

## 授權

MIT License - 詳見 LICENSE 文件