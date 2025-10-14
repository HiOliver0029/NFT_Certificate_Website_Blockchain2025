const { ethers } = require("hardhat");
require("dotenv").config();

/**
 * 估算 NFT 發行的 Gas 成本
 */
async function estimateGasCost() {
  console.log('💰 估算 NFT 發行成本...\n');
  
  try {
    // 連接到 Sepolia
    const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
    const wallet = new ethers.Wallet(process.env.SEPOLIA_PRIVATE_KEY, provider);
    
    // 獲取當前錢包資訊
    const address = await wallet.getAddress();
    const balance = await provider.getBalance(address);
    const balanceEth = ethers.formatEther(balance);
    
    console.log('📊 錢包狀態:');
    console.log(`   地址: ${address}`);
    console.log(`   當前餘額: ${balanceEth} ETH\n`);
    
    // 獲取當前 Gas 價格
    const feeData = await provider.getFeeData();
    const gasPrice = feeData.gasPrice;
    const gasPriceGwei = ethers.formatUnits(gasPrice, 'gwei');
    
    console.log('⛽ 當前 Gas 價格:');
    console.log(`   ${gasPriceGwei} Gwei\n`);
    
    // NFT 發行的估算 Gas 使用量
    const mintGasEstimate = 150000n; // 一般 NFT mint 約 100k-200k gas
    
    // 計算成本
    const estimatedCost = gasPrice * mintGasEstimate;
    const estimatedCostEth = ethers.formatEther(estimatedCost);
    
    console.log('📝 單次 NFT 發行估算:');
    console.log(`   估算 Gas 使用: ${mintGasEstimate.toLocaleString()} gas`);
    console.log(`   估算成本: ${estimatedCostEth} ETH`);
    console.log(`   約等於: $${(parseFloat(estimatedCostEth) * 2000).toFixed(4)} USD (假設 ETH = $2000)\n`);
    
    // 計算可以發行多少次
    const canMint = Math.floor(parseFloat(balanceEth) / parseFloat(estimatedCostEth));
    
    console.log('🎯 根據當前餘額:');
    console.log(`   當前餘額: ${balanceEth} ETH`);
    console.log(`   可發行次數: 約 ${canMint} 次\n`);
    
    // 不同數量的總成本
    console.log('💵 批量發行成本估算:');
    const quantities = [1, 5, 10, 20, 50, 100];
    for (const qty of quantities) {
      const totalCost = parseFloat(estimatedCostEth) * qty;
      console.log(`   ${qty.toString().padStart(3)} 個證書: ${totalCost.toFixed(6)} ETH`);
    }
    
    console.log('\n📌 重要提示:');
    console.log('   • 實際成本取決於當時的 Gas 價格');
    console.log('   • 複雜的 metadata 可能需要更多 Gas');
    console.log('   • 建議保留一些餘額作為緩衝');
    
    // 檢查是否需要更多 ETH
    if (parseFloat(balanceEth) < 0.01) {
      console.log('\n⚠️  警告: 餘額偏低!');
      console.log('   建議從 faucet 獲取更多測試 ETH');
      console.log('   推薦: https://sepolia-faucet.pk910.de/');
    } else if (parseFloat(balanceEth) < 0.05) {
      console.log('\n✅ 餘額足夠進行基本測試');
      console.log('   如需大量測試，建議獲取更多 ETH');
    } else {
      console.log('\n✅ 餘額充足，可以進行正常開發測試!');
    }
    
  } catch (error) {
    console.error('❌ 估算過程發生錯誤:', error.message);
  }
}

estimateGasCost()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
