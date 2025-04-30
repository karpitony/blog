import path from 'path';
import fs from 'fs-extra';
import sizeOf from 'image-size';
import sharp from 'sharp';

const srcDirs = {
  posts: path.join(process.cwd(), 'contents/posts'),
  projects: path.join(process.cwd(), 'contents/projects'),
};
const output = path.join(process.cwd(), 'public/image-info.json');
const supportedExtensions = /\.(webp|jpg|jpeg|png)$/i;

type ImageInfo = {
  width: number;
  height: number;
  blurDataURL?: string;
};

type ImageInfoMap = Record<string, ImageInfo>;

async function collectImageSizes() {
  const imageInfo: { posts: ImageInfoMap; projects: ImageInfoMap } = {
    posts: {},
    projects: {},
  };

  async function walk(dir: string, target: keyof typeof imageInfo, relativePath = '') {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relPath = path.join(relativePath, entry.name);

      if (entry.isDirectory()) {
        await walk(fullPath, target, relPath);
      } else if (supportedExtensions.test(entry.name)) {
        try {
          const fileBuffer = fs.readFileSync(fullPath);

          const dimensions = sizeOf(fileBuffer);
          if (!dimensions.width || !dimensions.height) continue;

          const blurBuffer = await sharp(fileBuffer)
            .resize(80, 60, { fit: 'inside' })
            .webp({ quality: 30 })
            .toBuffer();

          const base64 = blurBuffer.toString('base64');
          const blurDataURL = `data:image/webp;base64,${base64}`;

          imageInfo[target][relPath.replace(/\\/g, '/')] = {
            width: dimensions.width,
            height: dimensions.height,
            blurDataURL,
          };
        } catch (err) {
          console.warn(`❌ 사이즈 읽기 실패: ${target}/${relPath}`, err);
        }
      }
    }
  }

  // posts, projects 각각 walk
  await Promise.all([
    walk(srcDirs.posts, 'posts'),
    walk(srcDirs.projects, 'projects'),
  ]);

  await fs.writeJson(output, imageInfo, { spaces: 2 });
  console.log('✅ 이미지 크기 정보 저장, blurBaseURL 생성 완료');
}

export default collectImageSizes();
