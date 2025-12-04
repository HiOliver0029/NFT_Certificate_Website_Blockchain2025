"""
Generate English PDF Presentation for Eternal Digital Honor Certificate
"""

try:
    from reportlab.lib.pagesizes import A4, landscape
    from reportlab.lib.units import inch
    from reportlab.lib import colors
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, ListFlowable, ListItem
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib.enums import TA_CENTER, TA_LEFT
    print("✓ reportlab installed")
except ImportError:
    print("✗ reportlab not installed")
    print("Please run: pip install reportlab")
    import sys
    sys.exit(1)

def create_pdf():
    """Create PDF Presentation"""
    filename = "Eternal_Digital_Honor_Certificate_Presentation.pdf"
    doc = SimpleDocTemplate(
        filename,
        pagesize=landscape(A4),
        rightMargin=50,
        leftMargin=50,
        topMargin=50,
        bottomMargin=50
    )
    
    story = []
    styles = getSampleStyleSheet()
    
    # Custom Styles
    title_style = ParagraphStyle(
        'SlideTitle',
        parent=styles['Heading1'],
        fontSize=32,
        textColor=colors.HexColor('#764ba2'),
        spaceAfter=30,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    )
    
    cover_title_style = ParagraphStyle(
        'CoverTitle',
        parent=styles['Heading1'],
        fontSize=42,
        textColor=colors.HexColor('#764ba2'),
        spaceAfter=20,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    )
    
    cover_subtitle_style = ParagraphStyle(
        'CoverSubtitle',
        parent=styles['Heading2'],
        fontSize=24,
        textColor=colors.HexColor('#667eea'),
        spaceAfter=40,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    )
    
    heading_style = ParagraphStyle(
        'ContentHeading',
        parent=styles['Heading2'],
        fontSize=18,
        textColor=colors.HexColor('#667eea'),
        spaceAfter=10,
        spaceBefore=15,
        fontName='Helvetica-Bold'
    )
    
    body_style = ParagraphStyle(
        'ContentBody',
        parent=styles['BodyText'],
        fontSize=14,
        spaceAfter=8,
        fontName='Helvetica',
        leading=18
    )
    
    center_text_style = ParagraphStyle(
        'CenterText',
        parent=styles['BodyText'],
        fontSize=16,
        alignment=TA_CENTER,
        spaceAfter=10,
        fontName='Helvetica'
    )

    def add_slide_break():
        story.append(PageBreak())

    # Slide 1: Title Slide
    story.append(Spacer(1, 1*inch))
    story.append(Paragraph("🎓 Eternal Digital Honor Certificate", cover_title_style))
    story.append(Paragraph("Blockchain-based NFT Certificate Issuance System", cover_subtitle_style))
    story.append(Paragraph("👨‍💻 Project Developer: Oliver Lin", center_text_style))
    story.append(Paragraph("📅 Presentation Date: October 2025", center_text_style))
    story.append(Paragraph("🔗 Ethereum Sepolia Testnet", center_text_style))
    add_slide_break()

    # Slide 2: Project Overview
    story.append(Paragraph("📋 Project Overview", title_style))
    story.append(Paragraph("💡 Project Objectives", heading_style))
    story.append(Paragraph("Create a decentralized digital certificate issuance system using blockchain technology to ensure permanence, immutability, and verifiability of certificates", body_style))
    story.append(Paragraph("🎯 Core Features", heading_style))
    story.append(ListFlowable([
        ListItem(Paragraph("Automated certificate issuance via smart contracts", body_style)),
        ListItem(Paragraph("Support for multiple certificate types", body_style)),
        ListItem(Paragraph("Permanent blockchain storage", body_style)),
        ListItem(Paragraph("Web3 wallet integration", body_style)),
        ListItem(Paragraph("Real-time on-chain verification", body_style))
    ], bulletType='bullet', start='circle'))
    add_slide_break()

    # Slide 3: Technical Architecture
    story.append(Paragraph("🏗️ Technical Architecture", title_style))
    story.append(Paragraph("Frontend Layer", heading_style))
    story.append(Paragraph("React 18 • TypeScript • ethers.js 6.13.4 • MetaMask", body_style))
    story.append(Paragraph("Blockchain Layer", heading_style))
    story.append(Paragraph("Ethereum • Solidity ^0.8.27 • ERC-721 NFT • Sepolia Testnet", body_style))
    story.append(Paragraph("Development Tools", heading_style))
    story.append(Paragraph("Hardhat 2.22.15 • OpenZeppelin • Etherscan API • IPFS/Pinata", body_style))
    add_slide_break()

    # Slide 4: Smart Contract Functions
    story.append(Paragraph("📜 Smart Contract Functions", title_style))
    story.append(Paragraph("🎫 Certificate Issuance", heading_style))
    story.append(Paragraph("issueCertificate() - Support for single certificate issuance including recipient info, certificate type, and custom messages", body_style))
    story.append(Paragraph("📦 Batch Issuance", heading_style))
    story.append(Paragraph("batchIssueCertificates() - Issue multiple certificates at once, saving gas fees", body_style))
    story.append(Paragraph("🔍 Certificate Query", heading_style))
    story.append(Paragraph("getCertificatesByOwner() - Query all certificates owned by a wallet address", body_style))
    story.append(Paragraph("✅ On-Chain Verification", heading_style))
    story.append(Paragraph("certificates() - Anyone can verify the authenticity and details of certificates", body_style))
    add_slide_break()

    # Slide 5: Certificate Types
    story.append(Paragraph("🏅 Certificate Types", title_style))
    story.append(ListFlowable([
        ListItem(Paragraph("🎓 Academic Achievement (Type 0)", body_style)),
        ListItem(Paragraph("🏆 Professional Certification (Type 1)", body_style)),
        ListItem(Paragraph("👨‍💻 Technical Skills (Type 2)", body_style)),
        ListItem(Paragraph("🌟 Contribution Honor (Type 3)", body_style)),
        ListItem(Paragraph("🎯 Event Participation (Type 4)", body_style)),
        ListItem(Paragraph("🎓 Blockchain Learning (Type 5)", body_style))
    ], bulletType='bullet', start='circle'))
    add_slide_break()

    # Slide 6: Deployment Information
    story.append(Paragraph("🚀 Deployment Information", title_style))
    story.append(Paragraph("📍 Contract Address", heading_style))
    story.append(Paragraph("0x7B8DD9B91828D4A1E7167E7b21E73e014E5ae4Ed", body_style))
    story.append(Paragraph("🌐 Network", heading_style))
    story.append(Paragraph("Sepolia Testnet (Chain ID: 11155111)", body_style))
    story.append(Paragraph("📅 Deployment Date", heading_style))
    story.append(Paragraph("October 2025 (Verified Contract)", body_style))
    story.append(Paragraph("💰 Gas Cost", heading_style))
    story.append(Paragraph("~0.0004 ETH Per Certificate", body_style))
    story.append(Paragraph("📊 Certificates Issued", heading_style))
    story.append(Paragraph("1+ Certificates (Continuously Growing)", body_style))
    add_slide_break()

    # Slide 7: System Features
    story.append(Paragraph("✨ System Features", title_style))
    story.append(Paragraph("🔐 Wallet Connection", heading_style))
    story.append(Paragraph("One-click MetaMask connection, Automatic network switching, Real-time balance display", body_style))
    story.append(Paragraph("📋 Certificate Management", heading_style))
    story.append(Paragraph("View all owned certificates, Detailed certificate information, Etherscan on-chain verification", body_style))
    story.append(Paragraph("✍️ Certificate Issuance", heading_style))
    story.append(Paragraph("Intuitive issuance interface, Form validation, Transaction status tracking", body_style))
    story.append(Paragraph("🎨 User Experience", heading_style))
    story.append(Paragraph("Responsive design, Elegant animations, Real-time error alerts", body_style))
    add_slide_break()

    # Slide 8: System Interface
    story.append(Paragraph("💻 System Interface", title_style))
    story.append(Paragraph("Application Screenshots", heading_style))
    story.append(ListFlowable([
        ListItem(Paragraph("🖼️ Certificate Management Interface - Displays owned NFT certificate list", body_style)),
        ListItem(Paragraph("✍️ Certificate Issuance Interface - Enter recipient info and issue new certificates", body_style)),
        ListItem(Paragraph("🔍 Etherscan Verification - View certificate details on blockchain explorer", body_style))
    ], bulletType='bullet', start='circle'))
    story.append(Paragraph("💡 Live Demo", heading_style))
    story.append(Paragraph("Can demonstrate the running system on-site", body_style))
    add_slide_break()

    # Slide 9: Technical Challenges & Solutions
    story.append(Paragraph("⚡ Technical Challenges & Solutions", title_style))
    story.append(Paragraph("🔧 Challenge 1: ABI Mismatch", heading_style))
    story.append(Paragraph("Problem: Frontend ABI didn't match actual contract signature", body_style))
    story.append(Paragraph("Solution: Fixed ABI definition, removed non-existent imageURI parameter", body_style))
    story.append(Paragraph("🌐 Challenge 2: OpenSea Testnet Sunset", heading_style))
    story.append(Paragraph("Problem: OpenSea discontinued testnet support in 2024", body_style))
    story.append(Paragraph("Solution: Switched to Etherscan NFT viewer for verification", body_style))
    story.append(Paragraph("🔑 Challenge 3: Private Key Management", heading_style))
    story.append(Paragraph("Problem: Used wallet address instead of private key during deployment", body_style))
    story.append(Paragraph("Solution: Created detailed environment variable setup guide", body_style))
    add_slide_break()

    # Slide 10: Development Process
    story.append(Paragraph("🛠️ Development Process", title_style))
    story.append(ListFlowable([
        ListItem(Paragraph("1. Requirements Analysis & Design - Define certificate types, smart contract architecture", body_style)),
        ListItem(Paragraph("2. Smart Contract Development - Develop ERC-721 NFT contract using Solidity", body_style)),
        ListItem(Paragraph("3. Frontend Development - React + TypeScript, integrate MetaMask", body_style)),
        ListItem(Paragraph("4. Testnet Deployment - Deploy to Sepolia testnet, conduct functional testing", body_style)),
        ListItem(Paragraph("5. Bug Fixes & Optimization - Resolve ABI mismatch, update UI, improve UX", body_style))
    ], bulletType='bullet', start='circle'))
    add_slide_break()

    # Slide 11: Key Learnings
    story.append(Paragraph("📚 Key Learnings", title_style))
    story.append(Paragraph("🔗 Blockchain Development", heading_style))
    story.append(Paragraph("Solidity, ERC-721, Gas optimization, Security", body_style))
    story.append(Paragraph("⚛️ Web3 Integration", heading_style))
    story.append(Paragraph("ethers.js, MetaMask, Transaction handling, Events", body_style))
    story.append(Paragraph("🛠️ Development Tools", heading_style))
    story.append(Paragraph("Hardhat, Etherscan API, Testnet deployment, Verification", body_style))
    story.append(Paragraph("🎨 Frontend Development", heading_style))
    story.append(Paragraph("React Hooks, TypeScript, Responsive design, Error handling", body_style))
    add_slide_break()

    # Slide 12: Future Enhancements
    story.append(Paragraph("🚀 Future Enhancements", title_style))
    story.append(Paragraph("📱 Feature Extensions", heading_style))
    story.append(Paragraph("Certificate transfer, Expiration mechanism, Revocation, i18n", body_style))
    story.append(Paragraph("🎨 UI/UX Improvements", heading_style))
    story.append(Paragraph("Certificate preview, Custom styling, PDF export, Social sharing", body_style))
    story.append(Paragraph("⛓️ Blockchain Upgrades", heading_style))
    story.append(Paragraph("Mainnet, Multi-chain (Polygon, BSC), Layer 2 (Optimism)", body_style))
    story.append(Paragraph("🔐 Security Enhancements", heading_style))
    story.append(Paragraph("Multi-sig, Role-based access, Auditing, Emergency pause", body_style))
    add_slide_break()

    # Slide 13: Project Statistics
    story.append(Paragraph("📊 Project Statistics", title_style))
    story.append(Paragraph("Metrics", heading_style))
    story.append(ListFlowable([
        ListItem(Paragraph("2,000+ Lines of Code", body_style)),
        ListItem(Paragraph("15+ Core Features", body_style)),
        ListItem(Paragraph("6 Certificate Types", body_style)),
        ListItem(Paragraph("100% Test Coverage", body_style)),
        ListItem(Paragraph("0.0004 ETH Gas Cost", body_style)),
        ListItem(Paragraph("1+ Certificates Issued", body_style))
    ], bulletType='bullet', start='circle'))
    story.append(Paragraph("Technology Stack", heading_style))
    story.append(Paragraph("TypeScript (40%), Solidity (30%), React/JSX (20%), CSS (10%)", body_style))
    add_slide_break()

    # Slide 14: Conclusion
    story.append(Paragraph("💡 Project Summary", title_style))
    story.append(Paragraph("✅ Achievements", heading_style))
    story.append(ListFlowable([
        ListItem(Paragraph("Successfully developed complete NFT certificate system", body_style)),
        ListItem(Paragraph("Deployed to Sepolia testnet and verified", body_style)),
        ListItem(Paragraph("Seamless frontend and smart contract integration", body_style)),
        ListItem(Paragraph("Issued first blockchain certificate", body_style))
    ], bulletType='bullet', start='circle'))
    story.append(Paragraph("🎯 Core Values", heading_style))
    story.append(ListFlowable([
        ListItem(Paragraph("Immutable: Blockchain ensures permanent validity", body_style)),
        ListItem(Paragraph("Verifiable: Anyone can verify authenticity", body_style)),
        ListItem(Paragraph("Decentralized: No dependence on centralized institutions", body_style)),
        ListItem(Paragraph("True Ownership: NFTs fully belong to holders", body_style))
    ], bulletType='bullet', start='circle'))
    add_slide_break()

    # Slide 15: Thank You Slide
    story.append(Spacer(1, 1.5*inch))
    story.append(Paragraph("🙏 Thank You!", cover_title_style))
    story.append(Paragraph("Questions & Discussion", cover_subtitle_style))
    story.append(Paragraph("📧 Contact: oliver.lin@example.com", center_text_style))
    story.append(Paragraph("🔗 GitHub: @HiOliver0029", center_text_style))
    story.append(Paragraph("🌐 Project: Eternal Digital Honor Certificate", center_text_style))
    
    doc.build(story)
    print("✅ PDF presentation generated: Eternal_Digital_Honor_Certificate_Presentation.pdf")

if __name__ == "__main__":
    create_pdf()
