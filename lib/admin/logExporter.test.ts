import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { SupabaseClient } from '@supabase/supabase-js';
import { exportUsageLogs, jsonToCsv } from './logExporter';
import * as supabaseClientModule from '../supabaseClient';

jest.mock('../supabaseClient', () => ({
    supabase: mockDeep<SupabaseClient>(),
}));

describe('logExporter', () => {
    let mockSupabaseClient: DeepMockProxy<SupabaseClient>;

    beforeEach(() => {
        mockSupabaseClient = (supabaseClientModule.supabase as unknown) as DeepMockProxy<SupabaseClient>;
        jest.clearAllMocks();
    });

    describe('exportUsageLogs', () => {
        it('should return usage logs when the Supabase call is successful', async () => {
            const mockData = [
                { id: 1, user_id: 'user1', event: 'login', created_at: '2023-01-01T10:00:00Z' },
                { id: 2, user_id: 'user2', event: 'logout', created_at: '2023-01-01T11:00:00Z' },
            ];

            const mockOrder = jest.fn().mockResolvedValue({ data: mockData, error: null });
            const mockSelect = jest.fn().mockReturnValue({ order: mockOrder });
            mockSupabaseClient.from.mockReturnValue({ select: mockSelect } as any);

            const result = await exportUsageLogs();
            expect(result).toEqual(mockData);
            expect(mockSupabaseClient.from).toHaveBeenCalledWith('usage_logs');
            expect(mockSelect).toHaveBeenCalledWith('*');
            expect(mockOrder).toHaveBeenCalledWith('created_at', { ascending: false });
        });

        it('should throw an error if the Supabase client returns an error', async () => {
            const mockError = new Error('Failed to fetch logs');

            const mockOrder = jest.fn().mockResolvedValue({ data: null, error: mockError });
            const mockSelect = jest.fn().mockReturnValue({ order: mockOrder });
            mockSupabaseClient.from.mockReturnValue({ select: mockSelect } as any);

            await expect(exportUsageLogs()).rejects.toThrow('Failed to fetch logs');
            expect(mockSupabaseClient.from).toHaveBeenCalledWith('usage_logs');
            expect(mockSelect).toHaveBeenCalledWith('*');
            expect(mockOrder).toHaveBeenCalledWith('created_at', { ascending: false });
        });
    });

    describe('jsonToCsv', () => {
        it('should convert a JSON array to a CSV string with headers', () => {
            const jsonData = [
                { id: 1, name: 'Alice', age: 30 },
                { id: 2, name: 'Bob', age: 24 },
                { id: 3, name: 'Charlie', age: null },
            ];
            const expectedCsv = 'id,name,age\r\n1,"Alice",30\r\n2,"Bob",24\r\n3,"Charlie",';
            const result = jsonToCsv(jsonData);
            expect(result).toEqual(expectedCsv);
        });

        it('should handle empty JSON array', () => {
            const jsonData: any[] = [];
            const expectedCsv = '';
            const result = jsonToCsv(jsonData);
            expect(result).toEqual(expectedCsv);
        });

        it('should handle JSON data with special characters and commas in values', () => {
            const jsonData = [
                { id: 1, description: 'Item with, comma', value: 'test' },
                { id: 2, description: 'Another "item"', value: 'value' },
            ];
            const expectedCsv = 'id,description,value\r\n1,"Item with, comma","test"\r\n2,"Another ""item""","value"';
            const result = jsonToCsv(jsonData);
            expect(result).toEqual(expectedCsv);
        });
    });
});