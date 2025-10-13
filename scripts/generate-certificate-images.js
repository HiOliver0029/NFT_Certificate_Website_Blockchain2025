const fs = require('fs');
const path = require('path');

// 創建證書圖片的 SVG 模板
const createCertificateSVG = (certType, recipientName, issuerName, issueDate, customMessage) => {
  const certificates = {
    0: {
      title: "區塊鏈先驅者證書",
      titleEn: "Blockchain Pioneer Certificate",
      color: "#FFD700",
      bgColor: "#1a1a2e",
      emoji: "🚀",
      accentColor: "#00d4aa"
    },
    1: {
      title: "友情不滅證書", 
      titleEn: "Eternal Friendship Certificate",
      color: "#FF69B4",
      bgColor: "#2d1b69",
      emoji: "💝",
      accentColor: "#ff9a9e"
    },
    2: {
      title: "Web3.0 公民證",
      titleEn: "Web3.0 Citizen Certificate", 
      color: "#00BFFF",
      bgColor: "#0f3460",
      emoji: "🌐",
      accentColor: "#667eea"
    },
    3: {
      title: "課程完成證明",
      titleEn: "Course Completion Certificate",
      color: "#32CD32",
      bgColor: "#1e3c72",
      emoji: "🎓", 
      accentColor: "#a8edea"
    }
  };

  const cert = certificates[certType] || certificates[0];
  const dateStr = new Date(issueDate * 1000).toLocaleDateString('zh-TW');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${cert.bgColor};stop-opacity:1" />
      <stop offset="50%" style="stop-color:#000080;stop-opacity:1" />
      <stop offset="100%" style="stop-color:${cert.accentColor};stop-opacity:1" />
    </linearGradient>
    <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${cert.color};stop-opacity:1" />
      <stop offset="50%" style="stop-color:#FFFFFF;stop-opacity:1" />
      <stop offset="100%" style="stop-color:${cert.accentColor};stop-opacity:1" />
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge> 
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  
  <!-- 背景 -->
  <rect width="800" height="600" fill="url(#bgGradient)"/>
  
  <!-- 裝飾邊框 -->
  <rect x="20" y="20" width="760" height="560" fill="none" stroke="url(#borderGradient)" stroke-width="4" rx="20"/>
  <rect x="40" y="40" width="720" height="520" fill="none" stroke="${cert.color}" stroke-width="2" rx="15" opacity="0.6"/>
  
  <!-- 頂部裝飾 -->
  <circle cx="400" cy="80" r="30" fill="${cert.color}" opacity="0.8" filter="url(#glow)"/>
  <text x="400" y="90" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="36" font-weight="bold">${cert.emoji}</text>
  
  <!-- 證書標題 -->
  <text x="400" y="140" text-anchor="middle" fill="${cert.color}" font-family="Arial, sans-serif" font-size="32" font-weight="bold" filter="url(#glow)">
    ${cert.title}
  </text>
  <text x="400" y="170" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="18" opacity="0.9">
    ${cert.titleEn}
  </text>
  
  <!-- 分隔線 -->
  <line x1="150" y1="200" x2="650" y2="200" stroke="${cert.color}" stroke-width="2" opacity="0.8"/>
  
  <!-- 證書內容 -->
  <text x="400" y="240" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="20" font-weight="300">
    特此證明
  </text>
  
  <text x="400" y="290" text-anchor="middle" fill="${cert.color}" font-family="Arial, sans-serif" font-size="36" font-weight="bold" filter="url(#glow)">
    ${recipientName}
  </text>
  
  <text x="400" y="330" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="18" opacity="0.9">
    ${customMessage || '已獲得此項殊榮'}
  </text>
  
  <!-- 發行資訊 -->
  <text x="400" y="400" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" opacity="0.8">
    發行者: ${issuerName}
  </text>
  <text x="400" y="430" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" opacity="0.8">
    發行日期: ${dateStr}
  </text>
  
  <!-- 底部裝飾 -->
  <text x="400" y="480" text-anchor="middle" fill="${cert.accentColor}" font-family="Arial, sans-serif" font-size="14" opacity="0.7">
    永恆數位榮譽證書系統
  </text>
  <text x="400" y="500" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="12" opacity="0.6">
    Eternal Digital Honor Certificate
  </text>
  
  <!-- 區塊鏈裝飾 -->
  <g opacity="0.1">
    <polygon points="100,500 120,480 140,500 120,520" fill="${cert.color}"/>
    <polygon points="660,500 680,480 700,500 680,520" fill="${cert.color}"/>
    <circle cx="100" cy="100" r="8" fill="${cert.accentColor}"/>
    <circle cx="700" cy="100" r="8" fill="${cert.accentColor}"/>
  </g>
  
  <!-- 驗證信息 -->
  <text x="400" y="540" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="10" opacity="0.5">
    此證書已記錄於以太坊區塊鏈，可永久驗證真偽
  </text>
</svg>`;
};

// 生成所有類型的範例證書
async function generateSampleCertificates() {
  const outputDir = path.join(__dirname, '..', 'images', 'certificates');
  
  // 確保目錄存在
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const sampleData = [
    {
      certType: 0,
      recipientName: "張小明",
      issuerName: "區塊鏈學院",
      customMessage: "在區塊鏈技術領域展現卓越的先驅精神"
    },
    {
      certType: 1, 
      recipientName: "李小華",
      issuerName: "好友團體",
      customMessage: "友誼長存，情深如海，此情不渝"
    },
    {
      certType: 2,
      recipientName: "王小強",
      issuerName: "Web3 社群",
      customMessage: "積極參與去中心化生態建設"
    },
    {
      certType: 3,
      recipientName: "陳小美",
      issuerName: "數位學習平台", 
      customMessage: "成功完成區塊鏈開發課程"
    }
  ];
  
  const certificates = {
    0: "blockchain-pioneer",
    1: "eternal-friendship", 
    2: "web3-citizen",
    3: "course-completion"
  };
  
  console.log("🎨 開始生成證書圖片...");
  
  for (const data of sampleData) {
    const svg = createCertificateSVG(
      data.certType,
      data.recipientName,
      data.issuerName,
      Math.floor(Date.now() / 1000),
      data.customMessage
    );
    
    const filename = `${certificates[data.certType]}-sample.svg`;
    const filepath = path.join(outputDir, filename);
    
    fs.writeFileSync(filepath, svg, 'utf8');
    console.log(`✅ 已生成: ${filename}`);
  }
  
  // 生成一個通用模板
  const templateSVG = createCertificateSVG(
    0,
    "[接收者姓名]",
    "[發行者姓名]", 
    Math.floor(Date.now() / 1000),
    "[自定義訊息]"
  );
  
  const templatePath = path.join(outputDir, 'template.svg');
  fs.writeFileSync(templatePath, templateSVG, 'utf8');
  console.log(`✅ 已生成模板: template.svg`);
  
  console.log(`\n🎯 所有證書圖片已生成到: ${outputDir}`);
  return outputDir;
}

// 創建證書圖片生成函數供其他腳本使用
function generateCertificateImage(certType, recipientName, issuerName, customMessage = '') {
  return createCertificateSVG(
    certType,
    recipientName, 
    issuerName,
    Math.floor(Date.now() / 1000),
    customMessage
  );
}

module.exports = {
  generateSampleCertificates,
  generateCertificateImage,
  createCertificateSVG
};

// 如果直接執行此腳本
if (require.main === module) {
  generateSampleCertificates()
    .then((outputDir) => {
      console.log("🎉 證書圖片生成完成!");
    })
    .catch((error) => {
      console.error("❌ 生成失敗:", error);
      process.exit(1);
    });
}