import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';

// 合約 ABI (編譯後從 artifacts 獲取)
const CONTRACT_ABI = [
  // 這裡會是完整的合約 ABI，暫時使用簡化版本
  "function issueCertificate(address to, uint8 certType, string memory recipientName, string memory issuerName, string memory customMessage) public returns (uint256)",
  "function getCertificatesByOwner(address owner) public view returns (uint256[] memory)",
  "function certificates(uint256 tokenId) public view returns (uint8 certType, string memory recipientName, string memory issuerName, uint256 issueDate, string memory customMessage, string memory imageURI)",
  "function getCertificateTypeName(uint8 certType) public pure returns (string memory)",
  "function getCertificateTypeNameChinese(uint8 certType) public pure returns (string memory)",
  "function generateMetadata(uint256 tokenId) public view returns (string memory)",
  "function balanceOf(address owner) public view returns (uint256)",
  "function getTotalCertificates() public view returns (uint256)"
];

// 合約地址 (部署後需要更新)
const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS || '';

// 證書類型
const CERTIFICATE_TYPES = {
  BLOCKCHAIN_PIONEER: 0,
  ETERNAL_FRIENDSHIP: 1,
  WEB3_CITIZEN: 2,
  COURSE_COMPLETION: 3
};

interface Certificate {
  tokenId: number;
  certType: number;
  recipientName: string;
  issuerName: string;
  issueDate: number;
  customMessage: string;
  imageURI: string;
}

function App() {
  const [account, setAccount] = useState<string>('');
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCertificates, setTotalCertificates] = useState(0);

  // 證書類型名稱映射
  const certificateTypeNames = {
    0: { en: 'Blockchain Pioneer Certificate', zh: '區塊鏈先驅者證書' },
    1: { en: 'Eternal Friendship Certificate', zh: '友情不滅證書' },
    2: { en: 'Web3.0 Citizen Certificate', zh: 'Web3.0 公民證' },
    3: { en: 'Course Completion Certificate', zh: '區塊鏈課程完成證明' }
  };

  // 連接錢包
  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        const signer = await provider.getSigner();
        
        setProvider(provider);
        setAccount(accounts[0]);
        
        if (CONTRACT_ADDRESS) {
          const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
          setContract(contract);
          
          // 載入用戶證書
          await loadUserCertificates(contract, accounts[0]);
          // 載入總證書數量
          const total = await contract.getTotalCertificates();
          setTotalCertificates(Number(total));
        }
      } else {
        alert('請安裝 MetaMask!');
      }
    } catch (error) {
      console.error('連接錢包失敗:', error);
      alert('連接錢包失敗，請重試');
    }
  };

  // 載入用戶證書
  const loadUserCertificates = async (contract: ethers.Contract, userAccount: string) => {
    try {
      setLoading(true);
      const tokenIds = await contract.getCertificatesByOwner(userAccount);
      const userCertificates: Certificate[] = [];

      for (const tokenId of tokenIds) {
        const cert = await contract.certificates(tokenId);
        userCertificates.push({
          tokenId: Number(tokenId),
          certType: cert.certType,
          recipientName: cert.recipientName,
          issuerName: cert.issuerName,
          issueDate: Number(cert.issueDate),
          customMessage: cert.customMessage,
          imageURI: cert.imageURI
        });
      }

      setCertificates(userCertificates);
    } catch (error) {
      console.error('載入證書失敗:', error);
    } finally {
      setLoading(false);
    }
  };

  // 格式化地址
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // 格式化日期
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('zh-TW');
  };

  useEffect(() => {
    // 檢查是否已連接錢包
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.request({ method: 'eth_accounts' }).then((accounts: string[]) => {
        if (accounts.length > 0) {
          connectWallet();
        }
      });
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🏆 永恆數位榮譽證書</h1>
        <p>基於區塊鏈的 NFT 證書發行系統</p>
        
        {!account ? (
          <button className="connect-button" onClick={connectWallet}>
            連接 MetaMask 錢包
          </button>
        ) : (
          <div className="wallet-info">
            <p>✅ 已連接錢包: {formatAddress(account)}</p>
            <p>📊 系統總證書數量: {totalCertificates}</p>
          </div>
        )}
      </header>

      <main className="App-main">
        {account && (
          <div className="certificates-section">
            <h2>🎯 我的證書收藏</h2>
            
            {loading ? (
              <div className="loading">載入中...</div>
            ) : certificates.length > 0 ? (
              <div className="certificates-grid">
                {certificates.map((cert) => (
                  <div key={cert.tokenId} className="certificate-card">
                    <div className="certificate-header">
                      <h3>{certificateTypeNames[cert.certType as keyof typeof certificateTypeNames]?.zh}</h3>
                      <span className="token-id">#{cert.tokenId}</span>
                    </div>
                    
                    <div className="certificate-body">
                      <div className="certificate-image">
                        {cert.imageURI ? (
                          <img src={cert.imageURI} alt="證書圖片" />
                        ) : (
                          <div className="placeholder-image">🏆</div>
                        )}
                      </div>
                      
                      <div className="certificate-details">
                        <p><strong>接收者:</strong> {cert.recipientName}</p>
                        <p><strong>發行者:</strong> {cert.issuerName}</p>
                        <p><strong>發行日期:</strong> {formatDate(cert.issueDate)}</p>
                        <p><strong>訊息:</strong> {cert.customMessage}</p>
                      </div>
                    </div>
                    
                    <div className="certificate-actions">
                      <button 
                        className="view-opensea-button"
                        onClick={() => {
                          const openSeaUrl = `https://testnets.opensea.io/assets/sepolia/${CONTRACT_ADDRESS}/${cert.tokenId}`;
                          window.open(openSeaUrl, '_blank');
                        }}
                      >
                        在 OpenSea 查看
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-certificates">
                <p>您還沒有任何證書</p>
                <p>請聯繫證書發行者獲取您的專屬證書</p>
              </div>
            )}
          </div>
        )}

        {!account && (
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
            
            <div className="certificate-types">
              <h3>🏅 支援的證書類型</h3>
              <div className="types-grid">
                <div className="type-card">
                  <h4>區塊鏈先驅者證書</h4>
                  <p>紀念您在區塊鏈領域的先驅精神</p>
                </div>
                <div className="type-card">
                  <h4>友情不滅證書</h4>
                  <p>永恆友誼的數位紀念章</p>
                </div>
                <div className="type-card">
                  <h4>Web3.0 公民證</h4>
                  <p>Web3 社群成員身分證明</p>
                </div>
                <div className="type-card">
                  <h4>課程完成證明</h4>
                  <p>學習成就的永久記錄</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="App-footer">
        <p>© 2025 永恆數位榮譽證書 | 基於 Ethereum 區塊鏈</p>
        {CONTRACT_ADDRESS && (
          <p>合約地址: {formatAddress(CONTRACT_ADDRESS)}</p>
        )}
      </footer>
    </div>
  );
}

export default App;