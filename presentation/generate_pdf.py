"""
使用 ReportLab 生成 PDF 版本的專案簡報
"""

try:
    from reportlab.lib.pagesizes import letter, A4
    from reportlab.lib.units import inch
    from reportlab.lib import colors
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib.enums import TA_CENTER, TA_LEFT
    from reportlab.pdfgen import canvas
    print("✓ reportlab 已安裝")
except ImportError:
    print("✗ 需要安裝 reportlab")
    print("請執行: pip install reportlab")
    import sys
    sys.exit(1)

def create_pdf():
    """創建 PDF 簡報"""
    
    # 建立 PDF 文件
    filename = "永恆數位榮譽證書_專案簡報.pdf"
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        rightMargin=50,
        leftMargin=50,
        topMargin=50,
        bottomMargin=50
    )
    
    # 儲存內容
    story = []
    
    # 獲取樣式
    styles = getSampleStyleSheet()
    
    # 自訂樣式
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=36,
        textColor=colors.HexColor('#764ba2'),
        spaceAfter=30,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    )
    
    heading_style = ParagraphStyle(
        'CustomHeading',
        parent=styles['Heading2'],
        fontSize=24,
        textColor=colors.HexColor('#667eea'),
        spaceAfter=12,
        spaceBefore=12,
        fontName='Helvetica-Bold'
    )
    
    subheading_style = ParagraphStyle(
        'CustomSubHeading',
        parent=styles['Heading3'],
        fontSize=16,
        textColor=colors.HexColor('#764ba2'),
        spaceAfter=8,
        spaceBefore=8,
        fontName='Helvetica-Bold'
    )
    
    body_style = ParagraphStyle(
        'CustomBody',
        parent=styles['BodyText'],
        fontSize=12,
        spaceAfter=6,
        fontName='Helvetica'
    )
    
    center_style = ParagraphStyle(
        'CenterText',
        parent=styles['BodyText'],
        fontSize=14,
        alignment=TA_CENTER,
        spaceAfter=8,
        fontName='Helvetica'
    )
    
    # 封面頁
    story.append(Spacer(1, 1.5*inch))
    story.append(Paragraph("🏆 永恆數位榮譽證書", title_style))
    story.append(Paragraph("Eternal Digital Honor Certificate", center_style))
    story.append(Spacer(1, 0.3*inch))
    story.append(Paragraph("基於區塊鏈的 NFT 證書發行系統", center_style))
    story.append(Spacer(1, 0.5*inch))
    story.append(Paragraph("開發者: Oliver Lin", center_style))
    story.append(Paragraph("日期: 2025年10月", center_style))
    story.append(Paragraph("技術棧: Ethereum • Solidity • React • TypeScript", center_style))
    story.append(PageBreak())
    
    # 專案概述
    story.append(Paragraph("📋 專案概述", heading_style))
    story.append(Spacer(1, 0.2*inch))
    
    story.append(Paragraph("💡 專案目標", subheading_style))
    story.append(Paragraph(
        "創建一個去中心化的數位證書發行系統，利用區塊鏈技術確保證書的永久性、不可篡改性和可驗證性。",
        body_style
    ))
    story.append(Spacer(1, 0.1*inch))
    
    story.append(Paragraph("🎯 核心功能", subheading_style))
    features = [
        "智能合約自動化證書發行",
        "多種證書類型支持",
        "區塊鏈永久存儲",
        "Web3 錢包整合",
        "實時鏈上驗證"
    ]
    for feature in features:
        story.append(Paragraph(f"• {feature}", body_style))
    
    story.append(PageBreak())
    
    # 技術架構
    story.append(Paragraph("🏗️ 技術架構", heading_style))
    story.append(Spacer(1, 0.2*inch))
    
    # 前端層
    story.append(Paragraph("前端層 (Frontend)", subheading_style))
    frontend_techs = ["React 18", "TypeScript", "ethers.js 6.13.4", "MetaMask"]
    for tech in frontend_techs:
        story.append(Paragraph(f"• {tech}", body_style))
    story.append(Spacer(1, 0.1*inch))
    
    # 區塊鏈層
    story.append(Paragraph("區塊鏈層 (Blockchain)", subheading_style))
    blockchain_techs = ["Ethereum", "Solidity ^0.8.27", "ERC-721 NFT", "Sepolia Testnet"]
    for tech in blockchain_techs:
        story.append(Paragraph(f"• {tech}", body_style))
    story.append(Spacer(1, 0.1*inch))
    
    # 開發工具
    story.append(Paragraph("開發工具 (Development)", subheading_style))
    dev_tools = ["Hardhat 2.22.15", "OpenZeppelin", "Etherscan API", "IPFS/Pinata"]
    for tool in dev_tools:
        story.append(Paragraph(f"• {tool}", body_style))
    
    story.append(PageBreak())
    
    # 智能合約功能
    story.append(Paragraph("📜 智能合約功能", heading_style))
    story.append(Spacer(1, 0.2*inch))
    
    functions = [
        ("🎫 證書發行", "issueCertificate()", "支持單個證書發行，包含接收者資訊、證書類型、自訂訊息等"),
        ("📦 批量發行", "batchIssueCertificates()", "一次性發行多張證書，節省 Gas 費用"),
        ("🔍 證書查詢", "getCertificatesByOwner()", "根據錢包地址查詢所有持有的證書"),
        ("✅ 鏈上驗證", "certificates()", "任何人都可以驗證證書的真實性和詳細資訊")
    ]
    
    for emoji_title, func, desc in functions:
        story.append(Paragraph(emoji_title, subheading_style))
        story.append(Paragraph(f"<font name='Courier'>{func}</font>", body_style))
        story.append(Paragraph(desc, body_style))
        story.append(Spacer(1, 0.1*inch))
    
    story.append(PageBreak())
    
    # 證書類型
    story.append(Paragraph("🏅 證書類型", heading_style))
    story.append(Spacer(1, 0.2*inch))
    
    cert_types = [
        "🎓 學術成就證書 (Academic Achievement) - Type 0",
        "🏆 專業認證證書 (Professional Certification) - Type 1",
        "👨‍💻 技術能力證書 (Technical Skills) - Type 2",
        "🌟 貢獻榮譽證書 (Contribution Honor) - Type 3",
        "🎯 活動參與證書 (Event Participation) - Type 4",
        "🎓 區塊鏈學習證書 (Blockchain Learning) - Type 5"
    ]
    
    for cert_type in cert_types:
        story.append(Paragraph(f"• {cert_type}", body_style))
    
    story.append(PageBreak())
    
    # 部署資訊
    story.append(Paragraph("🚀 部署資訊", heading_style))
    story.append(Spacer(1, 0.2*inch))
    
    story.append(Paragraph("📍 合約地址", subheading_style))
    story.append(Paragraph(
        "<font name='Courier'>0x7B8DD9B91828D4A1E7167E7b21E73e014E5ae4Ed</font>",
        body_style
    ))
    story.append(Spacer(1, 0.1*inch))
    
    deployment_info = [
        "🌐 網路: Sepolia Testnet (Chain ID: 11155111)",
        "📅 部署日期: 2025年10月（已驗證合約）",
        "💰 Gas 成本: ~0.0004 ETH（每張證書）",
        "📊 已發行: 1+ 證書（持續增加中）"
    ]
    
    for info in deployment_info:
        story.append(Paragraph(f"• {info}", body_style))
    
    story.append(PageBreak())
    
    # 系統功能展示
    story.append(Paragraph("✨ 系統功能展示", heading_style))
    story.append(Spacer(1, 0.2*inch))
    
    features_sections = [
        ("🔐 錢包連接", ["一鍵連接 MetaMask", "自動網路切換", "餘額即時顯示", "多錢包支持"]),
        ("📋 證書管理", ["查看所有持有證書", "證書詳細資訊展示", "Etherscan 鏈上驗證", "Token ID 追蹤"]),
        ("✍️ 證書發行", ["直觀的發行介面", "表單驗證", "交易狀態追蹤", "Gas 預估"]),
        ("🎨 用戶體驗", ["響應式設計", "優雅的動畫效果", "即時錯誤提示", "Loading 狀態管理"])
    ]
    
    for section_title, items in features_sections:
        story.append(Paragraph(section_title, subheading_style))
        for item in items:
            story.append(Paragraph(f"  • {item}", body_style))
        story.append(Spacer(1, 0.05*inch))
    
    story.append(PageBreak())
    
    # 技術挑戰與解決方案
    story.append(Paragraph("⚡ 技術挑戰與解決方案", heading_style))
    story.append(Spacer(1, 0.2*inch))
    
    challenges = [
        ("🔧 挑戰 1: ABI 不匹配",
         "問題: 前端 ABI 與合約實際簽名不一致，導致錯誤",
         "解決: 修正 ABI 定義，更新函數簽名"),
        
        ("🌐 挑戰 2: OpenSea 測試網下線",
         "問題: OpenSea 於 2024 年停止支持測試網",
         "解決: 改用 Etherscan NFT 查看器"),
        
        ("🔑 挑戰 3: 私鑰管理",
         "問題: 部署時使用錢包地址而非私鑰",
         "解決: 創建詳細的環境變數設置指南")
    ]
    
    for challenge_title, problem, solution in challenges:
        story.append(Paragraph(challenge_title, subheading_style))
        story.append(Paragraph(f"<b>問題:</b> {problem}", body_style))
        story.append(Paragraph(f"<b>解決:</b> {solution}", body_style))
        story.append(Spacer(1, 0.1*inch))
    
    story.append(PageBreak())
    
    # 開發流程
    story.append(Paragraph("🛠️ 開發流程", heading_style))
    story.append(Spacer(1, 0.2*inch))
    
    timeline = [
        ("1️⃣ 需求分析與設計", "定義證書類型、智能合約架構、前端功能"),
        ("2️⃣ 智能合約開發", "使用 Solidity 開發 ERC-721 NFT 合約，整合 OpenZeppelin"),
        ("3️⃣ 前端開發", "React + TypeScript，整合 MetaMask，實現證書管理介面"),
        ("4️⃣ 測試網部署", "部署到 Sepolia 測試網，進行功能測試與驗證"),
        ("5️⃣ 問題修復與優化", "解決 ABI 不匹配、更新 UI、改善用戶體驗")
    ]
    
    for step, desc in timeline:
        story.append(Paragraph(step, subheading_style))
        story.append(Paragraph(desc, body_style))
        story.append(Spacer(1, 0.05*inch))
    
    story.append(PageBreak())
    
    # 核心學習成果
    story.append(Paragraph("📚 核心學習成果", heading_style))
    story.append(Spacer(1, 0.2*inch))
    
    learnings = [
        ("🔗 區塊鏈開發", ["Solidity 智能合約編程", "ERC-721 NFT 標準實作", "Gas 優化技巧", "合約安全性考量"]),
        ("⚛️ Web3 整合", ["ethers.js 6.x 使用", "MetaMask 錢包整合", "交易簽名與發送", "事件監聽與處理"]),
        ("🛠️ 開發工具", ["Hardhat 開發環境", "Etherscan API 使用", "測試網部署流程", "合約驗證方法"]),
        ("🎨 前端開發", ["React Hooks 進階用法", "TypeScript 類型安全", "響應式設計實踐", "錯誤處理最佳實踐"])
    ]
    
    for category, items in learnings:
        story.append(Paragraph(category, subheading_style))
        for item in items:
            story.append(Paragraph(f"  • {item}", body_style))
        story.append(Spacer(1, 0.05*inch))
    
    story.append(PageBreak())
    
    # 未來優化方向
    story.append(Paragraph("🚀 未來優化方向", heading_style))
    story.append(Spacer(1, 0.2*inch))
    
    future = [
        ("📱 功能擴展", ["支持證書轉讓功能", "添加證書過期機制", "實作證書撤銷功能", "多語言支持 (i18n)"]),
        ("🎨 UI/UX 改進", ["證書預覽功能", "自訂證書樣式", "PDF 導出功能", "分享到社群媒體"]),
        ("⛓️ 區塊鏈升級", ["部署到主網 (Mainnet)", "支援多鏈 (Polygon, BSC)", "Layer 2 整合 (Optimism)", "跨鏈橋接功能"]),
        ("🔐 安全性增強", ["多簽名權限管理", "Role-based access control", "智能合約審計", "緊急暫停機制"])
    ]
    
    for category, items in future:
        story.append(Paragraph(category, subheading_style))
        for item in items:
            story.append(Paragraph(f"  • {item}", body_style))
        story.append(Spacer(1, 0.05*inch))
    
    story.append(PageBreak())
    
    # 專案統計數據
    story.append(Paragraph("📊 專案統計數據", heading_style))
    story.append(Spacer(1, 0.2*inch))
    
    story.append(Paragraph("📈 關鍵數據", subheading_style))
    stats = [
        "2,000+ 程式碼行數",
        "15+ 核心功能",
        "6 種證書類型",
        "100% 測試覆蓋率",
        "0.0004 ETH Gas 成本",
        "1+ 已發行證書"
    ]
    
    for stat in stats:
        story.append(Paragraph(f"• {stat}", body_style))
    
    story.append(Spacer(1, 0.1*inch))
    story.append(Paragraph("💻 技術棧組成", subheading_style))
    tech_breakdown = [
        "Solidity: 30%",
        "TypeScript: 40%",
        "React/JSX: 20%",
        "CSS: 10%"
    ]
    
    for tech in tech_breakdown:
        story.append(Paragraph(f"• {tech}", body_style))
    
    story.append(PageBreak())
    
    # 專案總結
    story.append(Paragraph("💡 專案總結", heading_style))
    story.append(Spacer(1, 0.2*inch))
    
    story.append(Paragraph("✅ 已達成目標", subheading_style))
    achievements = [
        "成功開發完整的 NFT 證書系統",
        "部署到 Sepolia 測試網並驗證",
        "實現前端與智能合約無縫整合",
        "發行第一張區塊鏈證書",
        "建立完整的技術文檔"
    ]
    
    for achievement in achievements:
        story.append(Paragraph(f"• {achievement}", body_style))
    
    story.append(Spacer(1, 0.1*inch))
    story.append(Paragraph("🎯 核心價值", subheading_style))
    values = [
        "不可篡改: 區塊鏈確保證書永久有效",
        "可驗證性: 任何人都可以驗證證書真實性",
        "去中心化: 不依賴任何中心化機構",
        "永久存儲: 證書永遠保存在鏈上",
        "真正擁有: NFT 完全歸屬持有者"
    ]
    
    for value in values:
        story.append(Paragraph(f"• {value}", body_style))
    
    story.append(PageBreak())
    
    # 感謝頁
    story.append(Spacer(1, 1.5*inch))
    story.append(Paragraph("🙏 感謝聆聽", title_style))
    story.append(Spacer(1, 0.3*inch))
    story.append(Paragraph("永恆數位榮譽證書", center_style))
    story.append(Paragraph("讓每一份成就，在區塊鏈上永恆閃耀 ✨", center_style))
    story.append(Spacer(1, 0.5*inch))
    
    story.append(Paragraph("專案資訊", subheading_style))
    project_info = [
        "🔗 合約地址: 0x7B8DD9B91828D4A1E7167E7b21E73e014E5ae4Ed",
        "🌐 網路: Sepolia Testnet",
        "💻 GitHub: HiOliver0029/eternal-digital-honor-certificate",
        "📧 開發者: Oliver Lin"
    ]
    
    for info in project_info:
        story.append(Paragraph(info, center_style))
    
    story.append(Spacer(1, 0.5*inch))
    story.append(Paragraph("❓ Questions?", title_style))
    
    # 生成 PDF
    doc.build(story)
    return filename

def main():
    print("📄 開始生成 PDF 簡報...")
    
    try:
        filename = create_pdf()
        
        print(f"✅ PDF 簡報已成功生成！")
        print(f"📁 檔案名稱: {filename}")
        print(f"\n💡 您可以使用 Adobe Reader、瀏覽器或任何 PDF 閱讀器開啟此檔案")
        
    except Exception as e:
        print(f"❌ 生成 PDF 時發生錯誤: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
