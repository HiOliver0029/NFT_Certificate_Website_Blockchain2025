# 🔗 GitHub 倉庫設置指南

## 📋 第 5 步：設置 GitHub 遠程倉庫

### 🌐 1. 在 GitHub 上創建新倉庫

請按照以下步驟在 GitHub 上創建新倉庫：

1. **登入 GitHub**
   - 前往 [https://github.com](https://github.com)
   - 使用您的 GitHub 帳號登入

2. **創建新倉庫**
   - 點擊右上角的 `+` 按鈕
   - 選擇 "New repository"

3. **倉庫設置**
   - **Repository name**: `eternal-digital-honor-certificate` (建議名稱)
   - **Description**: `🎯 永恆數位榮譽證書 - 基於區塊鏈的 NFT 證書發行系統`
   - **Visibility**: 選擇 `Public` (推薦) 或 `Private`
   - **⚠️ 重要**: 不要勾選以下選項 (因為我們已經有本地倉庫了)：
     - ❌ Add a README file
     - ❌ Add .gitignore
     - ❌ Choose a license

4. **創建倉庫**
   - 點擊 `Create repository` 按鈕

### 🔧 2. 複製倉庫 URL

創建完成後，您會看到一個頁面顯示倉庫 URL，通常格式為：
```
https://github.com/YOUR_USERNAME/eternal-digital-honor-certificate.git
```

### ⚡ 3. 執行設置命令

**請將下面命令中的 `YOUR_USERNAME` 替換為您的 GitHub 用戶名**，然後在終端中執行：

```powershell
# 添加 GitHub 作為遠程倉庫
git remote add origin https://github.com/YOUR_USERNAME/eternal-digital-honor-certificate.git

# 設置主分支為 main (GitHub 預設)
git branch -M main

# 推送到 GitHub
git push -u origin main
```

### 📝 4. 完整的執行範例

假設您的 GitHub 用戶名是 `HiOliver0029`，那麼命令應該是：

```powershell
cd "C:\Users\OliverLin\OneDrive\Desktop\NFT_token"
git remote add origin https://github.com/HiOliver0029/eternal-digital-honor-certificate.git
git branch -M main
git push -u origin main
```

### 🔍 5. 驗證推送結果

推送成功後，您可以：
- 刷新 GitHub 頁面，應該能看到所有項目文件
- 檢查 README.md 是否正確顯示
- 確認所有文件和資料夾都已上傳

### 🎯 6. 後續更新

以後如果有代碼更新，使用以下命令推送：
```powershell
git add .
git commit -m "描述您的更新"
git push origin main
```

---

## ✅ 準備就緒清單

在執行 GitHub 設置前，請確認：
- [x] Git 倉庫已初始化
- [x] .gitignore 文件已創建並配置
- [x] 所有文件已添加並提交
- [ ] GitHub 倉庫已創建
- [ ] 遠程 URL 已設置
- [ ] 代碼已推送到 GitHub

**下一步**: 請按照上述步驟在 GitHub 創建倉庫，然後告訴我您的倉庫 URL，我會幫您完成剩餘的設置！