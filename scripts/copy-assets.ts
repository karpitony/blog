import path from 'path';
import fs from 'fs-extra';

const srcDir = path.join(process.cwd(), 'contents');
const destDir = path.join(process.cwd(), 'public', 'contents');

fs.copy(srcDir, destDir)
  .then(() => console.log('✅ 콘텐츠 assets 복사 완료'))
  .catch((err: unknown) => console.error('❌ 복사 실패:', err));
