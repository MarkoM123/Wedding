/my-project
│
├── /public                      # Statički fajlovi (slike, favicon, uploadovani videi)
│   └── /uploads                 # Uploadovani video fajlovi sa watermark-om
│
├── /src                         # Svi izvorišni fajlovi (frontend + backend)
│   ├── /pages                   # Next.js stranice i API rute
│   │    ├── /api                # API rute backend logike
│   │    │    ├── /admin         # Admin API rute (login, logout, sobe, home content)
│   │    │    │     ├── login.ts
│   │    │    │     ├── logout.ts
│   │    │    │     ├── rooms.ts       # GET, POST za sobe
│   │    │    │     ├── rooms        # Dinamičke rute za PUT, DELETE sobe
│   │    │    │     │    └── [id].ts
│   │    │    │     ├── home.ts        # GET i PUT za home stranicu
│   │    │    │
│   │    │    ├── /user           # User API rute (login sobe)
│   │    │    │     └── login.ts
│   │    │    │
│   │    │    ├── /upload         # Upload ruta (upload videa vezanog za sobu)
│   │    │    │    └── [roomId].ts
│   │    │    │
│   │    │    ├── /rooms          # Dodatne sobe API rute, npr. za dobijanje videa
│   │    │    │    └── [roomId]
│   │    │    │          └── videos.ts
│   │    │
│   │    ├── /admin              # Admin frontend stranice
│   │    │    ├── login.tsx
│   │    │    ├── dashboard.tsx
│   │    │    ├── rooms.tsx          # CRUD soba + upload snimaka
│   │    │    └── home-edit.tsx      # Uređivanje home stranice (tekst, slike, galerija)
│   │    │
│   │    ├── /room               # Korisnička soba
│   │    │    └── [code].tsx       # Prikaz šifre, videa, QR koda
│   │    │
│   │    └── index.tsx            # Home page
│   │
│   ├── /components              # Reusable React komponente
│   │    ├── Navbar.tsx
│   │    ├── Footer.tsx
│   │    ├── VideoPlayer.tsx
│   │    ├── QRCodeDisplay.tsx
│   │    ├── ContactForm.tsx
│   │    └── LightboxGallery.tsx
│   │
│   ├── /lib                     # Helper funkcije, servisi, ffmpeg watermarking
│   │    ├── watermark.ts
│   │    ├── apiClient.ts
│   │    ├── auth.ts
│   │    └── cronJobs.ts          # Npr. za brisanje starih videa
│   │
│   ├── /hooks                   # Custom React hooks (useAuth, useRooms, itd.)
│   ├── /context                 # React context provideri (AuthContext)
│   ├── /styles                  # Tailwind CSS konfiguracija, globalni stilovi
│   └── /utils                   # Utility funkcije (validacije, date format)
│
├── /prisma                     # Prisma schema i migracije
│    ├── schema.prisma
│    └── migrations/
│
├── .env                        # Environment varijable (DB, email, tajni ključevi)
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
