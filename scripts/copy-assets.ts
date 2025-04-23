import path from 'path';
import fs from 'fs-extra';

const srcDir = path.join(process.cwd(), 'contents');
const destDir = path.join(process.cwd(), 'public', 'contents');

async function copyOnlyImages(src: string, dest: string) {
  const entries = await fs.readdir(src, { withFileTypes: true });

  await fs.ensureDir(dest);

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyOnlyImages(srcPath, destPath);
    } else if (
      entry.isFile() &&
      /\.(webp|jpg|jpeg|png|gif)$/i.test(entry.name)
    ) {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

export default copyOnlyImages(srcDir, destDir)
  .then(() => console.log('✅ 이미지 파일만 복사 완료'))
  .catch((err) => console.error('❌ 복사 실패:', err));
