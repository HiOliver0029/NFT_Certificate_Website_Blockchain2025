import { expect } from "chai";
import { ethers } from "hardhat";
import { EternalDigitalHonorCertificate } from "../typechain-types";

describe("EternalDigitalHonorCertificate", function () {
  let certificate: EternalDigitalHonorCertificate;
  let owner: any;
  let recipient: any;
  let otherAccount: any;

  beforeEach(async function () {
    [owner, recipient, otherAccount] = await ethers.getSigners();

    const CertificateFactory = await ethers.getContractFactory("EternalDigitalHonorCertificate");
    certificate = await CertificateFactory.deploy();
    await certificate.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await certificate.owner()).to.equal(owner.address);
    });

    it("Should have correct name and symbol", async function () {
      expect(await certificate.name()).to.equal("Eternal Digital Honor Certificate");
      expect(await certificate.symbol()).to.equal("EDHC");
    });
  });

  describe("Certificate Issuance", function () {
    it("Should issue a certificate successfully", async function () {
      const certType = 0; // BLOCKCHAIN_PIONEER
      const recipientName = "Alice";
      const issuerName = "Bob";
      const customMessage = "Congratulations on your first NFT!";

      await certificate.issueCertificate(
        recipient.address,
        certType,
        recipientName,
        issuerName,
        customMessage
      );

      expect(await certificate.balanceOf(recipient.address)).to.equal(1);
      expect(await certificate.ownerOf(1)).to.equal(recipient.address);
      
      const certificateData = await certificate.certificates(1);
      expect(certificateData.recipientName).to.equal(recipientName);
      expect(certificateData.issuerName).to.equal(issuerName);
      expect(certificateData.customMessage).to.equal(customMessage);
    });

    it("Should emit CertificateIssued event", async function () {
      const certType = 1; // ETERNAL_FRIENDSHIP
      const recipientName = "Charlie";
      const issuerName = "Dave";
      const customMessage = "Forever friends!";

      await expect(certificate.issueCertificate(
        recipient.address,
        certType,
        recipientName,
        issuerName,
        customMessage
      )).to.emit(certificate, "CertificateIssued")
        .withArgs(1, recipient.address, certType, recipientName);
    });

    it("Should only allow owner to issue certificates", async function () {
      await expect(
        certificate.connect(otherAccount).issueCertificate(
          recipient.address,
          0,
          "Alice",
          "Bob",
          "Test"
        )
      ).to.be.revertedWithCustomError(certificate, "OwnableUnauthorizedAccount");
    });
  });

  describe("Batch Certificate Issuance", function () {
    it("Should issue multiple certificates at once", async function () {
      const recipients = [recipient.address, otherAccount.address];
      const names = ["Alice", "Bob"];
      const certType = 2; // WEB3_CITIZEN
      const issuerName = "Certificate Authority";
      const customMessage = "Welcome to Web3!";

      await certificate.batchIssueCertificates(
        recipients,
        certType,
        names,
        issuerName,
        customMessage
      );

      expect(await certificate.balanceOf(recipient.address)).to.equal(1);
      expect(await certificate.balanceOf(otherAccount.address)).to.equal(1);
      expect(await certificate.getTotalCertificates()).to.equal(2);
    });
  });

  describe("Certificate Queries", function () {
    beforeEach(async function () {
      // Issue some test certificates
      await certificate.issueCertificate(
        recipient.address,
        0,
        "Alice",
        "Bob",
        "First certificate"
      );
      await certificate.issueCertificate(
        recipient.address,
        1,
        "Alice",
        "Bob",
        "Second certificate"
      );
    });

    it("Should get certificates by owner", async function () {
      const tokenIds = await certificate.getCertificatesByOwner(recipient.address);
      expect(tokenIds.length).to.equal(2);
      expect(tokenIds[0]).to.equal(1);
      expect(tokenIds[1]).to.equal(2);
    });

    it("Should get certificate type names", async function () {
      expect(await certificate.getCertificateTypeName(0)).to.equal("Blockchain Pioneer Certificate");
      expect(await certificate.getCertificateTypeNameChinese(1)).to.equal("友情不滅證書");
    });

    it("Should generate metadata correctly", async function () {
      const metadata = await certificate.generateMetadata(1);
      expect(metadata).to.include("data:application/json;base64,");
    });
  });

  describe("Certificate Counting", function () {
    it("Should track certificate counts by type", async function () {
      await certificate.issueCertificate(recipient.address, 0, "Alice", "Bob", "Test");
      await certificate.issueCertificate(otherAccount.address, 0, "Charlie", "Bob", "Test");
      await certificate.issueCertificate(recipient.address, 1, "Alice", "Bob", "Test");

      expect(await certificate.certificateCount(0)).to.equal(2);
      expect(await certificate.certificateCount(1)).to.equal(1);
      expect(await certificate.getTotalCertificates()).to.equal(3);
    });
  });
});