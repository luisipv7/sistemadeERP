'use strict';
const _ = require('lodash');
const PDFDocument = require('pdfkit');
const fs = require('fs');
// const doc = new PDFDocument();
const tableify = require('tableify');
const ejs = require('ejs');
const pdf = require('html-pdf');
const path = require('path');
const {formatToDate} = require('brazilian-values');
const async = require('async');
const os = require('os');

module.exports = function(Produto) {
 /**
 * Exportar lista de Produtos para PDF
 * @param {object} exportarpdf exportarpdf
 * @param {Function(Error)} callback
 */

  Produto.exportarpdf =  function(exportarpdf, callback)  {
    // TODO

    async.waterfall(
      [
        next => {
          const filter = {
            fields: [
              'nomeProduto',
              'quantidade',
              'validadeProd',
              'nomeFornecedor',
            ],
          };
          Produto.find(filter, next);
        },
        (Res, next) => {
          const Response = _(Res)
            .map(Row => Row.toJSON())
            .map(Row => {
              return {
                NomeProduto: Row.nomeProduto,
                Quantidade: Row.quantidade,
                Validade: formatToDate(new Date(Row.validadeProd)),
                NomeFornecedor: Row.nomeFornecedor,
              };
            })
            .value();
          next(null, Response);
        },
        (Response, next) => {
          const ejsFilename = path.join(__dirname, '/../templates/rel001.ejs');
          const data = {
            title: 'Relação de Produtos',
            tabela: tableify(Response),
          };
          ejs.renderFile(ejsFilename, data, next);
        },
        (html, next) => {
          const options = {format: 'A4'};

          pdf
            .create(html, options)
            .toFile(path.join(os.tmpdir() + '/Teste.pdf'), next);
        },
      ],

      (err, {filename}) => {
        if (err) {
          callback(err);
        } else {
          exportarpdf.res.sendFile(filename);
        }
      }
    );
  };
};
