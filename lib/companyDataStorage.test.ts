import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { SupabaseClient } from '@supabase/supabase-js';
import {
  getCompanyDocuments,
  writeCompanyDocument,
  clearCompanyDataDirectory,
} from './companyDataStorage';

// Mock the entire supabaseClient module
jest.mock('./supabaseClient', () => ({
  supabase: mockDeep<SupabaseClient>(),
}));

// Import the mocked supabase client
import { supabase } from './supabaseClient';

describe('companyDataStorage', () => {
  let mockSupabaseClient: DeepMockProxy<SupabaseClient>;

  beforeEach(() => {
    // Reset the mock before each test
    mockSupabaseClient = supabase as DeepMockProxy<SupabaseClient>;
    (supabase as any).mockClear();
  });

  describe('getCompanyDocuments', () => {
    it('should fetch documents for a given user', async () => {
      const userId = 'test-user-id';
      const mockDocuments = [
        { id: 1, user_id: userId, document_name: 'doc1', content: 'content1' },
        { id: 2, user_id: userId, document_name: 'doc2', content: 'content2' },
      ];

      mockSupabaseClient.from.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ data: mockDocuments, error: null }),
      } as any);

      const documents = await getCompanyDocuments(userId);
      expect(documents).toEqual(mockDocuments);
      expect(mockSupabaseClient.from).toHaveBeenCalledWith('company_documents');
      expect(mockSupabaseClient.from('company_documents').select).toHaveBeenCalledWith('*');
      expect(mockSupabaseClient.from('company_documents').select('*').eq).toHaveBeenCalledWith('user_id', userId);
    });

    it('should throw an error if fetching documents fails', async () => {
      const userId = 'test-user-id';
      const mockError = new Error('Failed to fetch');

      mockSupabaseClient.from.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ data: null, error: mockError }),
      } as any);

      await expect(getCompanyDocuments(userId)).rejects.toThrow(mockError);
    });
  });

  describe('writeCompanyDocument', () => {
    it('should upsert a document', async () => {
      const userId = 'test-user-id';
      const documentName = 'new-doc';
      const content = 'new content data';

      mockSupabaseClient.from.mockReturnValue({
        upsert: jest.fn().mockResolvedValue({ error: null }),
      } as any);

      await writeCompanyDocument(userId, documentName, content);

      expect(mockSupabaseClient.from).toHaveBeenCalledWith('company_documents');
      expect(mockSupabaseClient.from('company_documents').upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          user_id: userId,
          document_name: documentName,
          content: content,
        }),
        { onConflict: 'user_id,document_name' }
      );
    });

    it('should throw an error if upserting a document fails', async () => {
      const userId = 'test-user-id';
      const documentName = 'new-doc';
      const content = 'new content data';
      const mockError = new Error('Failed to upsert');

      mockSupabaseClient.from.mockReturnValue({
        upsert: jest.fn().mockResolvedValue({ error: mockError }),
      } as any);

      await expect(writeCompanyDocument(userId, documentName, content)).rejects.toThrow(mockError);
    });
  });

  describe('clearCompanyDataDirectory', () => {
    it('should delete all documents for a given user', async () => {
      const userId = 'test-user-id';

      mockSupabaseClient.from.mockReturnValue({
        delete: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ error: null }),
      } as any);

      await clearCompanyDataDirectory(userId);

      expect(mockSupabaseClient.from).toHaveBeenCalledWith('company_documents');
      expect(mockSupabaseClient.from('company_documents').delete).toHaveBeenCalled();
      expect(mockSupabaseClient.from('company_documents').delete().eq).toHaveBeenCalledWith('user_id', userId);
    });

    it('should throw an error if clearing company data directory fails', async () => {
      const userId = 'test-user-id';
      const mockError = new Error('Failed to delete');

      mockSupabaseClient.from.mockReturnValue({
        delete: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ error: mockError }),
      } as any);

      await expect(clearCompanyDataDirectory(userId)).rejects.toThrow(mockError);
    });
  });
});