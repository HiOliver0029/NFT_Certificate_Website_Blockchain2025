# ⚠️ Relative Path 目錄說明

## 📋 狀態：已棄用 (Deprecated)

這個 `relative path` 目錄是在專案開發初期創建的舊版本 Hardhat 專案，由於以下原因已被棄用：

### 🔍 存在的問題

1. **版本衝突**
   - 使用了不相容的 `@nomicfoundation/hardhat-toolbox-viem`
   - Node.js 版本要求與系統不匹配
   - TypeScript 配置問題

2. **依賴錯誤**
   - `"type": "module"` 設置導致 CommonJS 和 ESM 混用問題
   - 缺少必要的 ethers.js 插件
   - hardhat/config 模組無法找到

3. **配置衝突**
   - hardhat.config.ts 使用了過時的 API
   - 網路配置不完整
   - 環境變數處理方式不當

4. **Ignition 模組 ESM/CommonJS 衝突** ✅ **新發現並已解決**
   - `ignition/modules/*.ts` 文件使用 ES6 import 語法
   - package.json 移除 `"type": "module"` 後變成 CommonJS 環境
   - TypeScript 文件中的 `import` 語法與 CommonJS 不相容
   - 錯誤信息: "CommonJS module whose imports will produce 'require' calls"

5. **測試文件依賴和框架衝突** ✅ **新發現並已解決**
   - `test/EternalDigitalHonorCertificate.ts` 缺少測試框架依賴
   - 缺少 `chai`, `@types/mocha`, `@types/node` 等依賴
   - 錯誤的 ethers 導入: `import { ethers } from "hardhat"` (hardhat 不直接導出 ethers)
   - 缺少 typechain-types 生成的類型定義
   - `test/Counter.ts` 使用 Viem 框架，與主目錄的 ethers.js 配置不相容

### ✅ 解決方案

我們創建了新的主目錄配置來解決這些問題：

#### 主目錄 (`NFT_token/`) - 正確版本
```
NFT_token/
├── package.json          ✅ 使用相容的依賴版本
├── hardhat.config.js     ✅ 簡化的 JavaScript 配置
├── contracts/            ✅ 智能合約
├── scripts/              ✅ 部署和測試腳本
└── frontend/             ✅ React 前端應用
```

#### Relative Path (`relative path/`) - 已棄用
```
relative path/
├── package.json          ❌ 版本衝突
├── hardhat.config.ts     ❌ TypeScript 配置錯誤
├── contracts/            ❌ 重複的合約文件
└── ...                   ❌ 不建議使用
```

### 🚀 正確的使用方式

**請使用主目錄中的配置：**

```bash
# 激活虛擬環境
conda activate nft-certificate

# 進入主目錄
cd "C:\Users\OliverLin\OneDrive\Desktop\NFT_token"

# 編譯合約
npm run compile

# 運行測試
npm run demo

# 部署合約
npm run deploy:sepolia
```

### 📚 學習要點

這個錯誤的存在說明了以下重要概念：

1. **環境管理的重要性**
   - 使用 Conda 虛擬環境隔離依賴
   - 避免系統級的版本衝突

2. **配置文件的簡化**
   - JavaScript 配置比 TypeScript 更穩定
   - 避免過度複雜的配置

3. **依賴版本的相容性**
   - 選擇經過測試的穩定版本
   - 避免使用實驗性功能

### 🔧 技術細節

#### 錯誤示例
```typescript
// relative path/hardhat.config.ts - 有問題的配置
import type { HardhatUserConfig } from "hardhat/config";  // ❌ 找不到模組
import { configVariable } from "hardhat/config";          // ❌ 找不到模組
```

#### 正確配置
```javascript
// NFT_token/hardhat.config.js - 正確的配置
require("@nomicfoundation/hardhat-ethers");  // ✅ 正確的導入
require("dotenv/config");                    // ✅ 環境變數支援
```

#### Ignition 模組問題與解決
```typescript
// relative path/ignition/modules/EternalDigitalHonorCertificate.ts - 有問題
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules"; // ❌ ESM import 在 CommonJS 環境
export default EternalDigitalHonorCertificateModule; // ❌ ES6 export
```

```javascript
// 修復後: relative path/ignition/modules/EternalDigitalHonorCertificate.js - 已修復
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules"); // ✅ CommonJS require
module.exports = EternalDigitalHonorCertificateModule; // ✅ CommonJS export
```

#### 測試文件問題與解決
```typescript
// relative path/test/EternalDigitalHonorCertificate.ts - 有問題
import { expect } from "chai";              // ❌ 缺少 chai 依賴
import { ethers } from "hardhat";           // ❌ hardhat 不直接導出 ethers
import { EternalDigitalHonorCertificate } from "../typechain-types"; // ❌ 缺少類型生成
describe("Test", function () {              // ❌ 缺少 @types/mocha
```

```javascript
// 修復後: relative path/test/EternalDigitalHonorCertificate.js - 已修復
// 創建棄用說明，指導用戶使用主目錄的正確測試
console.log("請使用主目錄中的測試文件"); // ✅ 提供正確指導
```

### 💡 結論

這個錯誤目錄的存在實際上是一個很好的學習案例，展示了：
- 如何識別和解決版本衝突
- 虛擬環境的重要性
- 配置文件的最佳實踐
- 專案結構的優化

**建議：保留此目錄作為反面教材，但所有開發工作請在主目錄進行。**