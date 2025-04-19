import path from 'path';
import fs from 'fs-extra';
import sizeOf from 'image-size';

const srcDir = path.join(process.cwd(), 'contents/posts');
const output = path.join(process.cwd(), 'public/image-info.json');

const supportedExtensions = /\.(webp|jpg|jpeg|png)$/i;

async function collectImageSizes() {
  const imageInfo: Record<string, { width: number; height: number }> = {};

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
          const dimensions = sizeOf(fileBuffer);
          if (dimensions.width && dimensions.height) {
            imageInfo[relPath.replace(/\\/g, '/')] = {
              width: dimensions.width,
              height: dimensions.height,
            };
          }
        } catch (err) {
          console.warn(`❌ 사이즈 읽기 실패: ${relPath}`, err);
        }
      }
    }
  }

  await walk(srcDir);
  await fs.writeJson(output, imageInfo, { spaces: 2 });
  console.log('✅ 이미지 크기 정보 저장 완료:', output);
}

export default collectImageSizes();