# 🔧 環境變數設置完整指南

## 📋 概述

本專案需要設置多個環境變數來支援不同的功能。以下是完整的設置流程和真實範例。

## 🚀 快速設置流程

### 1. 創建 .env 文件
```bash
# 在專案根目錄中
copy .env.example .env
```

### 2. 逐步填入各項設定

## 📝 詳細設置步驟

### 🌐 Step 1: 獲取 Infura RPC URL

**目的**: 連接到 Ethereum Sepolia 測試網

**步驟**:
1. 前往 [Infura.io](https://infura.io/)
2. 註冊帳號並登入
3. 點擊 "Create New Key"
4. 選擇 "Web3 API"
5. 命名專案 (例如: "NFT Certificate")
6. 複製 Project ID

**設置範例**:
```bash
# ✅ 正確格式
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/abc123def456ghi789jkl012mno345pq

# ❌ 錯誤格式
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID
```

### 🔑 Step 2: 設置私鑰

**目的**: 部署合約和發行證書

**⚠️ 安全警告**: 僅用於測試網！不要使用包含真實資金的錢包！

**獲取步驟**:
1. 打開 MetaMask
2. 點擊帳戶名稱旁的三個點
3. 選擇 "Account Details"
4. 點擊 "Export Private Key"
5. 輸入 MetaMask 密碼
6. 複製私鑰 (以 0x 開頭的 64 字符串)

**設置範例**:
```bash
# ✅ 正確格式 (示例，請勿使用)
SEPOLIA_PRIVATE_KEY=0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef

# ❌ 錯誤格式
SEPOLIA_PRIVATE_KEY=your_private_key_here
```

### 🔍 Step 3: Etherscan API 金鑰

**目的**: 驗證智能合約代碼

**步驟**:
1. 前往 [Etherscan.io](https://etherscan.io/)
2. 註冊並登入帳號 
3. 前往 [API Keys 頁面](https://etherscan.io/myapikey)
4. 點擊 "Add" 創建新的 API Key
5. 命名 (例如: "NFT Certificate Verification")
6. 複製 API Key

**設置範例**:
```bash
# ✅ 正確格式
ETHERSCAN_API_KEY=ABC123DEF456GHI789JKL012MNO345PQ

# ❌ 錯誤格式
ETHERSCAN_API_KEY=your_etherscan_api_key
```

### 📁 Step 4: Pinata IPFS 設置 (可選)

**目的**: 上傳證書圖片到 IPFS

**步驟**:
1. 前往 [Pinata.cloud](https://pinata.cloud/)
2. 註冊免費帳號
3. 前往 [API Keys](https://app.pinata.cloud/keys)
4. 點擊 "New Key"
5. 選擇權限 (Admin 或 Pinning)
6. 命名 (例如: "NFT Certificate Images")
7. 複製 API Key 和 Secret

**設置範例**:
```bash
# ✅ 正確格式
PINATA_API_KEY=abc123def456ghi789jkl012
PINATA_SECRET_API_KEY=xyz789uvw456rst123opq456mno789pqr012

# ❌ 錯誤格式
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_API_KEY=your_pinata_secret_key
```

**注意**: 如果不設置 Pinata，系統將使用預設圖片 URL，功能仍可正常運作。

### 📱 Step 5: 前端配置 (部署後設置)

**目的**: 前端應用連接正確的合約

**這些變數在合約部署後才能填入**:
```bash
# 部署合約後會自動顯示這些信息
REACT_APP_CONTRACT_ADDRESS=0x1234567890123456789012345678901234567890
REACT_APP_NETWORK_ID=11155111
```

## 💰 測試 ETH 獲取

### Sepolia 測試網 Faucet
部署合約需要測試 ETH，可從以下 faucet 獲取：

1. **Infura Faucet**: https://www.infura.io/faucet/sepolia
2. **Alchemy Faucet**: https://sepoliafaucet.com/
3. **Chainlink Faucet**: https://faucets.chain.link/sepolia

**步驟**:
1. 複製您的錢包地址
2. 前往任一 faucet 網站
3. 貼上地址並請求測試 ETH
4. 等待 1-2 分鐘接收

## 📄 完整的 .env 範例

```bash
# =============================================================================
# 永恆數位榮譽證書 - 環境變數配置
# =============================================================================

# 🌐 Ethereum Sepolia 測試網配置
# 從 Infura 獲取: https://infura.io/
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/abc123def456ghi789jkl012mno345pq

# 🔑 部署者私鑰 (⚠️  僅用於測試網！)
# 從 MetaMask 導出私鑰
SEPOLIA_PRIVATE_KEY=0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef

# 🔍 Etherscan API (用於合約驗證)
# 從 Etherscan.io 獲取: https://etherscan.io/myapikey
ETHERSCAN_API_KEY=ABC123DEF456GHI789JKL012MNO345PQ

# 📁 IPFS/Pinata 配置 (可選，不設置會使用預設圖片)
# 從 Pinata.cloud 獲取: https://app.pinata.cloud/keys
PINATA_API_KEY=abc123def456ghi789jkl012
PINATA_SECRET_API_KEY=xyz789uvw456rst123opq456mno789pqr012

# 📱 前端配置 (部署合約後填入)
# 這些值會在運行 npm run deploy:sepolia 後自動顯示
REACT_APP_CONTRACT_ADDRESS=
REACT_APP_NETWORK_ID=11155111

# =============================================================================
# 設置完成後，執行以下命令測試:
# npm run deploy:sepolia
# =============================================================================
```

## 🧪 驗證設置

### 1. 檢查配置
```bash
# 檢查 RPC 連接
node -e "console.log('RPC URL:', process.env.SEPOLIA_RPC_URL)"
```

### 2. 測試部署
```bash
# 部署到測試網
npm run deploy:sepolia
```

### 3. 檢查結果
成功部署後會看到類似輸出：
```
🚀 開始部署到 Sepolia 測試網...
📋 部署資訊:
  部署者地址: 0x742d35Cc6634C0532925a3b8D4d2E3e2c9f8b9D5a
  部署者餘額: 0.0485 ETH
  網路: sepolia
  Chain ID: 11155111

✅ 部署完成!
📍 合約地址: 0x1234567890123456789012345678901234567890
```

## ❌ 常見錯誤與解決

### 1. "insufficient funds for gas"
**問題**: 測試 ETH 不足
**解決**: 從 faucet 獲取更多測試 ETH

### 2. "invalid project id"
**問題**: Infura Project ID 錯誤
**解決**: 檢查 RPC URL 格式和 Project ID

### 3. "private key format is invalid"
**問題**: 私鑰格式錯誤
**解決**: 確保私鑰以 0x 開頭，共 66 字符

### 4. "network does not match"
**問題**: 網路配置錯誤
**解決**: 確保 MetaMask 切換到 Sepolia 測試網

## 🔒 安全提醒

1. **絕不要在生產環境使用包含真實資金的私鑰**
2. **不要將 .env 文件提交到 Git**
3. **定期更換 API 金鑰**
4. **僅在測試網環境使用**

## 📞 需要幫助？

如果遇到問題，請提供以下信息：
- 錯誤訊息截圖
- .env 文件內容 (⚠️ **請移除私鑰部分**)
- 執行的命令
- 錢包地址和餘額

---

**🎯 設置完成後，您就可以開始使用完整的 NFT 證書系統了！**