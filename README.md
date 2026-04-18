# Parkee QA Technical Test

Project ini berisi otomasi pengujian UI (SauceDemo) dan API (One Piece API) menggunakan Cypress.

## Persiapan & Instalasi

### 1. Prasyarat
Pastikan kamu sudah menginstall **Node.js** di laptopmu. Jika belum, download di [nodejs.org](https://nodejs.org/).

### 2. Instalasi Library
Buka terminal di folder project ini, lalu jalankan perintah berikut untuk menginstall Cypress, Mocha, Rimraf, dan library pendukung lainnya sekaligus:
```bash
npm install
```
Ada dua cara untuk menjalankan automation ini

1. Mode Visual (Cypress Runner): 
``` bash
npx cypress open
```
2. Mode Headless & Generate Report (Rekomendasi):
``` bash
npm test
```

