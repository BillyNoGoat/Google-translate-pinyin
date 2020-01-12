## Chinese romanisation/segmented pinyin downloader
Currently google translate's API only supports translation and not
romanisation/pinyin.

Google translate's machine learning translation is good at determining where to
segment Chinese sentences in pinyin for phrases.

### Examples:
#### 这支铅笔非常漂亮
A standard pinyin converter might treat output the following:
*Zhè zhī qiān bǐ fēi cháng piāo liàng* (This pencil is extremely beautiful)

##### Tone problem
In the above output, each character was converted individually. This means, the
tone for **liàng** in **piāo liàng** *(漂亮)* was added incorrectly, as when
used in this phrase with **piāo**, **liàng** should have a neutral tone **(piāo
liang)**

##### Pinyin segmentation problem
It's often useful to understand the pinyin in relation to phrases.
Again in the above example, every character is separated into it's own pinyin.

So, **qiān bǐ (铅笔: pencil)** was separated into the character **qiān (铅:
lead)** and **bǐ (笔: pen)**.

This makes learning easier to understand that lead + pen = pencil.

##### Google
Google is able to solve both of these problems using their Google translate
machine learning solution. They are able to correctly identify tone changes in
phrases and segment the pinyin relating to the phrases.

Example output:
**Zhè zhī qiānbǐ fēicháng piàoliang** 

### App
The app runs using **puppeteer** to recursively scrape from google translate.

### Installation
`git clone https://github.com/BillyNoGoat/Google-translate-pinyin.git`

`cd Google-translate-pinyin`

`npm i` will install dependencies (puppeteer)

To run the app run `node app.js`

### Setup
Add objects in an array to `data.js`. The objects must contain an attribute
called "chinese" containing the string you wish to convert to pinyin.
**NOTE**: Only the "chinese" attribute is needed. Any other fields like
"translation" or anything you choose to add are optional and do nothing.

### Data
The input data will have a `pinyin` attribute added to the objects and will be
turned into a json file and output to the same directory named `out.json`. Each
iteration will also log the object to the console. Example output can be seen in
output-example.json