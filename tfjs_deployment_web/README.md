# Latihan: Deploy Model ML Menggunakan TensorFlow.js

Pada sub-modul ini, kita akan belajar menjalankan model yang telah kita buat untuk melakukan tugas prediksi dalam lingkup pemrosesan bahasa alami (Natural Language Processing). Tugas prediksi tersebut akan dijalankan pada Web Browser menggunakan TensorFlow.js. Adapun pengetahuan tambahan tentang HTML, CSS, JavaScript, dan Chrome Dev Tools dapat membantu Anda memahami sub-modul ini dengan baik.
Namun pada proyek ini saya menggunakan ReactJS, hasil fork dari projek aslinya [disini](https://github.com/dicodingacademy/a185-pengembangan-ml/tree/main/sample_project_tfjs)

Berikut beberapa hal yang akan kita pelajari:

Memuat dan menjalankan model pada Web Browser dengan TensorFlow.js API. \
Menguji hasil deployment dengan membuat prediksi dari input yang diberikan.

Pada latihan ini, kita akan membuat laman web yang dapat memprediksi sentimen dari sebuah reviu restoran. Model yang digunakan akan dilatih menggunakan dataset [Yelp](https://www.kaggle.com/datasets/marklvl/sentiment-labelled-sentences-data-set) untuk review retoran. 

# Penjelasan Proyek
Tujuan dari proyek ini adalah membuat sebuah model yang dapat memprediksi apakah sebuah restoran mendapatkan reviu positif atau negatif. Model ini nantinya akan dimuat dan dijalankan pada Web Browser dengan menggunakan [TensorFlow.js API](https://www.tensorflow.org/js). 

# Penjelasan File
`notebook.ipynb` merupakan berkas notebook yang dapat dijalankan melalui Google Colaboratory. Notebook ini berisi tahapan dalam membuat, mengevaluasi, dan mengonversi model. 

`yelp_labelled.txt` merupakan dataset untuk melatih model. 

`model.h5` merupakan sebuah HDF5 model yang akan dikonversi menjadi `model.json`. 

"tfjs_model" merupakan sebuah folder yang berisi `model.json` dan bobot dalam berbentuk binary file. Kedua file tersebut digunakan untuk menerapkan model NLP ke dalam web browser. 

`word_index.json` merupakan sebuah metadata dalam bentuk file json yang berisi pasangan kata dan indeks. Dengan memanfaatkan berkas ini, kita dapat mengubah inputan reviu menjadi sebuah token. 

`index.html` merupakan berkas html sebagai tampilan utama web. 

`script.js` merupakan berkas JavaScript yang berisi perintah untuk men-deploy model yang telah dibuat ke dalam web. 

`images` berisi beberapa gambar seperti plot evaluasi model yang telah dibuat dan tampilan awal web.

`styles` berisi `style.css` dan beberapa gambar untuk memperindah tampilan web. 


# Tech Stack
[Vite](https://vitejs.dev/)
\
[React](https://react.dev/)
\
[Npm](https://www.npmjs.com/)
\
[TensorflowJs](https://www.tensorflow.org/js)


## Installation
clone projek ini, buka di VSCode atau editor favorit anda, lalu ketikkan

```bash
npm i
```
pada terminal anda. Lalu jika semua sudah selesai terinstal jalankan

```bash
npm run dev
```

## Copyright

[Dicoding Indonesia](https://www.dicoding.com/)
