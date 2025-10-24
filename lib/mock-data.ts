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

export const mockAccounts: Account[] = [
  {
    full_name: 'Ahmet Yılmaz',
    iban: 'TR1234567890123456789012',
    balance: 15750.50,
    created_at: '2024-01-15T10:30:00Z',
  },
  {
    full_name: 'Ayşe Demir',
    iban: 'TR9876543210987654321098',
    balance: 8240.25,
    created_at: '2024-02-20T14:20:00Z',
  },
  {
    full_name: 'Mehmet Öz',
    iban: 'TR1111222233334444555566',
    balance: 25600.00,
    created_at: '2024-01-10T09:15:00Z',
  },
  {
    full_name: 'Fatma Kaya',
    iban: 'TR6666777788889999000011',
    balance: 3420.75,
    created_at: '2024-03-05T16:45:00Z',
  },
  {
    full_name: 'Ali Çelik',
    iban: 'TR5555444433332222111100',
    balance: 12890.00,
    created_at: '2024-02-01T11:00:00Z',
  },
];

export const mockTransfers: Transfer[] = [
  {
    id: 1,
    amount: 500.00,
    from_full_name: 'Ahmet Yılmaz',
    from_iban: 'TR1234567890123456789012',
    to_full_name: 'Ayşe Demir',
    to_iban: 'TR9876543210987654321098',
    created_at: '2024-10-24T10:30:00Z',
  },
  {
    id: 2,
    amount: 1200.50,
    from_full_name: 'Mehmet Öz',
    from_iban: 'TR1111222233334444555566',
    to_full_name: 'Ahmet Yılmaz',
    to_iban: 'TR1234567890123456789012',
    created_at: '2024-10-24T09:15:00Z',
  },
  {
    id: 3,
    amount: 750.25,
    from_full_name: 'Ayşe Demir',
    from_iban: 'TR9876543210987654321098',
    to_full_name: 'Fatma Kaya',
    to_iban: 'TR6666777788889999000011',
    created_at: '2024-10-23T16:20:00Z',
  },
  {
    id: 4,
    amount: 2000.00,
    from_full_name: 'Ali Çelik',
    from_iban: 'TR5555444433332222111100',
    to_full_name: 'Mehmet Öz',
    to_iban: 'TR1111222233334444555566',
    created_at: '2024-10-23T14:45:00Z',
  },
  {
    id: 5,
    amount: 350.00,
    from_full_name: 'Fatma Kaya',
    from_iban: 'TR6666777788889999000011',
    to_full_name: 'Ali Çelik',
    to_iban: 'TR5555444433332222111100',
    created_at: '2024-10-23T11:30:00Z',
  },
  {
    id: 6,
    amount: 890.75,
    from_full_name: 'Ahmet Yılmaz',
    from_iban: 'TR1234567890123456789012',
    to_full_name: 'Mehmet Öz',
    to_iban: 'TR1111222233334444555566',
    created_at: '2024-10-22T15:10:00Z',
  },
  {
    id: 7,
    amount: 1500.00,
    from_full_name: 'Mehmet Öz',
    from_iban: 'TR1111222233334444555566',
    to_full_name: 'Ayşe Demir',
    to_iban: 'TR9876543210987654321098',
    created_at: '2024-10-22T13:25:00Z',
  },
  {
    id: 8,
    amount: 425.50,
    from_full_name: 'Ayşe Demir',
    from_iban: 'TR9876543210987654321098',
    to_full_name: 'Ahmet Yılmaz',
    to_iban: 'TR1234567890123456789012',
    created_at: '2024-10-21T17:40:00Z',
  },
  {
    id: 9,
    amount: 3200.00,
    from_full_name: 'Ali Çelik',
    from_iban: 'TR5555444433332222111100',
    to_full_name: 'Fatma Kaya',
    to_iban: 'TR6666777788889999000011',
    created_at: '2024-10-21T10:15:00Z',
  },
  {
    id: 10,
    amount: 670.25,
    from_full_name: 'Fatma Kaya',
    from_iban: 'TR6666777788889999000011',
    to_full_name: 'Ahmet Yılmaz',
    to_iban: 'TR1234567890123456789012',
    created_at: '2024-10-20T14:50:00Z',
  },
];

let nextTransferId = 11;

export function addMockTransfer(fromIban: string, toIban: string, amount: number): number {
  const fromAccount = mockAccounts.find(acc => acc.iban === fromIban);
  const toAccount = mockAccounts.find(acc => acc.iban === toIban);

  if (!fromAccount) {
    throw new Error(`Gönderen hesap bulunamadı: ${fromIban}`);
  }

  if (!toAccount) {
    throw new Error(`Alıcı hesap bulunamadı: ${toIban}`);
  }

  if (fromAccount.balance < amount) {
    throw new Error(`Yetersiz bakiye. Mevcut bakiye: ${fromAccount.balance} TL, Transfer tutarı: ${amount} TL`);
  }

  fromAccount.balance -= amount;
  toAccount.balance += amount;

  const newTransfer: Transfer = {
    id: nextTransferId++,
    amount,
    from_full_name: fromAccount.full_name,
    from_iban: fromAccount.iban,
    to_full_name: toAccount.full_name,
    to_iban: toAccount.iban,
    created_at: new Date().toISOString(),
  };

  mockTransfers.unshift(newTransfer);

  return newTransfer.id;
}
