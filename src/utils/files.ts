import * as fs from 'fs/promises';
import { join } from 'path';

export async function readSeedDataFile<T>(fileName: string): Promise<T> {
  const filePath = join('seed', `${fileName}.json`);
  const content = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(content);
}
