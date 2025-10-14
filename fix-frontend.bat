@echo off
echo ============================================
echo 🔧 前端證書載入錯誤 - 自動修復腳本
echo ============================================
echo.

echo 步驟 1: 清除前端緩存...
cd frontend
if exist node_modules\.cache (
    rmdir /s /q node_modules\.cache
    echo ✅ 緩存已清除
) else (
    echo ℹ️  沒有找到緩存目錄
)
echo.

echo 步驟 2: 驗證環境變數配置...
if exist .env (
    echo ✅ .env 文件存在
    type .env
) else (
    echo ❌ .env 文件不存在，正在創建...
    (
        echo # Sepolia 測試網配置
        echo REACT_APP_CONTRACT_ADDRESS=0x7B8DD9B91828D4A1E7167E7b21E73e014E5ae4Ed
        echo REACT_APP_NETWORK_ID=11155111
        echo REACT_APP_NETWORK_NAME=sepolia
    ) > .env
    echo ✅ .env 文件已創建
)
echo.

cd ..

echo 步驟 3: 測試合約連接...
echo.
node scripts\test-contract-functions.js
echo.

echo ============================================
echo 📋 接下來請手動執行以下操作：
echo ============================================
echo.
echo 1. 在瀏覽器中打開 http://localhost:3000 或 http://localhost:3001
echo 2. 清除瀏覽器緩存 (Ctrl+Shift+Delete)
echo 3. 強制刷新頁面 (Ctrl+Shift+R 或 Ctrl+F5)
echo 4. 確保 MetaMask 切換到 Sepolia 測試網
echo 5. 點擊 "連接 MetaMask" 按鈕
echo 6. 應該能看到您的證書了！🎉
echo.
echo ============================================
echo.

pause
