/my-project
│
├── /public                          # Statički fajlovi dostupni direktno (slike, favicon, snimci)
│   ├── /uploads                     # Uploadovani videi sa watermark-om
│   └── /gallery                     # Slike galerije za homepage
│
├── /src
│   ├── /pages                       # Next.js stranice + API rute
│   │   ├── /api                    # Backend logika (admin + user + sobe + upload + home)
│   │   │   ├── /admin
│   │   │   │   ├── login.ts        # Admin login (JWT)
│   │   │   │   ├── logout.ts       # Admin logout
│   │   │   │   ├── rooms.ts        # GET, POST sobe (lista, kreiranje)
│   │   │   │   ├── rooms
│   │   │   │   │   └── [id].ts     # PUT, DELETE sobe
│   │   │   │   ├── home.ts         # GET i PUT home sadržaja
│   │   │   │
│   │   │   ├── /user
│   │   │   │   └── login.ts        # User login za sobe
│   │   │   │
│   │   │   ├── /upload
│   │   │   │   └── [roomId].ts     # Upload videa za konkretnu sobu
│   │   │   │
│   │   │   ├── /rooms
│   │   │   │   └── [roomId]
│   │   │   │       └── videos.ts   # GET svi video fajlovi za sobu
│   │
│   │   ├── /admin                   # Frontend deo admin panela (samo preko admin subdomena)
│   │   │   ├── login.tsx           # Admin login forma
│   │   │   ├── dashboard.tsx       # Glavna admin stranica
│   │   │   ├── rooms.tsx           # Lista i uređivanje soba
│   │   │   └── home-edit.tsx       # Uređivanje homepage sadržaja
│   │   │
│   │   ├── /room                    # Soba korisnika (dinamička ruta)
│   │   │   └── [code].tsx          # Prikaz poruka/snimaka za sobu
│   │   │
│   │   └── index.tsx               # Javna home stranica (fetchuje sadržaj preko API-ja)
│
│   ├── /components                 # Reusable React komponente
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── VideoPlayer.tsx
│   │   ├── QRCodeDisplay.tsx
│   │   ├── ContactForm.tsx
│   │   └── LightboxGallery.tsx
│
│   ├── /lib                        # Logika, helperi
│   │   ├── watermark.ts            # FFmpeg watermarking logika
│   │   ├── apiClient.ts            # Axios instance
│   │   ├── auth.ts                 # JWT token verify/generate
│   │   └── cronJobs.ts             # Automatizacija (brisanje starih videa itd.)
│
│   ├── /hooks                      # Custom React hook-ovi (useAuth, useRooms, itd.)
│   ├── /context                    # React context (npr. AuthContext)
│   ├── /styles                     # Tailwind config, globalni CSS/SCSS fajlovi
│   └── /utils                      # Validacija, obrada datuma, generalni utili
│
├── /prisma
│   ├── schema.prisma               # Prisma šema (tabele: User, Room, Video, HomeContent...)
│   └── /migrations                 # Prisma migracije baze
│
├── .env                            # Env varijable (JWT_SECRET, DB_URL, S3 ključevi, itd.)
├── middleware.ts                   # Subdomen preusmeravanje (admin vs korisnički deo)
├── next.config.js                  # Next.js konfiguracija
├── package.json
├── tsconfig.json
└── README.md

