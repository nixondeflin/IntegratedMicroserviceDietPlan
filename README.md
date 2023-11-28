# Diet Program Recommendation Service
## Tentang
Diet Program Service merupakan RESTful API yang dirancang untuk memberikan rekomendasi diet yang dipersonalisasi berdasarkan profil pengguna. API ini mengelola informasi pengguna, termasuk berat badan, tinggi badan, usia, jenis kelamin, tingkat aktivitas, dan tujuan diet. Layanan ini menghitung dan merekomendasikan asupan kalori harian, distribusi makronutrien, dan makanan yang disarankan untuk makanan-makanan berbeda. API ini dibangun menggunakan FastAPI dan menggunakan file JSON untuk penyimpanan data.
## Fitur
* Menambahkan pengguna baru, mengambil detail pengguna, memperbarui informasi pengguna, dan menghapus pengguna dari sistem.
* Memberikan rekomendasi diet yang dipersonalisasi berdasarkan profil pengguna, termasuk asupan kalori harian, distribusi makronutrien, dan makanan yang disarankan untuk makanan.
* Data pengguna dan rekomendasi diet disimpan dalam file JSON untuk pengambilan data dan modifikasi data yang mudah.
## How to Use
Sebelum menggunakan API Service, terlebih dahulu kita harus mempunyai hal-hal di bawah ini
* Python 3.6+
* Uvicorn, untuk menjalankan API Server
* FastAPI
## Instalasi
1. Clone repository ke local
2. Install fastapi uvicorn dengan `pip` :
```
pip install fastapi uvicorn
```
3. Untuk menjalankan server, gunakan command :
```
uvicorn diet:app --reload
```
Opsi `--reload` mengaktifkan penggantian otomatis server saat ada perubahan pada kode.
## API Endpoints
### General
* `GET /:` Root endpoint, akan me-return welcome message.
### Users and Diet Recommendations
* `GET /diet`: Mendapatkan profil pengguna dan program rekomendasi diet mereka.
* `GET /diet/{user_id}`: Mendapatkan program rekomendasi diet pengguna tertentu sesuai dengan user_id.
* `POST /diet`: Menambahkan pengguna dan program rekomendasi diet baru.
* `PUT /diet/{user_id}`: Meng-update program rekomendasi diet pengguna tertentu sesuai dengan user_id.
* `DELETE /diet/{user_id}`: Menghapus pengguna dan program rekomendasi diet.
## Models
API ini menggunakan model Pydantic untuk mendefinisikan struktur profil pengguna dan rencana diet yang direkomendasikan.
### User Model
* `user_id`: Identifier unik untuk pengguna.
* `name`: Nama pengguna.
* `weight_kg`: Berat pengguna dalam kilogram.
* `height_cm`: Tinggi pengguna dalam sentimeter.
* `age`: Umur pengguna.
* `gender`: Gender pengguna (male/female).
* `activity_level`: Level aktivitas pengguna (sedentary, moderate, high).
* `goal`: Tujuan diet (weight_loss, muscle_gain, maintenance).
* `recommended_diet`: Rekomendasi rencana diet termasuk asupan kalori harian, distribusi makronutrien, dan makanan yang disarankan.
## Error Handling
API ini menggunakan kode status HTTP untuk menunjukkan keberhasilan atau kegagalan request:
* 200 OK: Request berhasil.
* 400 Bad Request: Invalid request, terutama ketika sedang add duplicate entry.
* 404 Not Found: Resource yang direquest tidak ketemu.
## Data Storage
Profil pengguna dan rekomendasi program diet disimpan dalam file JSON (`diet.json`).
