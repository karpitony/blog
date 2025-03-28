import path from 'path';
import fs from 'fs/promises';

const publicDir = path.join(process.cwd(), 'public');

export async function readJsonPublic<T>(
  filename: string
): Promise<T | null> {
  try {
    const filePath = path.join(publicDir, filename);
    const json = await fs.readFile(filePath, 'utf8');
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}