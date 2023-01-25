const express = require('express');
const multer = require('multer');
const sharp = require('sharp');

const app = express();
const upload = multer({ dest: 'uploads/' });
const PORT = process.env.PORT || 3000;
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('index.html');
});

app.post('/', upload.single('image'), async (req, res) => {
  const image = sharp(req.file.path);
  const compressedImage = await image.resize(800).toBuffer();

  res.set('Content-Type', 'image/jpeg');
  res.set('Content-Disposition', 'attachment; filename="compressed.jpg"');
  res.send(compressedImage);
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
