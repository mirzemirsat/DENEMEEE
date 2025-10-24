import { mockAccounts, mockTransfers, addMockTransfer } from './mock-data';

export interface Account {
  full_name: string;
  iban: string;
  balance: number;
  created_at: string;
}

export interface Transfer {
  id: number;
  amount: number;
  from_full_name: string | null;
  from_iban: string | null;
  to_full_name: string | null;
  to_iban: string | null;
  created_at: string;
}

export interface AccountDetail {
  account: Account;
  transfers: Transfer[];
}

export interface TransferCreate {
  fromIban: string;
  toIban: string;
  amount: number;
}

export interface TransferResponse {
  id: number;
}

export interface ErrorResponse {
  error: string;
}

export async function getAccounts(): Promise<Account[]> {
  await delay(300);
  return [...mockAccounts];
}

export async function getAccount(iban: string): Promise<AccountDetail> {
  await delay(300);
  
  const account = mockAccounts.find(acc => acc.iban === iban);
  
  if (!account) {
    throw new Error('Hesap bulunamadı');
  }

  const accountTransfers = mockTransfers.filter(
    transfer => transfer.from_iban === iban || transfer.to_iban === iban
  ).slice(0, 20);

  return {
    account: { ...account },
    transfers: accountTransfers,
  };
}

export async function createTransfer(transfer: TransferCreate): Promise<TransferResponse | ErrorResponse> {
  await delay(500);

  if (transfer.fromIban === transfer.toIban) {
    return { error: 'Gönderen ve alıcı IBAN aynı olamaz.' };
  }

  try {
    const id = addMockTransfer(transfer.fromIban, transfer.toIban, transfer.amount);
    return { id };
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function getTransfers(limit = 20, offset = 0): Promise<Transfer[]> {
  await delay(300);
  return mockTransfers.slice(offset, offset + limit);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  }).format(amount);
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
