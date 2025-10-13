const { ethers } = require("hardhat");
require("dotenv").config();

/**
 * 環境配置驗證腳本
 */
async function validateEnvironment() {
  console.log('🔍 驗證環境配置...\n');
  
  // 1. 檢查環境變數
  console.log('📋 環境變數檢查:');
  const requiredVars = {
    'SEPOLIA_RPC_URL': process.env.SEPOLIA_RPC_URL,
    'SEPOLIA_PRIVATE_KEY': process.env.SEPOLIA_PRIVATE_KEY,
    'ETHERSCAN_API_KEY': process.env.ETHERSCAN_API_KEY
  };
  
  let hasErrors = false;
  
  for (const [key, value] of Object.entries(requiredVars)) {
    if (!value) {
      console.log(`❌ ${key}: 未設置`);
      hasErrors = true;
    } else {
      console.log(`✅ ${key}: 已設置`);
      
      // 檢查私鑰格式
      if (key === 'SEPOLIA_PRIVATE_KEY') {
        if (!value.startsWith('0x') || value.length !== 66) {
          console.log(`⚠️  私鑰格式錯誤 - 應為66字符且以0x開頭，當前長度: ${value.length}`);
          hasErrors = true;
        } else {
          console.log(`✅ 私鑰格式正確`);
        }
      }
    }
  }
  
  if (hasErrors) {
    console.log('\n❌ 環境變數設置有問題，請檢查 .env 文件');
    return false;
  }
  
  // 2. 測試 RPC 連接
  console.log('\n🌐 測試 RPC 連接...');
  try {
    const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
    const network = await provider.getNetwork();
    console.log(`✅ RPC 連接成功`);
    console.log(`   網路名稱: ${network.name}`);
    console.log(`   Chain ID: ${network.chainId}`);
    
    if (network.chainId !== 11155111n) {
      console.log(`⚠️  警告: 不是 Sepolia 測試網 (應為 11155111)`);
    }
  } catch (error) {
    console.log(`❌ RPC 連接失敗: ${error.message}`);
    return false;
  }
  
  // 3. 檢查錢包和餘額
  console.log('\n💰 檢查錢包狀態...');
  try {
    const wallet = new ethers.Wallet(process.env.SEPOLIA_PRIVATE_KEY);
    const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
    const connectedWallet = wallet.connect(provider);
    
    const address = await connectedWallet.getAddress();
    const balance = await provider.getBalance(address);
    const balanceEth = ethers.formatEther(balance);
    
    console.log(`✅ 錢包地址: ${address}`);
    console.log(`💳 餘額: ${balanceEth} ETH`);
    
    if (parseFloat(balanceEth) < 0.01) {
      console.log(`⚠️  警告: 餘額可能不足以部署合約 (建議至少 0.01 ETH)`);
      console.log('   請從以下 faucet 獲取測試 ETH:');
      console.log('   - https://sepoliafaucet.com/');
      console.log('   - https://www.infura.io/faucet/sepolia');
    } else {
      console.log(`✅ 餘額充足，可以進行部署`);
    }
  } catch (error) {
    console.log(`❌ 錢包驗證失敗: ${error.message}`);
    return false;
  }
  
  // 4. 測試 Etherscan API
  console.log('\n🔍 測試 Etherscan API...');
  try {
    const axios = require('axios');
    const response = await axios.get(`https://api-sepolia.etherscan.io/api`, {
      params: {
        module: 'account',
        action: 'balance',
        address: '0x0000000000000000000000000000000000000000',
        tag: 'latest',
        apikey: process.env.ETHERSCAN_API_KEY
      },
      timeout: 5000
    });
    
    if (response.data && response.data.status === '1') {
      console.log('✅ Etherscan API 連接成功');
    } else {
      console.log('⚠️  Etherscan API 響應異常，但不影響部署');
    }
  } catch (error) {
    console.log('⚠️  Etherscan API 測試失敗，但不影響部署');
  }
  
  console.log('\n🎉 環境驗證完成！');
  return true;
}

// 執行驗證
validateEnvironment()
  .then(success => {
    if (success) {
      console.log('\n✅ 您的環境已準備就緒，可以運行:');
      console.log('   npm run deploy:sepolia');
    } else {
      console.log('\n❌ 請修復上述問題後再試');
    }
  })
  .catch(error => {
    console.error('驗證過程發生錯誤:', error.message);
  });