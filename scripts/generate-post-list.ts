import path from 'path';
import fs from 'fs/promises';
import { generatePostList } from '@/content/post.service';
import { generateDiaryList } from '@/content/diary.service';

async function writeJsonPublic<T>(filename: string, data: T) {
  const filePath = path.join(process.cwd(), 'public', filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}

async function generatePostAndDiaryList() {
  try {
    const postList = await generatePostList();
    const diaryList = await generateDiaryList();

    await Promise.all([
      writeJsonPublic('postList.json', postList),
      writeJsonPublic('diaryList.json', diaryList),
    ]);

    console.log('✅ JSON 파일 생성 완료: postList.json, diaryList.json');
  } catch (err) {
    console.error('🚨 오류 발생:', err);
    process.exit(1);
  }
}

export default generatePostAndDiaryList();
