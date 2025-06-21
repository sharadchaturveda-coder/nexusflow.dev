import fs from 'fs/promises';
import path from 'path';

const packagesPath = path.resolve(process.cwd(), 'data/packages.json');
const usersPath = path.resolve(process.cwd(), 'data/users.json');

export interface Plan {
  name: string;
  token_limit: number;
  price: number;
  model: 'gpt-3.5-turbo' | 'gpt-4o-mini';
}

export interface User {
    id: string;
    planId: string;
    botPersonality?: string;
    locked?: boolean;
}

export async function getPlanByUserId(userId: string): Promise<Plan | undefined> {
    const usersFileContent = await fs.readFile(usersPath, 'utf-8');
    const users: User[] = JSON.parse(usersFileContent);
    const user = users.find(u => u.id === userId);

    if (!user) {
        return undefined;
    }

    const packagesFileContent = await fs.readFile(packagesPath, 'utf-8');
    const plans: Plan[] = JSON.parse(packagesFileContent);
    return plans.find(plan => plan.name === user.planId);
}

export async function getUser(userId: string): Promise<User | undefined> {
    const usersFileContent = await fs.readFile(usersPath, 'utf-8');
    const users: User[] = JSON.parse(usersFileContent);
    return users.find(u => u.id === userId);
}
