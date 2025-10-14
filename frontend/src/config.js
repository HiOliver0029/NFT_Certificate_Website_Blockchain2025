// 網路配置
export const NETWORKS = {
  localhost: {
    chainId: '0x7a69', // 31337
    name: 'Localhost 8545',
    rpcUrl: 'http://127.0.0.1:8545',
    contractAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3'
  },
  sepolia: {
    chainId: '0xaa36a7', // 11155111
    name: 'Sepolia Test Network',
    rpcUrl: 'https://sepolia.infura.io/v3/',
    contractAddress: process.env.REACT_APP_CONTRACT_ADDRESS || '0x7B8DD9B91828D4A1E7167E7b21E73e014E5ae4Ed',
    explorer: 'https://sepolia.etherscan.io'
  }
};

// 根據環境變數確定當前網路
export const getCurrentNetwork = () => {
  const networkId = process.env.REACT_APP_NETWORK_ID;
  
  if (networkId === '11155111') {
    return NETWORKS.sepolia;
  }
  
  return NETWORKS.localhost;
};

// 合約 ABI
export const CONTRACT_ABI = [
  // 發行證書函數（實際簽名，無 imageURI 參數）
  "function issueCertificate(address to, uint8 certType, string memory recipientName, string memory issuerName, string memory customMessage) public returns (uint256)",
  // 批量發行證書
  "function batchIssueCertificates(address[] memory recipients, uint8 certType, string[] memory recipientNames, string memory issuerName, string memory customMessage) public",
  // 獲取用戶的證書 token ID 數組
  "function getCertificatesByOwner(address owner) public view returns (uint256[])",
  // 獲取證書詳細資訊（通過 public mapping）
  "function certificates(uint256 tokenId) public view returns (uint8 certType, string recipientName, string issuerName, uint256 issueDate, string customMessage, string imageURI)",
  // 其他查詢函數
  "function getTotalCertificates() public view returns (uint256)",
  "function certificateCount(uint8 certType) public view returns (uint256)",
  "function tokenURI(uint256 tokenId) public view returns (string memory)",
  "function ownerOf(uint256 tokenId) public view returns (address)",
  "function balanceOf(address owner) public view returns (uint256)",
  "function owner() public view returns (address)",
  "function name() public view returns (string memory)",
  "function symbol() public view returns (string memory)",
  // 事件
  "event CertificateIssued(uint256 indexed tokenId, address indexed recipient, uint8 certType, string recipientName)"
];

// 證書類型定義
export const CERTIFICATE_TYPES = {
  0: { 
    name: "區塊鏈先驅者證書", 
    nameEn: "Blockchain Pioneer", 
    emoji: "🚀",
    description: "紀念您在區塊鏈領域的先驅精神與貢獻"
  },
  1: { 
    name: "友情不滅證書", 
    nameEn: "Eternal Friendship", 
    emoji: "💝",
    description: "見證永恆友誼的數位紀念章"
  },
  2: { 
    name: "Web3.0 公民證", 
    nameEn: "Web3.0 Citizen", 
    emoji: "🌐",
    description: "Web3 去中心化世界的公民身分證明"
  },
  3: { 
    name: "課程完成證明", 
    nameEn: "Course Completion", 
    emoji: "🎓",
    description: "區塊鏈學習成就的永久記錄"
  }
};

// 工具函數
export const formatAddress = (address) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString('zh-TW');
};

// 獲取 Etherscan NFT 查看連結
export const getEtherscanNftUrl = (contractAddress, tokenId, network) => {
  if (network.name === 'Localhost 8545') {
    return `http://localhost:8545/token/${contractAddress}?a=${tokenId}`;
  }
  
  return `${network.explorer}/token/${contractAddress}?a=${tokenId}`;
};

// 保留舊的 OpenSea 函數以保持向後兼容（但不推薦使用於測試網）
export const getOpenSeaUrl = (contractAddress, tokenId, network) => {
  const baseUrl = network.name === 'Sepolia Test Network' 
    ? 'https://testnets.opensea.io/assets/sepolia'
    : 'https://opensea.io/assets/ethereum';
  
  return `${baseUrl}/${contractAddress}/${tokenId}`;
};

export const getExplorerUrl = (hash, network, type = 'tx') => {
  if (network.name === 'Localhost 8545') {
    return `http://localhost:8545/${type}/${hash}`;
  }
  
  return `${network.explorer}/${type}/${hash}`;
};