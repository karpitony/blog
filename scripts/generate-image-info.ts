import path from 'path';
import fs from 'fs-extra';
import sizeOf from 'image-size';
import sharp from 'sharp';

const srcDir = path.join(process.cwd(), 'contents/posts');
const output = path.join(process.cwd(), 'public/image-info.json');
const supportedExtensions = /\.(webp|jpg|jpeg|png)$/i;

type ImageInfo = {
  width: number;
  height: number;
  blurDataURL?: string; // blurDataURL 추가
};

async function collectImageSizes() {
  const imageInfo: Record<string, ImageInfo> = {};

  async function walk(dir: string, relativePath = '') {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relPath = path.join(relativePath, entry.name);

      if (entry.isDirectory()) {
        await walk(fullPath, relPath);
      } else if (supportedExtensions.test(entry.name)) {
        try {
          const fileBuffer = fs.readFileSync(fullPath);
          
          // 1. 이미지 크기 추출
          const dimensions = sizeOf(fileBuffer);
          if (!dimensions.width || !dimensions.height) continue;

          // 2. blurDataURL 생성 (10x10 JPEG)
          const blurBuffer = await sharp(fileBuffer)
            .resize(80, 60, { fit: 'inside' })
            .webp({ quality: 30 }) // 품질 낮춤
            .toBuffer();

          const base64 = blurBuffer.toString('base64');
          const blurDataURL = `data:image/webp;base64,${base64}`;

          // 3. 정보 저장
          imageInfo[relPath.replace(/\\/g, '/')] = {
            width: dimensions.width,
            height: dimensions.height,
            blurDataURL,
          }
        } catch (err) {
          console.warn(`❌ 사이즈 읽기 실패: ${relPath}`, err);
        }
      }
    }
  }

  await walk(srcDir);
  await fs.writeJson(output, imageInfo, { spaces: 2 });
  console.log('✅ 이미지 크기 정보 저장, blurBaseURL 생성 완료');
}

export default collectImageSizes();