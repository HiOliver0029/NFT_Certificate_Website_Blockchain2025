// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SimpleCertificate
 * @dev 簡化版證書合約用於測試
 */
contract SimpleCertificate is ERC721, Ownable {
    uint256 private _tokenIdCounter;
    
    struct Certificate {
        string recipientName;
        string certificateType;
        uint256 issueDate;
    }
    
    mapping(uint256 => Certificate) public certificates;
    
    event CertificateIssued(uint256 indexed tokenId, address indexed recipient, string certificateType);
    
    constructor() ERC721("Simple Certificate", "SC") Ownable(msg.sender) {
        _tokenIdCounter = 1;
    }
    
    function issueCertificate(
        address to,
        string memory recipientName,
        string memory certificateType
    ) public onlyOwner returns (uint256) {
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        
        certificates[tokenId] = Certificate({
            recipientName: recipientName,
            certificateType: certificateType,
            issueDate: block.timestamp
        });
        
        _safeMint(to, tokenId);
        
        emit CertificateIssued(tokenId, to, certificateType);
        
        return tokenId;
    }
    
    function getTotalCertificates() public view returns (uint256) {
        return _tokenIdCounter - 1;
    }
}