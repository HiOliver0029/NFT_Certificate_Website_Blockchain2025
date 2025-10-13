import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const EternalDigitalHonorCertificateModule = buildModule("EternalDigitalHonorCertificateModule", (m) => {
  // 部署永恆數位榮譽證書合約
  const certificate = m.contract("EternalDigitalHonorCertificate");

  return { certificate };
});

export default EternalDigitalHonorCertificateModule;