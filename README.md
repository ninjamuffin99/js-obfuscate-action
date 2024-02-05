# JS-Obfuscate-Action

This action will take an input javascript file, and spit out an obfuscated one, using [javascript-obfuscator](https://github.com/javascript-obfuscator/javascript-obfuscator)


### Quick and dirty how-to

``` yml
- uses: ninjamuffin99/js-obfuscate-action@v1
  with:
    path:
        "path/to/file"
    outputPath:
        "path/to/output" # defaults to `path`, overwriting the input file
    obfuscationPreset:
        "default" # defaults to `default`, options are `low-obfuscation`, `medium-obfuscation`, and `high-obfuscation`
```