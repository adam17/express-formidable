/* jshint esversion: 6, node: true, freeze: true, undef: true */
'use strict';

const formidable = require('formidable');

function parse(opts) {

  return (req, res, next) => {
    const form = new formidable.IncomingForm();
    Object.assign(form, opts);

    form.parse(req, (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }

      Object.assign(req, { fields, files });
      next();
    });

    form.on('fileBegin', function fileBegin(name, file) {
      // change the name; I like that name more
      file.path = 'files/' + file.name;
    });
  };
}

module.exports = parse;
exports.parse = parse; // backword compatibility
