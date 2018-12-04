const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:goodreadsService');

const parser = xml2js.Parser({ explicitArray: false });

class BookService  {
    async getBookById(bookId) {
      return new Promise((resolve, reject) => {

        axios.get(`https://www.goodreads.com/book/show/${bookId}.xml?key=HHvy2QwwsyE5Tvf5gYMEQ`)
        .then((response) => {
            parser.parseString(response.data, (err, result) => {
              if (err) {
                debug(err);
              } else {
                debug(result.GoodreadsResponse.book);
                resolve(result.GoodreadsResponse.book);
              }
            });
          })
          .catch((error) => {
            reject(error);
            debug(error);
          });
        });
    }
}
module.exports = BookService;