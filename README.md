## Usage

```js
var gulp = require('gulp');
var toc = require('gulp-markdown-toc');

gulp.task('toc', function() {
  return gulp.src('*.md')
    .pipe(toc())
    .pipe(gulp.dest('.'));
});
```

**Heads up!**

Add the following to markdown file where you want a Table of Contents to be injected:

```
<!-- toc -->
```

## Options

In addition to the following plugin options, all [markdown-toc][] options are supported as well. See that library for additional details.

### options.index

**Type:** `{Boolean|String|Function}`

**Default:** `undefined`

Generate a Table of Contents index file. _If `options.index` is left undefined, an index file will not be generated._

```js
// generates a file named `toc.md`
toc({index: true})

// specify the name of the index file
toc({index: 'foo.md'})

// customize the destination and file path of the index file
toc({
  index: function(file) {
    file.basename = 'whatever.md';
    return 'blah';
  }
})
```

### options.filterFiles

**Type:** `{Function}`

**Default:** `undefined`

Filter the files to be included in the TOC index. 

```js
toc({
  filter: function(file) {
    return file.relative !== 'foo.md';
  }
})
```

### options.sortFiles

**Type:** `{Function}`

**Default:** `undefined`

Pass a compare function for sorting the files to be included in the TOC index. 

```js
toc({
  sort: function(fileA, fileB) {
    // fileA and fileB are vinyl files
    return fileA.relative < fileB.relative;
  }
})
```

### options.headingName

```
## [headingName](#headingLink)
```

**Type:** `{Function}`

**Default:** `undefined`

Customize heading names.

```js
toc({
  headingName: function(name) {
    // do stuff to name
    return name;
  }
})
```

### options.headingLink

```
## [headingName](#headingLink)
```

**Type:** `{Function}`

**Default:** `undefined`

Customize heading links.

```js
toc({
  headingLink: function(link) {
    // do stuff to link
    return link;
  }
})
```

[markdown-toc]: https://github.com/jonschlinkert/markdown-toc