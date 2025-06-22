import fs from 'fs/promises';
import path from 'path';

const COMPANY_DATA_DIR = path.resolve(process.cwd(), 'data/company_data');

export async function ensureCompanyDataDirExists() {
  try {
    await fs.mkdir(COMPANY_DATA_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating company data directory:', error);
  }
}

export async function writeCompanyDocument(id: string, content: string): Promise<void> {
  const filePath = path.join(COMPANY_DATA_DIR, `${id}.json`);
  await fs.writeFile(filePath, content, 'utf-8');
}

export async function clearCompanyDataDirectory(): Promise<void> {
  try {
    await fs.rm(COMPANY_DATA_DIR, { recursive: true, force: true });
    await ensureCompanyDataDirExists(); // Recreate empty directory
  } catch (error) {
    console.error('Error clearing company data directory:', error);
  }
}