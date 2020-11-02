# LaporBOI

Platform penghubung tiket dengan Telegram berbasis [Next.JS](https://nextjs.org).


## Menjalankan LaporBOI

### Langkah pertama - membuat bot telegram

- LaporBOI membutuhkan kredensial Bot Telegram supaya dapat bekerja.
Jika belum punya bot telegram, buatlah dengan bantuan https://t.me/BotFather,
lalu catat Bot Token nya.

- Buatlah grup atau channel telegram,
- Undang bot yang tadi sudah dibuat ke dalam grup/channel
- Berikan akses bot sebagai admin

### Langkah kedua - mendapatkan group_id / channel_id 
GroupID / ChannelID Telegram diperlukan untuk mengirimkan notifikasi laporan tiket.  
- undanglah bot bernama Telegram Bot Raw (@RawDataBot) ke dalam channel/grup
- setelah ditambahkan, RawDataBot akan menampilkan data grup anda seperti ini kira-kira (lihatlah chat id).
```
...
"chat": {
    "id": -123456789, <------ salin -123456789 ke GROUP_ID pada berkas .env
    "title": "grupku",
    "type": "group",
    "all_members_are_administrators": false
},
...
```
- 

### Langkah tiga - menjalankan di atas docker**  
Prasyarat:  
- terpasang docker
- terpasang docker-compose

1. Salin berkas `.env.sample` ke `.env`, dan sesuaikan isinya
2. `docker-compose -f docker-compose.yml build`
2. `docker-compose -f docker-compose.yml up -d`
3. aplikasi berjalan di port 3000, anda bisa cek di http://localhost:3000


## Mengembangkan LaporBOI
prasyarat:
- nodejs 11
- yarn, pasang dengan cara `npm install -g yarn`


1. Salin berkas `.env.sample` ke `.env`, dan sesuaikan isinya
2. jalankan perintah `yarn dev`
3. lakukan perubahan kode, otomatis reload
4. aplikasi dev berjalan di port 3000, anda bisa cek di http://localhost:3000


## Fitur
- [x] Kirim ke telegram
- [x] Kirim attachment ke telegram
- [ ] Bikin tiket otomatis ke github
