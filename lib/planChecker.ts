import fs from 'fs/promises';
import path from 'path';

const packagesPath = path.resolve(process.cwd(), 'data/packages.json');

export interface Plan {
  name: string;
  token_limit: number;
  price: number;
}

export async function getPlan(planName: string): Promise<Plan | undefined> {
  const fileContent = await fs.readFile(packagesPath, 'utf-8');
  const plans: Plan[] = JSON.parse(fileContent);
  return plans.find(plan => plan.name === planName);
}
