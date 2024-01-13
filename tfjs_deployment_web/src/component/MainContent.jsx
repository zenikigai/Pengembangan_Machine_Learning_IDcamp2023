import { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import Logo from "../assets/logo.jpg";
import TensorFlowLogo from "../assets/tensorflow_logo.png";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function MainContent() {
   // --- Kolom deklarasi state/variable ---
   const [isModelLoaded, setIsModelLoaded] = useState(false);
   const [model, setModel] = useState(null);
   const [word2index, setWord2Index] = useState(null);
   const [inputText, setInputText] = useState('');
   const maxlen = 20;
   // --------------------------------------
 
   // --- Kolom init funtion ---
   useEffect(() => {
     async function init() {
       try {
         // Memanggil model tfjs
         const loadedModel = await tf.loadLayersModel("../tfjs_model/model.json");
         setModel(loadedModel);
         setIsModelLoaded(true);
         console.log(loadedModel.summary());
 
         const loadedWord2Index = await loadWord2Index();
         setWord2Index(loadedWord2Index);
       } catch (error) {
         console.error('Error loading model:', error);
       }
     }
 
     init();
   }, []); 
   // --------------------------
 
   //Memanggil word_index
   const loadWord2Index = async () => {
     try {
       const response = await fetch("../metadata/word_index.json");
       if (!response.ok) {
         throw new Error('Failed to fetch word2index data');
       }
 
       const word2indexData = await response.json();
       return word2indexData;
     } catch (error) {
       console.error('Error loading word2index data:', error);
       return {};
     }
   };
 
   const handleInputChange = (event) => {
     setInputText(event.target.value);
   };
 
   // ---------------------------
 
 // ----Kolom fungsi `onClick()`-----
 // Fungsi yang dijalankan ketika tombol "Post Review" diclick
   const onClick = () => {
     if (!isModelLoaded) {
       toast.error('Model not loaded yet');
       return;
     }
 
     if (inputText.trim() === '') {
       toast.error("Review Can't be Null");
       document.getElementById('input').focus();
       return;
     }
 
     // Score prediksi dengan nilai 0 s/d 1
     const inputWords = getInput().trim().toLowerCase().split(' ');
     const score = predict(inputWords);
 
     // Kondisi penentuan hasil prediksi berdasarkan nilai score
     if (score > 0.5) {
       toast.success(`Thank you for your review \n${score}`);
     } else {
       toast.error(`Negative Review \n${score}`);
     }
   };
 
 
   // ----Kolom fungsi `getInput()`-----
   const getInput = () => {
     return inputText;
   };
 
 
   // ----Kolom fungsi `predict()`-----
   const predict = (inputText) => {
     
     // Mengubah input review ke dalam bentuk token
     const sequence = inputText.map((word) => {
       let indexed = word2index[word];
   
       if (indexed === undefined) {
         return 1; 
       }
       return indexed;
     });
   
     
     // Melakukan padding
     const paddedSequence = padSequence([sequence], maxlen);
     
     const score = tf.tidy(() => {
       const input = tf.tensor2d(paddedSequence, [1, maxlen]);
       const result = model.predict(input);
       return result.dataSync()[0];
     });
     return score;
   };
 
 
   // ----Kolom fungsi `padSequence()`-----
   const padSequence = (sequences, maxLen, padding = 'post', truncating = 'post', pad_value = 0) => {
     return sequences.map((seq) => {
       if (seq.length > maxLen) {
         if (truncating === 'pre') {
           seq.splice(0, seq.length - maxLen);
         } else {
           seq.splice(maxLen, seq.length - maxLen);
         }
       }
 
       if (seq.length < maxLen) {
         const pad = new Array(maxLen - seq.length).fill(pad_value);
         if (padding === 'pre') {
           seq = pad.concat(seq);
         } else {
           seq = seq.concat(pad);
         }
       }
       return seq;
     });
   };
 
   return (
     <div>
       <div className="header">
         <img src={Logo} alt="Logo" />
       </div>
 
       <div className="main">
         <div className="container">
           <img src={TensorFlowLogo} alt="TensorFlow Logo" />
           <h1>Tensorflow.js</h1>
           <h2>Sentiment Analysis Demo</h2>
 
           <h3>
             <p>
               This example demonstrated loading a pre-trained model and using it in the browser.
               This model is trained to predict the sentiment of a short restaurant review (as a score
               between 0 and 1). The training is done server-side using Python and then converted into
               a TensorFlow.js model.
             </p>
             <p>
               The model is trained using YELP reviews that have been truncated to a maximum of 20
               words, only the 2000 most used words in the reviews are used. You can experiment with
               the model on this page
             </p>
           </h3>
         </div>
       </div>
 
       <div className="container">
         <div className="demo">
           <h1>Thank you for your visit!</h1>
           <h2>
             We are committed to providing our customers with a fantastic experience, and your
             feedback helps us make that possible.
           </h2>
           <br />
           <br />
           {isModelLoaded ? (
             
             <div id="mainAPP">
               <label htmlFor="input">How was your dinner? </label>
               <br />
               <br />
               <input
                 placeholder="Try: 'The salad is fresh and delicious'"
                 id="input"
                 value={inputText}
                 onChange={handleInputChange}
               />
               <button className="button" style={{ verticalAlign: 'middle' }} onClick={onClick}>
                 <span>Post Review</span>
               </button>
               <p></p>
             </div>
           ) : (
             
             <div id="loaderlabel">
               <h2>Loading Model...</h2>
             </div>
           )}
         </div>
       </div>
       <ToastContainer
         position="top-center"
         autoClose={1000}
         hideProgressBar
         newestOnTop={false}
         closeOnClick
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
         toastStyle={{
           width: '700px', 
           height: "700px",
           textAlign: 'center',
           borderRadius: '8px', 
         }}
       />
     </div>
   );
 }
 