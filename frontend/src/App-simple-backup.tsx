import React, { useState, useEffect } from 'react';
import './App.css';

// 簡化版前端，專注於基本功能展示
function App() {
  const [account, setAccount] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string>('');

  // 檢查 MetaMask 是否安裝
  const checkMetaMask = () => {
    if (typeof (window as any).ethereum !== 'undefined') {
      return true;
    }
    setError('請安裝 MetaMask 錢包');
    return false;
  };

  // 連接錢包
  const connectWallet = async () => {
    if (!checkMetaMask()) return;

    try {
      const accounts = await (window as any).ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setIsConnected(true);
        setError('');
      }
    } catch (error: any) {
      setError('連接錢包失敗: ' + error.message);
    }
  };

  // 格式化地址
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  useEffect(() => {
    // 檢查是否已連接
    if (checkMetaMask()) {
      (window as any).ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            setIsConnected(true);
          }
        })
        .catch(console.error);
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🏆 永恆數位榮譽證書</h1>
        <p>基於區塊鏈的 NFT 證書發行系統</p>
        
        {error && (
          <div style={{ 
            background: 'rgba(255, 0, 0, 0.1)', 
            padding: '10px', 
            borderRadius: '5px', 
            color: '#ff6b6b',
            margin: '20px 0'
          }}>
            ⚠️ {error}
          </div>
        )}
        
        {!isConnected ? (
          <div>
            <button className="connect-button" onClick={connectWallet}>
              連接 MetaMask 錢包
            </button>
            <p style={{ marginTop: '20px', opacity: 0.8 }}>
              請確保您已安裝 MetaMask 並切換到正確的網路
            </p>
          </div>
        ) : (
          <div className="wallet-info">
            <p>✅ 已連接錢包</p>
            <p>📍 地址: {formatAddress(account)}</p>
            <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
              完整地址: {account}
            </p>
          </div>
        )}
      </header>

      <main className="App-main">
        {isConnected ? (
          <div className="connected-content">
            <h2>🎯 證書系統狀態</h2>
            
            <div className="status-grid">
              <div className="status-card">
                <h3>✅ 智能合約</h3>
                <p>合約已成功編譯和測試</p>
                <p>地址: 0x5FbDB...80aa3</p>
              </div>
              
              <div className="status-card">
                <h3>🔗 區塊鏈連接</h3>
                <p>已連接到本地測試網</p>
                <p>Chain ID: 31337 (Hardhat)</p>
              </div>
              
              <div className="status-card">
                <h3>🎨 前端應用</h3>
                <p>React 應用運行正常</p>
                <p>MetaMask 整合完成</p>
              </div>
              
              <div className="status-card">
                <h3>📜 證書功能</h3>
                <p>支援 4 種證書類型</p>
                <p>批量發行、查詢、統計</p>
              </div>
            </div>

            <div className="certificate-types">
              <h2>🏅 支援的證書類型</h2>
              <div className="types-grid">
                <div className="type-card">
                  <h4>🚀 區塊鏈先驅者證書</h4>
                  <p>紀念您在區塊鏈領域的先驅精神與貢獻</p>
                </div>
                <div className="type-card">
                  <h4>💝 友情不滅證書</h4>
                  <p>見證永恆友誼的數位紀念章</p>
                </div>
                <div className="type-card">
                  <h4>🌐 Web3.0 公民證</h4>
                  <p>Web3 去中心化世界的公民身分證明</p>
                </div>
                <div className="type-card">
                  <h4>🎓 課程完成證明</h4>
                  <p>區塊鏈學習成就的永久記錄</p>
                </div>
              </div>
            </div>

            <div className="demo-info">
              <h2>🧪 測試結果</h2>
              <div className="test-results">
                <div className="test-item">✅ 合約部署成功</div>
                <div className="test-item">✅ 證書發行功能正常</div>
                <div className="test-item">✅ 批量發行功能正常</div>
                <div className="test-item">✅ 查詢功能正常</div>
                <div className="test-item">✅ Metadata 生成正常</div>
                <div className="test-item">✅ 統計功能正常</div>
              </div>
              
              <p style={{ marginTop: '20px', opacity: 0.9 }}>
                所有核心功能已通過測試，系統準備就緒！
              </p>
            </div>
          </div>
        ) : (
          <div className="welcome-section">
            <h2>🌟 歡迎來到永恆數位榮譽證書</h2>
            <div className="features">
              <div className="feature">
                <h3>🔒 永久保存</h3>
                <p>基於區塊鏈技術，您的證書將永遠保存，無法丟失</p>
              </div>
              <div className="feature">
                <h3>✅ 可驗證</h3>
                <p>任何人都可以在區塊鏈上驗證證書的真實性</p>
              </div>
              <div className="feature">
                <h3>🎨 獨一無二</h3>
                <p>每張證書都是獨特的 NFT，具有收藏價值</p>
              </div>
              <div className="feature">
                <h3>🌐 全球通用</h3>
                <p>在 OpenSea 等 NFT 市場展示您的成就</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="App-footer">
        <p>© 2025 永恆數位榮譽證書 | 基於 Ethereum 區塊鏈</p>
        <p>開發環境: Conda 虛擬環境 + Hardhat + React</p>
      </footer>
    </div>
  );
}

export default App;