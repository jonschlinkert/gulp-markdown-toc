'use strict';

require('mocha');
var fs = require('fs');
var path = require('path');
var File = require('vinyl');
var assert = require('assert');
var toc = require('..');

describe('gulp-markdown-toc', function() {
  it('should add a toc property to files', function(cb) {
    var stream = toc();
    var files = [];

    stream.write(new File({
      base: __dirname,
      path: __dirname + '/foo.md',
      contents: new Buffer('# Foo\n<!-- toc -->')
    }));

    stream.on('data', function(file) {
      files.push(file);
    });

    stream.on('end', function() {
      assert(files[0].hasOwnProperty('toc'));
      assert.equal(typeof files[0].toc, 'object');
      cb();
    });

    stream.end();
  });

  it('should generate a toc in files with a <!-- toc --> marker', function(cb) {
    var stream = toc();
    var files = [];

    stream.write(new File({
      base: __dirname,
      path: __dirname + '/foo.md',
      contents: new Buffer('# Foo\n<!-- toc -->\n## Bar\ncontents')
    }));

    stream.on('data', function(file) {
      files.push(file);
    });

    stream.on('end', function() {
      assert(/<!-- tocstop -->/.test(files[0].contents.toString()));
      cb();
    });

    stream.end();
  });

  it('should generate a toc index', function(cb) {
    var stream = toc({index: true});
    var files = [];

    stream.write(new File({
      base: __dirname,
      path: __dirname + '/foo.md',
      contents: new Buffer('# Foo\n<!-- toc -->\n## One\ncontents\n## Two\ncontents')
    }));

    stream.write(new File({
      base: __dirname,
      path: __dirname + '/bar.md',
      contents: new Buffer('# Bar\n<!-- toc -->\n## One\ncontents\n## Two\ncontents')
    }));

    stream.on('data', function(file) {
      files.push(file);
    });

    stream.on('end', function() {
      assert.equal(files.length, 3);
      assert.equal(files[files.length -1].path, 'toc.md');
      cb();
    });

    stream.end();
  });

  it('should generate a toc index with custom name', function(cb) {
    var stream = toc({index: 'custom.md'});
    var files = [];

    stream.write(new File({
      base: __dirname,
      path: __dirname + '/foo.md',
      contents: new Buffer('# Foo\n<!-- toc -->\n## One\ncontents\n## Two\ncontents')
    }));

    stream.write(new File({
      base: __dirname,
      path: __dirname + '/bar.md',
      contents: new Buffer('# Bar\n<!-- toc -->\n## One\ncontents\n## Two\ncontents')
    }));

    stream.on('data', function(file) {
      files.push(file);
    });

    stream.on('end', function() {
      assert.equal(files.length, 3);
      assert.equal(files[files.length -1].path, 'custom.md');
      cb();
    });

    stream.end();
  });

  it('should filter files from toc', function(cb) {
    var stream = toc({
      index: true,
      filterFiles: function(file) {
        return file.basename !== 'bar.md';
      }
    });
    var files = [];

    stream.write(new File({
      base: __dirname,
      path: __dirname + '/foo.md',
      contents: new Buffer('# Foo\n<!-- toc -->\n## One\ncontents\n## Two\ncontents')
    }));

    stream.write(new File({
      base: __dirname,
      path: __dirname + '/bar.md',
      contents: new Buffer('# Bar\n<!-- toc -->\n## One\ncontents\n## Two\ncontents')
    }));

    stream.on('data', function(file) {
      files.push(file);
    });

    stream.on('end', function() {
      assert(!/bar\.md/.test(files[files.length - 1].contents.toString()));
      cb();
    });

    stream.end();
  });
});
