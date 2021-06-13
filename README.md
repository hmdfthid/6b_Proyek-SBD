# Libra

## Kelompok 6b

Ahmad Fatih (1906355743)\
Akbar Abdirahman (1906381672)\
Fathan Malik Febriansyah (1906381634)\
Yusuf Agung Nugroho (1906381685)

## Persyaratan

- pastikan bahwa server memiliki username bernama "postgres", dengan password "password"
- pastikan server sudah memiliki database bernama "libra"

### Cara menjalankan libra:

1. buka command prompt
2. buka direktori folder `\PostgreSQL\bin` pada command prompt untuk import sql
3. jalankan command: `psql -u postgres libra < direktori file/libra.sql`
4. buka command prompt baru
5. buka direktori folder backend pada command prompt
6. jalankan command: `npm install` atau `yarn install`
7. jalankan command: `node app.js`
8. tunggu hingga muncul tampilan "Rest API listening at http://localhost:3000". command prompt jangan diclose!
9. buka command prompt baru
10. buka direktori folder frontend pada command prompt
11. jalankan command: `npm install` atau `yarn install`
12. jalankan command: `npm start` atau `yarn start`
13. tunggu hingga dedicated server selesai dan command prompt jangan diclose!
14. buka http://localhost:3000 di browser dan nikmati!