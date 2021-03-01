[![Express Logo](https://i.cloudup.com/zfY6lL7eFa-3000x3000.png)](http://expressjs.com/)

  Projeto desenvolvido em Node para realizar Upload de imagens com Multer.

```js
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename(request, file, callback) {
      const hash = crypto.randomBytes(6).toString('hex');
      const filename = `${hash}-${file.originalname}`;

      callback(null, filename);
    },
  }),
};
```

## Utilização do Projeto
  * git clone git@github.com:arochaa/api-rest-express-knex-yup.git
  * npm build
  * npm start

## Blibiotecas utilizadas

  * Express
  * Yup
  * Morgan
  * Multer
