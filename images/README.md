# 證書圖片說明

這個目錄用於存放各種證書類型的圖片。

## 建議的圖片規格

- **解析度**: 1000x1000 像素
- **格式**: PNG 或 JPG
- **大小**: 建議小於 2MB
- **風格**: 正式、專業、具有紀念價值

## 證書圖片命名建議

- `blockchain-pioneer.png` - 區塊鏈先驅者證書圖片
- `eternal-friendship.png` - 友情不滅證書圖片  
- `web3-citizen.png` - Web3.0 公民證圖片
- `course-completion.png` - 課程完成證明圖片

## 設計建議

### 區塊鏈先驅者證書
- 使用科技感的設計元素
- 藍色或紫色為主色調
- 包含區塊鏈相關圖標
- 體現先驅精神和創新

### 友情不滅證書
- 溫暖的色彩設計
- 粉色、金色為主色調
- 包含友誼相關元素
- 體現永恆和美好

### Web3.0 公民證
- 現代科技風格
- 綠色或藍色漸層
- Web3 相關圖標
- 體現社群歸屬感

### 課程完成證明
- 學術風格設計
- 深藍色或棕色
- 教育相關元素
- 正式且莊重

## 上傳到 IPFS

使用以下命令將圖片上傳到 IPFS：

```javascript
const IPFSUploader = require('../scripts/ipfs-uploader.js');

const uploader = new IPFSUploader(
  process.env.PINATA_API_KEY,
  process.env.PINATA_SECRET_API_KEY
);

// 上傳所有證書圖片
uploader.uploadCertificateImages('./images')
  .then(hashes => {
    console.log('所有圖片上傳完成:', hashes);
    // 將 IPFS hashes 更新到合約中
  })
  .catch(console.error);
```

## 注意事項

1. 上傳前請確保圖片符合版權要求
2. 建議使用高品質的設計，因為這將是永久保存的
3. 上傳到 IPFS 後請記錄 hash 值
4. 在合約中更新 certificateImages 映射