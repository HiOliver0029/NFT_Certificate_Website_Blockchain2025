# 🔧 前端載入證書錯誤 - 完整解決方案

## ❌ 錯誤訊息
```
載入證書失敗: could not decode result data (value="0x", info={ "method": "getCertificatesByOwner", "signature": "getCertificatesByOwner(address)" }, code=BAD_DATA, version=6.15.0)
```

## 🎯 解決步驟

### 步驟 1: 停止所有前端進程
```bash
# 在運行前端的終端按 Ctrl+C 停止
# 或關閉所有前端相關的終端窗口
```

### 步驟 2: 清除瀏覽器緩存
在瀏覽器中按：
- **Windows/Linux**: `Ctrl + Shift + Delete`
- **Mac**: `Command + Shift + Delete`

選擇清除：
- ✅ 緩存的圖片和文件
- ✅ Cookie 和其他網站數據

時間範圍：**最近 1 小時**

### 步驟 3: 清除 React 緩存
```bash
cd C:\Users\OliverLin\OneDrive\Desktop\NFT_token\frontend
rmdir /s /q node_modules\.cache
```

### 步驟 4: 重新啟動前端
```bash
cd C:\Users\OliverLin\OneDrive\Desktop\NFT_token
npm run frontend
```

### 步驟 5: 強制刷新瀏覽器
訪問 http://localhost:3000 或 http://localhost:3001

按：
- **Windows/Linux**: `Ctrl + Shift + R` 或 `Ctrl + F5`
- **Mac**: `Command + Shift + R`

### 步驟 6: 重新連接 MetaMask
1. 在頁面上點擊「連接 MetaMask」
2. 確保 MetaMask 切換到 **Sepolia 測試網**
3. 授權連接
4. 應該能看到您的證書了！🎉

## 🔍 如果還是不行

### 檢查 1: 確認合約地址
```bash
# 運行驗證腳本
node scripts\test-contract-functions.js
```

應該看到：
```
✅ 總證書數: 1
✅ 用戶證書數量: 1
✅ 證書 Token IDs: [1]
```

### 檢查 2: 查看瀏覽器控制台
1. 按 `F12` 打開開發者工具
2. 切換到 `Console` 標籤
3. 查看是否有錯誤訊息
4. 截圖並報告錯誤

### 檢查 3: 確認環境變數
```bash
# 檢查前端環境變數
type frontend\.env
```

應該看到：
```
REACT_APP_CONTRACT_ADDRESS=0x7B8DD9B91828D4A1E7167E7b21E73e014E5ae4Ed
REACT_APP_NETWORK_ID=11155111
REACT_APP_NETWORK_NAME=sepolia
```

### 檢查 4: 驗證 MetaMask 配置
- ✅ 網路：Sepolia Test Network
- ✅ 地址：0x0165A7de108b2adE352a71eBf15e25864ffE60E3
- ✅ 餘額：應該有 ETH（至少一些）

## 🚨 快速修復命令

一鍵執行所有修復步驟：

```powershell
# 1. 停止前端 (Ctrl+C)
# 2. 清除緩存並重啟
cd C:\Users\OliverLin\OneDrive\Desktop\NFT_token\frontend
if exist node_modules\.cache rmdir /s /q node_modules\.cache
cd ..
npm run frontend
```

## 📝 修改的關鍵文件

### 1. frontend/src/App.tsx
```typescript
// 修改後的 loadCertificates 函數
const loadCertificates = async (address: string, contractInstance?: ethers.Contract) => {
  try {
    const contractToUse = contractInstance || contract;
    if (!contractToUse) return;

    // 獲取用戶的所有 token ID
    const tokenIds = await contractToUse.getCertificatesByOwner(address);
    
    if (tokenIds.length === 0) {
      setCertificates([]);
      return;
    }

    // 為每個 token ID 獲取完整的證書資訊
    const certificatesData = await Promise.all(
      tokenIds.map(async (tokenId: bigint) => {
        const cert = await contractToUse.certificates(tokenId);
        return {
          tokenId: Number(tokenId),
          certType: Number(cert.certType),
          recipientName: cert.recipientName,
          issuerName: cert.issuerName,
          issueDate: Number(cert.issueDate),
          customMessage: cert.customMessage,
          imageURI: cert.imageURI
        };
      })
    );
    
    setCertificates(certificatesData);
  } catch (error: any) {
    console.error('載入證書失敗:', error);
    setError('載入證書失敗: ' + error.message);
  }
};
```

### 2. frontend/src/config.js
```javascript
// 更新後的 CONTRACT_ABI
export const CONTRACT_ABI = [
  "function getCertificatesByOwner(address owner) public view returns (uint256[])",
  "function certificates(uint256 tokenId) public view returns (uint8 certType, string recipientName, string issuerName, uint256 issueDate, string customMessage, string imageURI)",
  // ... 其他函數
];
```

### 3. frontend/.env
```
REACT_APP_CONTRACT_ADDRESS=0x7B8DD9B91828D4A1E7167E7b21E73e014E5ae4Ed
REACT_APP_NETWORK_ID=11155111
REACT_APP_NETWORK_NAME=sepolia
```

## ✅ 預期結果

修復後，您應該能在前端看到：

```
🎊 您的證書
──────────────────
📜 證書 #1
   類型: 🚀 區塊鏈先驅者證書
   接收者: Oliver Lin
   發行者: Eternal Digital Honor Certificate System
   發行日期: 2025/10/14
   訊息: 恭喜您成功部署並發行了第一個區塊鏈 NFT 證書！
```

## 🆘 還是有問題？

請提供以下資訊：
1. 瀏覽器控制台的完整錯誤訊息
2. `node scripts\test-contract-functions.js` 的輸出
3. `type frontend\.env` 的輸出
4. MetaMask 當前連接的網路和地址

## 📞 支援

如果問題持續存在，請檢查：
- MetaMask 是否正確切換到 Sepolia
- 合約地址是否正確
- 網路連接是否正常
- 是否有足夠的測試 ETH

---

**💡 提示**: 大多數情況下，清除瀏覽器緩存並強制刷新就能解決問題！
