# Alternatif Bank Demo - Frontend

Bu proje Alternatif Bank deneyimini yerel ortamda taklit eden bir demo uygulamasıdır.

## Özellikler

- **Hesap Listesi**: Tüm hesapları görüntüleme ve arama
- **Hesap Detayı**: Bakiye ve son 20 işlemi görüntüleme
- **Para Transferi**: IBAN doğrulamalı transfer formu
- **Transfer Listesi**: Sayfalama ile tüm transferleri görüntüleme
- **Responsive Tasarım**: Mobil ve masaüstü uyumlu
- **Mock Data**: Backend olmadan çalışır

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

Uygulama http://localhost:3000 adresinde çalışacaktır.

## Production Build

```bash
npm run build
npm run start
```

## Teknolojiler

- **Next.js 14** - App Router
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI bileşenleri
- **Lucide React** - İkonlar

## Proje Yapısı

```
.
├── app/
│   ├── accounts/[iban]/    # Hesap detay sayfası
│   ├── transfer/           # Transfer formu
│   ├── transfers/          # Transfer listesi
│   ├── globals.css         # Global stiller
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Ana sayfa (hesaplar)
├── components/
│   ├── ui/                 # shadcn/ui bileşenleri
│   └── header.tsx          # Header component
├── lib/
│   ├── api.ts              # API client (mock)
│   ├── mock-data.ts        # Mock veriler
│   └── utils.ts            # Yardımcı fonksiyonlar
└── public/                 # Static dosyalar
```

## Özellikler

### 1. Hesap Listesi (/)
- Tüm hesapları listeler
- İsim veya IBAN ile arama
- Her hesap için:
  - Ad soyad
  - IBAN
  - Bakiye
  - Açılış tarihi
  - Para gönder butonu
  - Detay butonu

### 2. Hesap Detayı (/accounts/[iban])
- Hesap bilgileri
- Mevcut bakiye
- Son 20 işlem
- Gelen/giden transfer ayrımı
- Her işlem için:
  - Tutar
  - Karşı taraf bilgileri
  - Tarih

### 3. Para Transferi (/transfer)
- IBAN formatı kontrolü (TR + 24 rakam)
- Tutar doğrulama
- Aynı hesap kontrolü
- Bakiye kontrolü
- Başarı/hata mesajları
- Form validasyonu

### 4. Transfer Listesi (/transfers)
- Tüm transferleri listeler
- Sayfalama (20 kayıt/sayfa)
- Her transfer için:
  - Transfer ID
  - Gönderen/Alıcı bilgileri
  - Tutar
  - Tarih

## Mock Data

Uygulama 5 örnek hesap ve 10 örnek transfer ile başlar:

### Hesaplar
1. Ahmet Yılmaz - 15,750.50 TL
2. Ayşe Demir - 8,240.25 TL
3. Mehmet Öz - 25,600.00 TL
4. Fatma Kaya - 3,420.75 TL
5. Ali Çelik - 12,890.00 TL

Yeni transferler yapıldığında:
- Bakiyeler otomatik güncellenir
- Transfer listesine eklenir
- Hesap detaylarında görünür

## Tema ve Renkler

Alternatif Bank marka renkleri:
- **Primary**: #ad2460 (koyu pembe/bordo)
- **Background**: #ffffff (beyaz)
- Tüm butonlar, linkler ve vurgular primary renkte

## Validasyonlar

### IBAN
- Format: TR + 24 rakam
- Toplam 26 karakter
- Sadece büyük harf ve rakam

### Transfer Tutarı
- 0'dan büyük olmalı
- Maksimum 2 ondalık basamak
- Gönderen hesapta yeterli bakiye olmalı

### Diğer Kurallar
- Gönderen ve alıcı IBAN farklı olmalı
- Her iki hesap da sistemde kayıtlı olmalı

## Lisans

Bu proje demo amaçlıdır ve Alternatif Bank deneyimini taklit eder.
