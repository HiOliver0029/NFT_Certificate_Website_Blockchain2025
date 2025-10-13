// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

/**
 * @title EternalDigitalHonorCertificate
 * @dev 永恆數位榮譽證書 - 基於區塊鏈的 NFT 證書發行系統
 * 
 * 功能特色：
 * - 發行多種類型的數位證書 NFT
 * - 支援動態 metadata 生成
 * - 可驗證的永久數位證書
 * - 支援批量發放證書
 */
contract EternalDigitalHonorCertificate is ERC721, ERC721URIStorage, Ownable {
    using Strings for uint256;

    // 證書類型枚舉
    enum CertificateType {
        BLOCKCHAIN_PIONEER,    // 區塊鏈先驅者證書
        ETERNAL_FRIENDSHIP,    // 友情不滅證書
        WEB3_CITIZEN,         // Web3.0 公民證
        COURSE_COMPLETION     // 區塊鏈課程完成證明
    }

    // 證書資訊結構
    struct Certificate {
        CertificateType certType;
        string recipientName;
        string issuerName;
        uint256 issueDate;
        string customMessage;
        string imageURI;
    }

    // 狀態變數
    uint256 private _tokenIdCounter;
    mapping(uint256 => Certificate) public certificates;
    mapping(CertificateType => uint256) public certificateCount;
    mapping(CertificateType => string) public certificateImages;
    
    // 事件
    event CertificateIssued(
        uint256 indexed tokenId,
        address indexed recipient,
        CertificateType certType,
        string recipientName
    );

    constructor() ERC721("Eternal Digital Honor Certificate", "EDHC") Ownable(msg.sender) {
        _tokenIdCounter = 1;
        
        // 初始化證書圖片 URI (可以是 IPFS 連結)
        certificateImages[CertificateType.BLOCKCHAIN_PIONEER] = "ipfs://QmBlockchainPioneer...";
        certificateImages[CertificateType.ETERNAL_FRIENDSHIP] = "ipfs://QmEternalFriendship...";
        certificateImages[CertificateType.WEB3_CITIZEN] = "ipfs://QmWeb3Citizen...";
        certificateImages[CertificateType.COURSE_COMPLETION] = "ipfs://QmCourseCompletion...";
    }

    /**
     * @dev 發行證書給指定地址
     * @param to 接收證書的地址
     * @param certType 證書類型
     * @param recipientName 接收者姓名
     * @param issuerName 發行者姓名
     * @param customMessage 自定義訊息
     */
    function issueCertificate(
        address to,
        CertificateType certType,
        string memory recipientName,
        string memory issuerName,
        string memory customMessage
    ) public onlyOwner returns (uint256) {
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;

        // 創建證書資訊
        certificates[tokenId] = Certificate({
            certType: certType,
            recipientName: recipientName,
            issuerName: issuerName,
            issueDate: block.timestamp,
            customMessage: customMessage,
            imageURI: certificateImages[certType]
        });

        // 鑄造 NFT
        _safeMint(to, tokenId);
        
        // 增加該類型證書計數
        certificateCount[certType]++;

        emit CertificateIssued(tokenId, to, certType, recipientName);
        
        return tokenId;
    }

    /**
     * @dev 批量發行證書
     * @param recipients 接收者地址數組
     * @param certType 證書類型
     * @param recipientNames 接收者姓名數組
     * @param issuerName 發行者姓名
     * @param customMessage 自定義訊息
     */
    function batchIssueCertificates(
        address[] memory recipients,
        CertificateType certType,
        string[] memory recipientNames,
        string memory issuerName,
        string memory customMessage
    ) public onlyOwner {
        require(recipients.length == recipientNames.length, "Arrays length mismatch");
        
        for (uint256 i = 0; i < recipients.length; i++) {
            issueCertificate(recipients[i], certType, recipientNames[i], issuerName, customMessage);
        }
    }

    /**
     * @dev 更新證書圖片 URI
     * @param certType 證書類型
     * @param imageURI 新的圖片 URI
     */
    function updateCertificateImage(CertificateType certType, string memory imageURI) public onlyOwner {
        certificateImages[certType] = imageURI;
    }

    /**
     * @dev 獲取證書類型的名稱
     * @param certType 證書類型
     * @return 證書類型名稱
     */
    function getCertificateTypeName(CertificateType certType) public pure returns (string memory) {
        if (certType == CertificateType.BLOCKCHAIN_PIONEER) {
            return "Blockchain Pioneer Certificate";
        } else if (certType == CertificateType.ETERNAL_FRIENDSHIP) {
            return "Eternal Friendship Certificate";
        } else if (certType == CertificateType.WEB3_CITIZEN) {
            return "Web3.0 Citizen Certificate";
        } else if (certType == CertificateType.COURSE_COMPLETION) {
            return "Course Completion Certificate";
        }
        return "Unknown Certificate";
    }

    /**
     * @dev 獲取證書類型的中文名稱
     * @param certType 證書類型
     * @return 證書類型中文名稱
     */
    function getCertificateTypeNameChinese(CertificateType certType) public pure returns (string memory) {
        if (certType == CertificateType.BLOCKCHAIN_PIONEER) {
            return unicode"區塊鏈先驅者證書";
        } else if (certType == CertificateType.ETERNAL_FRIENDSHIP) {
            return unicode"友情不滅證書";
        } else if (certType == CertificateType.WEB3_CITIZEN) {
            return unicode"Web3.0 公民證";
        } else if (certType == CertificateType.COURSE_COMPLETION) {
            return unicode"區塊鏈課程完成證明";
        }
        return unicode"未知證書";
    }

    /**
     * @dev 生成證書的 metadata JSON
     * @param tokenId Token ID
     * @return 完整的 metadata JSON 字符串
     */
    function generateMetadata(uint256 tokenId) public view returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        
        Certificate memory cert = certificates[tokenId];
        
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        getCertificateTypeName(cert.certType),
                        ' #',
                        tokenId.toString(),
                        '", "description": "',
                        unicode"永恆數位榮譽證書 - 基於區塊鏈的不可竄改數位證書，證明持有者的成就與榮譽。",
                        '", "image": "',
                        cert.imageURI,
                        '", "attributes": [',
                        '{"trait_type": "Certificate Type", "value": "',
                        getCertificateTypeName(cert.certType),
                        '"}, {"trait_type": "Recipient", "value": "',
                        cert.recipientName,
                        '"}, {"trait_type": "Issuer", "value": "',
                        cert.issuerName,
                        '"}, {"trait_type": "Issue Date", "value": "',
                        cert.issueDate.toString(),
                        '"}, {"trait_type": "Custom Message", "value": "',
                        cert.customMessage,
                        '"}]}'
                    )
                )
            )
        );
        
        return string(abi.encodePacked("data:application/json;base64,", json));
    }

    /**
     * @dev Override tokenURI to return dynamic metadata
     * @param tokenId Token ID
     * @return Token URI
     */
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return generateMetadata(tokenId);
    }

    /**
     * @dev 獲取用戶的所有證書
     * @param owner 用戶地址
     * @return tokenIds 該用戶擁有的所有 token ID
     */
    function getCertificatesByOwner(address owner) public view returns (uint256[] memory) {
        uint256 tokenCount = balanceOf(owner);
        uint256[] memory tokenIds = new uint256[](tokenCount);
        uint256 index = 0;
        
        for (uint256 i = 1; i < _tokenIdCounter; i++) {
            if (_ownerOf(i) == owner) {
                tokenIds[index] = i;
                index++;
            }
        }
        
        return tokenIds;
    }

    /**
     * @dev 獲取總發行的證書數量
     * @return 總證書數量
     */
    function getTotalCertificates() public view returns (uint256) {
        return _tokenIdCounter - 1;
    }

    // Required overrides
    function supportsInterface(bytes4 interfaceId) 
        public 
        view 
        override(ERC721, ERC721URIStorage) 
        returns (bool) 
    {
        return super.supportsInterface(interfaceId);
    }
}