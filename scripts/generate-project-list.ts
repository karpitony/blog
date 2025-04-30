import path from 'path';
import fs from 'fs/promises';
import { generateProjectList } from '@/libs/Project/getProjectList';

async function writeJsonPublic<T>(filename: string, data: T) {
  const filePath = path.join(process.cwd(), 'public', filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}

async function generateProjectListFile() {
  try {
    const projectList = await generateProjectList();
    await writeJsonPublic('projectList.json', projectList);
    console.log('✅ JSON 파일 생성 완료: projectList.json');
  } catch (err) {
    console.error('🚨 오류 발생:', err);
    process.exit(1);
  }
}

export default generateProjectListFile();