#!/usr/bin/env python3
"""
生成英文版本的簡報 HTML，移除首頁和結尾頁
"""

html_content = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Eternal Digital Honor Certificate - Project Presentation</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="presentation">
        <!-- Slide 1: Project Overview -->
        <section class="slide">
            <h2>📋 Project Overview</h2>
            <div class="content-grid">
                <div class="overview-box">
                    <h3>💡 Project Objectives</h3>
                    <p>Create a decentralized digital certificate issuance system using blockchain technology to ensure permanence, immutability, and verifiability of certificates</p>
                </div>
                <div class="overview-box">
                    <h3>🎯 Core Features</h3>
                    <ul>
                        <li>Automated certificate issuance via smart contracts</li>
                        <li>Support for multiple certificate types</li>
                        <li>Permanent blockchain storage</li>
                        <li>Web3 wallet integration</li>
                        <li>Real-time on-chain verification</li>
                    </ul>
                </div>
            </div>
        </section>

        <!-- Slide 2: Technical Architecture -->
        <section class="slide">
            <h2>🏗️ Technical Architecture</h2>
            <div class="architecture">
                <div class="layer">
                    <h3>Frontend Layer</h3>
                    <div class="tech-stack">
                        <span class="tech-badge">React 18</span>
                        <span class="tech-badge">TypeScript</span>
                        <span class="tech-badge">ethers.js 6.13.4</span>
                        <span class="tech-badge">MetaMask</span>
                    </div>
                </div>
                <div class="arrow">⬇️</div>
                <div class="layer">
                    <h3>Blockchain Layer</h3>
                    <div class="tech-stack">
                        <span class="tech-badge">Ethereum</span>
                        <span class="tech-badge">Solidity ^0.8.27</span>
                        <span class="tech-badge">ERC-721 NFT</span>
                        <span class="tech-badge">Sepolia Testnet</span>
                    </div>
                </div>
                <div class="arrow">⬇️</div>
                <div class="layer">
                    <h3>Development Tools</h3>
                    <div class="tech-stack">
                        <span class="tech-badge">Hardhat 2.22.15</span>
                        <span class="tech-badge">OpenZeppelin</span>
                        <span class="tech-badge">Etherscan API</span>
                        <span class="tech-badge">IPFS/Pinata</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Slide 3: Smart Contract Functions -->
        <section class="slide">
            <h2>📜 Smart Contract Functions</h2>
            <div class="contract-features">
                <div class="feature-card">
                    <div class="feature-icon">🎫</div>
                    <h3>Certificate Issuance</h3>
                    <code>issueCertificate()</code>
                    <p>Support for single certificate issuance including recipient info, certificate type, and custom messages</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">📦</div>
                    <h3>Batch Issuance</h3>
                    <code>batchIssueCertificates()</code>
                    <p>Issue multiple certificates at once, saving gas fees</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🔍</div>
                    <h3>Certificate Query</h3>
                    <code>getCertificatesByOwner()</code>
                    <p>Query all certificates owned by a wallet address</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">✅</div>
                    <h3>On-Chain Verification</h3>
                    <code>certificates()</code>
                    <p>Anyone can verify the authenticity and details of certificates</p>
                </div>
            </div>
        </section>

        <!-- Slide 4: Certificate Types -->
        <section class="slide">
            <h2>🏅 Certificate Types</h2>
            <div class="cert-types-grid">
                <div class="cert-type-card">
                    <div class="cert-emoji">🎓</div>
                    <h3>Academic Achievement</h3>
                    <p>Academic Certificate</p>
                    <span class="type-id">Type 0</span>
                </div>
                <div class="cert-type-card">
                    <div class="cert-emoji">🏆</div>
                    <h3>Professional Certification</h3>
                    <p>Professional Certificate</p>
                    <span class="type-id">Type 1</span>
                </div>
                <div class="cert-type-card">
                    <div class="cert-emoji">👨‍💻</div>
                    <h3>Technical Skills</h3>
                    <p>Technical Certificate</p>
                    <span class="type-id">Type 2</span>
                </div>
                <div class="cert-type-card">
                    <div class="cert-emoji">🌟</div>
                    <h3>Contribution Honor</h3>
                    <p>Honor Certificate</p>
                    <span class="type-id">Type 3</span>
                </div>
                <div class="cert-type-card">
                    <div class="cert-emoji">🎯</div>
                    <h3>Event Participation</h3>
                    <p>Participation Certificate</p>
                    <span class="type-id">Type 4</span>
                </div>
                <div class="cert-type-card">
                    <div class="cert-emoji">🎓</div>
                    <h3>Blockchain Learning</h3>
                    <p>Learning Certificate</p>
                    <span class="type-id">Type 5</span>
                </div>
            </div>
        </section>

        <!-- Slide 5: Deployment Information -->
        <section class="slide">
            <h2>🚀 Deployment Information</h2>
            <div class="deployment-info">
                <div class="info-box highlight">
                    <h3>📍 Contract Address</h3>
                    <code class="contract-address">0x7B8DD9B91828D4A1E7167E7b21E73e014E5ae4Ed</code>
                    <a href="https://sepolia.etherscan.io/address/0x7B8DD9B91828D4A1E7167E7b21E73e014E5ae4Ed" target="_blank" class="view-link">
                        🔍 View on Etherscan
                    </a>
                </div>
                <div class="info-grid">
                    <div class="info-box">
                        <h4>🌐 Network</h4>
                        <p>Sepolia Testnet</p>
                        <small>Chain ID: 11155111</small>
                    </div>
                    <div class="info-box">
                        <h4>📅 Deployment Date</h4>
                        <p>October 2025</p>
                        <small>Verified Contract</small>
                    </div>
                    <div class="info-box">
                        <h4>💰 Gas Cost</h4>
                        <p>~0.0004 ETH</p>
                        <small>Per Certificate</small>
                    </div>
                    <div class="info-box">
                        <h4>📊 Certificates Issued</h4>
                        <p>1+ Certificates</p>
                        <small>Continuously Growing</small>
                    </div>
                </div>
            </div>
        </section>

        <!-- Slide 6: System Features Demo -->
        <section class="slide">
            <h2>✨ System Features</h2>
            <div class="demo-features">
                <div class="demo-card">
                    <h3>🔐 Wallet Connection</h3>
                    <ul>
                        <li>One-click MetaMask connection</li>
                        <li>Automatic network switching</li>
                        <li>Real-time balance display</li>
                        <li>Multi-wallet support</li>
                    </ul>
                </div>
                <div class="demo-card">
                    <h3>📋 Certificate Management</h3>
                    <ul>
                        <li>View all owned certificates</li>
                        <li>Detailed certificate information</li>
                        <li>Etherscan on-chain verification</li>
                        <li>Token ID tracking</li>
                    </ul>
                </div>
                <div class="demo-card">
                    <h3>✍️ Certificate Issuance</h3>
                    <ul>
                        <li>Intuitive issuance interface</li>
                        <li>Form validation</li>
                        <li>Transaction status tracking</li>
                        <li>Gas estimation</li>
                    </ul>
                </div>
                <div class="demo-card">
                    <h3>🎨 User Experience</h3>
                    <ul>
                        <li>Responsive design</li>
                        <li>Elegant animations</li>
                        <li>Real-time error alerts</li>
                        <li>Loading state management</li>
                    </ul>
                </div>
            </div>
        </section>

        <!-- Slide 7: Live Demo Screenshot Placeholder -->
        <section class="slide">
            <h2>💻 System Interface</h2>
            <div class="screenshot-section">
                <div class="screenshot-placeholder">
                    <h3>Application Screenshots</h3>
                    <div class="screenshot-box">
                        <p>🖼️ Certificate Management Interface</p>
                        <small>Displays owned NFT certificate list</small>
                    </div>
                    <div class="screenshot-box">
                        <p>✍️ Certificate Issuance Interface</p>
                        <small>Enter recipient info and issue new certificates</small>
                    </div>
                    <div class="screenshot-box">
                        <p>🔍 Etherscan Verification</p>
                        <small>View certificate details on blockchain explorer</small>
                    </div>
                </div>
                <p class="demo-note">💡 Live Demo: Can demonstrate the running system on-site</p>
            </div>
        </section>

        <!-- Slide 8: Technical Challenges -->
        <section class="slide">
            <h2>⚡ Technical Challenges & Solutions</h2>
            <div class="challenges">
                <div class="challenge-item">
                    <h3>🔧 Challenge 1: ABI Mismatch</h3>
                    <p><strong>Problem:</strong> Frontend ABI didn't match actual contract signature, causing "could not decode result data" errors</p>
                    <p><strong>Solution:</strong> Fixed ABI definition, removed non-existent imageURI parameter, updated getCertificatesByOwner return type to uint256[]</p>
                </div>
                <div class="challenge-item">
                    <h3>🌐 Challenge 2: OpenSea Testnet Sunset</h3>
                    <p><strong>Problem:</strong> OpenSea discontinued testnet support in 2024, breaking original NFT viewing functionality</p>
                    <p><strong>Solution:</strong> Switched to Etherscan NFT viewer, providing complete on-chain information verification</p>
                </div>
                <div class="challenge-item">
                    <h3>🔑 Challenge 3: Private Key Management</h3>
                    <p><strong>Problem:</strong> Used wallet address instead of private key during deployment, causing deployment failure</p>
                    <p><strong>Solution:</strong> Created detailed environment variable setup guide to ensure correct private key configuration</p>
                </div>
            </div>
        </section>

        <!-- Slide 9: Development Process -->
        <section class="slide">
            <h2>🛠️ Development Process</h2>
            <div class="timeline">
                <div class="timeline-item">
                    <div class="timeline-marker">1</div>
                    <div class="timeline-content">
                        <h4>Requirements Analysis & Design</h4>
                        <p>Define certificate types, smart contract architecture, and frontend features</p>
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-marker">2</div>
                    <div class="timeline-content">
                        <h4>Smart Contract Development</h4>
                        <p>Develop ERC-721 NFT contract using Solidity, integrate OpenZeppelin</p>
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-marker">3</div>
                    <div class="timeline-content">
                        <h4>Frontend Development</h4>
                        <p>React + TypeScript, integrate MetaMask, implement certificate management interface</p>
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-marker">4</div>
                    <div class="timeline-content">
                        <h4>Testnet Deployment</h4>
                        <p>Deploy to Sepolia testnet, conduct functional testing and verification</p>
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-marker">5</div>
                    <div class="timeline-content">
                        <h4>Bug Fixes & Optimization</h4>
                        <p>Resolve ABI mismatch, update UI, improve user experience</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Slide 10: Key Learnings -->
        <section class="slide">
            <h2>📚 Key Learnings</h2>
            <div class="learnings-grid">
                <div class="learning-card">
                    <h3>🔗 Blockchain Development</h3>
                    <ul>
                        <li>Solidity smart contract programming</li>
                        <li>ERC-721 NFT standard implementation</li>
                        <li>Gas optimization techniques</li>
                        <li>Contract security considerations</li>
                    </ul>
                </div>
                <div class="learning-card">
                    <h3>⚛️ Web3 Integration</h3>
                    <ul>
                        <li>ethers.js 6.x usage</li>
                        <li>MetaMask wallet integration</li>
                        <li>Transaction signing and sending</li>
                        <li>Event listening and handling</li>
                    </ul>
                </div>
                <div class="learning-card">
                    <h3>🛠️ Development Tools</h3>
                    <ul>
                        <li>Hardhat development environment</li>
                        <li>Etherscan API usage</li>
                        <li>Testnet deployment process</li>
                        <li>Contract verification methods</li>
                    </ul>
                </div>
                <div class="learning-card">
                    <h3>🎨 Frontend Development</h3>
                    <ul>
                        <li>Advanced React Hooks usage</li>
                        <li>TypeScript type safety</li>
                        <li>Responsive design practices</li>
                        <li>Error handling best practices</li>
                    </ul>
                </div>
            </div>
        </section>

        <!-- Slide 11: Future Enhancements -->
        <section class="slide">
            <h2>🚀 Future Enhancements</h2>
            <div class="future-grid">
                <div class="future-card">
                    <h3>📱 Feature Extensions</h3>
                    <ul>
                        <li>Certificate transfer functionality</li>
                        <li>Certificate expiration mechanism</li>
                        <li>Certificate revocation feature</li>
                        <li>Multi-language support (i18n)</li>
                    </ul>
                </div>
                <div class="future-card">
                    <h3>🎨 UI/UX Improvements</h3>
                    <ul>
                        <li>Certificate preview feature</li>
                        <li>Custom certificate styling</li>
                        <li>PDF export functionality</li>
                        <li>Social media sharing</li>
                    </ul>
                </div>
                <div class="future-card">
                    <h3>⛓️ Blockchain Upgrades</h3>
                    <ul>
                        <li>Deploy to Mainnet</li>
                        <li>Multi-chain support (Polygon, BSC)</li>
                        <li>Layer 2 integration (Optimism)</li>
                        <li>Cross-chain bridge functionality</li>
                    </ul>
                </div>
                <div class="future-card">
                    <h3>🔐 Security Enhancements</h3>
                    <ul>
                        <li>Multi-signature permission management</li>
                        <li>Role-based access control</li>
                        <li>Smart contract auditing</li>
                        <li>Emergency pause mechanism</li>
                    </ul>
                </div>
            </div>
        </section>

        <!-- Slide 12: Project Statistics -->
        <section class="slide">
            <h2>📊 Project Statistics</h2>
            <div class="stats-container">
                <div class="stat-card">
                    <div class="stat-number">2,000+</div>
                    <div class="stat-label">Lines of Code</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">15+</div>
                    <div class="stat-label">Core Features</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">6</div>
                    <div class="stat-label">Certificate Types</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">100%</div>
                    <div class="stat-label">Test Coverage</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">0.0004</div>
                    <div class="stat-label">ETH Gas Cost</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">1+</div>
                    <div class="stat-label">Certificates Issued</div>
                </div>
            </div>
            <div class="tech-count">
                <h3>Technology Stack Composition</h3>
                <div class="tech-breakdown">
                    <div class="tech-bar">
                        <span class="bar-label">Solidity</span>
                        <div class="bar" style="width: 30%; background: #363636;">30%</div>
                    </div>
                    <div class="tech-bar">
                        <span class="bar-label">TypeScript</span>
                        <div class="bar" style="width: 40%; background: #3178c6;">40%</div>
                    </div>
                    <div class="tech-bar">
                        <span class="bar-label">React/JSX</span>
                        <div class="bar" style="width: 20%; background: #61dafb;">20%</div>
                    </div>
                    <div class="tech-bar">
                        <span class="bar-label">CSS</span>
                        <div class="bar" style="width: 10%; background: #264de4;">10%</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Slide 13: Conclusion -->
        <section class="slide">
            <h2>💡 Project Summary</h2>
            <div class="conclusion">
                <div class="conclusion-box success">
                    <h3>✅ Achievements</h3>
                    <ul>
                        <li>Successfully developed complete NFT certificate system</li>
                        <li>Deployed to Sepolia testnet and verified</li>
                        <li>Seamless frontend and smart contract integration</li>
                        <li>Issued first blockchain certificate</li>
                        <li>Established comprehensive technical documentation</li>
                    </ul>
                </div>
                <div class="conclusion-box highlight">
                    <h3>🎯 Core Values</h3>
                    <ul>
                        <li><strong>Immutable:</strong> Blockchain ensures permanent certificate validity</li>
                        <li><strong>Verifiable:</strong> Anyone can verify certificate authenticity</li>
                        <li><strong>Decentralized:</strong> No dependence on centralized institutions</li>
                        <li><strong>Permanent Storage:</strong> Certificates forever stored on-chain</li>
                        <li><strong>True Ownership:</strong> NFTs fully belong to holders</li>
                    </ul>
                </div>
            </div>
        </section>
    </div>

    <!-- Navigation Controls -->
    <div class="controls">
        <button id="prevBtn" class="nav-btn">◀ Previous</button>
        <span id="slideNumber" class="slide-counter">1 / 13</span>
        <button id="nextBtn" class="nav-btn">Next ▶</button>
    </div>

    <script src="script.js"></script>
</body>
</html>
'''

# 寫入文件
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("✅ 英文版 HTML 簡報已生成！")
print("📊 總投影片數: 13 張（移除了首頁和結尾頁）")
print("🌐 語言: 英文")
