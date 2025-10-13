import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';

// 導入合約 ABI (簡化版)
const CONTRACT_ABI = [
  "function issueCertificate(address recipient, uint256 certType, string memory recipientName, string memory issuerName, string memory customMessage, string memory imageURI) public",
  "function batchIssueCertificates(address[] memory recipients, uint256 certType, string[] memory recipientNames, string memory issuerName, string memory customMessage) public",
  "function getCertificatesByOwner(address owner) public view returns (tuple(uint256 tokenId, uint256 certType, string recipientName, string issuerName, uint256 issueDate, string customMessage, string imageURI)[])",
  "function getTotalCertificates() public view returns (uint256)",
  "function getCertificateCountByType(uint256 certType) public view returns (uint256)",
  "function tokenURI(uint256 tokenId) public view returns (string memory)",
  "function owner() public view returns (address)",
  "event CertificateIssued(uint256 indexed tokenId, address indexed recipient, uint256 certType, string recipientName)"
];

// 合約地址 (本地開發)
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// 證書類型
const CERTIFICATE_TYPES = {
  0: { name: "區塊鏈先驅者證書", nameEn: "Blockchain Pioneer", emoji: "🚀" },
  1: { name: "友情不滅證書", nameEn: "Eternal Friendship", emoji: "💝" },
  2: { name: "Web3.0 公民證", nameEn: "Web3.0 Citizen", emoji: "🌐" },
  3: { name: "課程完成證明", nameEn: "Course Completion", emoji: "🎓" }
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
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [activeTab, setActiveTab] = useState<'view' | 'issue'>('view');
  
  // 發行表單狀態
  const [issueForm, setIssueForm] = useState({
    recipient: '',
    certType: 0,
    recipientName: '',
    issuerName: '',
    customMessage: '',
    imageURI: ''
  });

  // 檢查 MetaMask 是否安裝
  const checkMetaMask = () => {
    if (typeof (window as any).ethereum !== 'undefined') {
      return true;
    }
    setError('請安裝 MetaMask 錢包');
    return false;
  };

  // 初始化合約
  const initializeContract = async (signer: ethers.Signer) => {
    try {
      const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      setContract(contractInstance);
      return contractInstance;
    } catch (error: any) {
      setError('合約初始化失敗: ' + error.message);
      return null;
    }
  };

  // 連接錢包
  const connectWallet = async () => {
    if (!checkMetaMask()) return;

    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      
      if (accounts.length > 0) {
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        
        setProvider(provider);
        setSigner(signer);
        setAccount(address);
        setIsConnected(true);
        setError('');
        
        // 初始化合約
        const contractInstance = await initializeContract(signer);
        if (contractInstance) {
          loadCertificates(address, contractInstance);
        }
      }
    } catch (error: any) {
      setError('連接錢包失敗: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // 載入證書
  const loadCertificates = async (address: string, contractInstance?: ethers.Contract) => {
    try {
      const contractToUse = contractInstance || contract;
      if (!contractToUse) return;

      const userCertificates = await contractToUse.getCertificatesByOwner(address);
      setCertificates(userCertificates.map((cert: any) => ({
        tokenId: Number(cert.tokenId),
        certType: Number(cert.certType),
        recipientName: cert.recipientName,
        issuerName: cert.issuerName,
        issueDate: Number(cert.issueDate),
        customMessage: cert.customMessage,
        imageURI: cert.imageURI
      })));
    } catch (error: any) {
      console.error('載入證書失敗:', error);
      setError('載入證書失敗: ' + error.message);
    }
  };

  // 發行證書
  const issueCertificate = async () => {
    if (!contract || !signer) return;

    try {
      setLoading(true);
      
      const tx = await contract.issueCertificate(
        issueForm.recipient,
        issueForm.certType,
        issueForm.recipientName,
        issueForm.issuerName,
        issueForm.customMessage,
        issueForm.imageURI || 'https://example.com/default-image.png'
      );

      await tx.wait();
      
      // 重新載入證書
      await loadCertificates(account);
      
      // 重置表單
      setIssueForm({
        recipient: '',
        certType: 0,
        recipientName: '',
        issuerName: '',
        customMessage: '',
        imageURI: ''
      });
      
      setError('');
      alert('證書發行成功！');
    } catch (error: any) {
      setError('發行證書失敗: ' + error.message);
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
    // 檢查是否已連接
    if (checkMetaMask()) {
      (window as any).ethereum.request({ method: 'eth_accounts' })
        .then(async (accounts: string[]) => {
          if (accounts.length > 0) {
            const provider = new ethers.BrowserProvider((window as any).ethereum);
            const signer = await provider.getSigner();
            
            setProvider(provider);
            setSigner(signer);
            setAccount(accounts[0]);
            setIsConnected(true);
            
            const contractInstance = await initializeContract(signer);
            if (contractInstance) {
              loadCertificates(accounts[0], contractInstance);
            }
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
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}
        
        {!isConnected ? (
          <div>
            <button 
              className="connect-button" 
              onClick={connectWallet}
              disabled={loading}
            >
              {loading ? '連接中...' : '連接 MetaMask 錢包'}
            </button>
            <p style={{ marginTop: '20px', opacity: 0.8 }}>
              請確保您已安裝 MetaMask 並切換到正確的網路
            </p>
          </div>
        ) : (
          <div className="wallet-info">
            <p>✅ 已連接錢包</p>
            <p>📍 地址: {formatAddress(account)}</p>
          </div>
        )}
      </header>

      <main className="App-main">
        {isConnected && (
          <div className="main-content">
            <div className="tab-buttons">
              <button 
                className={`tab-button ${activeTab === 'view' ? 'active' : ''}`}
                onClick={() => setActiveTab('view')}
              >
                📜 查看我的證書
              </button>
              <button 
                className={`tab-button ${activeTab === 'issue' ? 'active' : ''}`}
                onClick={() => setActiveTab('issue')}
              >
                ✨ 發行證書
              </button>
            </div>

            {activeTab === 'view' && (
              <div className="certificates-section">
                <h2>📜 我的證書 ({certificates.length})</h2>
                
                {certificates.length === 0 ? (
                  <div className="empty-state">
                    <p>🎯 您目前還沒有任何證書</p>
                    <p>點擊上方「發行證書」來創建您的第一張證書！</p>
                  </div>
                ) : (
                  <div className="certificates-grid">
                    {certificates.map((cert) => (
                      <div key={cert.tokenId} className="certificate-card">
                        <div className="cert-header">
                          <span className="cert-emoji">
                            {CERTIFICATE_TYPES[cert.certType as keyof typeof CERTIFICATE_TYPES]?.emoji}
                          </span>
                          <h3>{CERTIFICATE_TYPES[cert.certType as keyof typeof CERTIFICATE_TYPES]?.name}</h3>
                        </div>
                        <div className="cert-content">
                          <p><strong>接收者:</strong> {cert.recipientName}</p>
                          <p><strong>發行者:</strong> {cert.issuerName}</p>
                          <p><strong>發行日期:</strong> {formatDate(cert.issueDate)}</p>
                          <p><strong>訊息:</strong> {cert.customMessage}</p>
                          <p><strong>Token ID:</strong> #{cert.tokenId}</p>
                        </div>
                        <div className="cert-actions">
                          <a 
                            href={`https://testnets.opensea.io/assets/sepolia/${CONTRACT_ADDRESS}/${cert.tokenId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="opensea-link"
                          >
                            🌊 在 OpenSea 查看
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'issue' && (
              <div className="issue-section">
                <h2>✨ 發行新證書</h2>
                
                <form className="issue-form" onSubmit={(e) => { e.preventDefault(); issueCertificate(); }}>
                  <div className="form-group">
                    <label>接收者地址:</label>
                    <input
                      type="text"
                      value={issueForm.recipient}
                      onChange={(e) => setIssueForm({...issueForm, recipient: e.target.value})}
                      placeholder="0x..."
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>證書類型:</label>
                    <select
                      value={issueForm.certType}
                      onChange={(e) => setIssueForm({...issueForm, certType: parseInt(e.target.value)})}
                    >
                      {Object.entries(CERTIFICATE_TYPES).map(([key, type]) => (
                        <option key={key} value={key}>
                          {type.emoji} {type.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>接收者姓名:</label>
                    <input
                      type="text"
                      value={issueForm.recipientName}
                      onChange={(e) => setIssueForm({...issueForm, recipientName: e.target.value})}
                      placeholder="輸入接收者姓名"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>發行者姓名:</label>
                    <input
                      type="text"
                      value={issueForm.issuerName}
                      onChange={(e) => setIssueForm({...issueForm, issuerName: e.target.value})}
                      placeholder="輸入您的姓名"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>自定義訊息:</label>
                    <textarea
                      value={issueForm.customMessage}
                      onChange={(e) => setIssueForm({...issueForm, customMessage: e.target.value})}
                      placeholder="輸入證書的特殊訊息..."
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>圖片 URI (選填):</label>
                    <input
                      type="url"
                      value={issueForm.imageURI}
                      onChange={(e) => setIssueForm({...issueForm, imageURI: e.target.value})}
                      placeholder="https://..."
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="issue-button"
                    disabled={loading}
                  >
                    {loading ? '發行中...' : '🎯 發行證書'}
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {!isConnected && (
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
        <p>合約地址: {CONTRACT_ADDRESS}</p>
      </footer>
    </div>
  );
}

export default App;