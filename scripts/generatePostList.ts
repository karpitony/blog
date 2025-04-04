import path from 'path';
import fs from 'fs/promises';
import { generatePostList, PostData } from '@/libs/Post/getPostList';
import { generateDiaryList, DiaryData } from '@/libs/Diary/getDiaryList';

async function writeJsonPublic(filename: string, data: PostData[] | DiaryData[]) {
  const filePath = path.join(process.cwd(), 'public', filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}

async function main() {
  const blogList = await generatePostList();
  const diaryList = await generateDiaryList();

  await writeJsonPublic('postList.json', blogList);
  await writeJsonPublic('diaryList.json', diaryList);
  console.log('✅ postList.json, diaryList.json 생성 완료');
}

main().catch((err) => {
  console.error('🚨 오류 발생:', err);
  process.exit(1);
});
