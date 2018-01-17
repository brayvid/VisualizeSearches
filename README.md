# rank-youtube-search-words
- Generates an array where each element is [unique_word, frequency, [timestamps]], sorted by decreasing frequency.
- Only searched words are counted, not video titles. Common words are ignored.
- JQuery 1.12.4 is used via CDN.
- The process could take several minutes depending on the size of the MyActivity file.
- JQuery, p5.js and p5.dom.js are used via CDN.

## Instructions
- The required "MyActivity.html" file is available at https://takeout.google.com/settings/takeout by selecting My Activity > Select specific activity data > Youtube, and following the prompts.
- Place the MyActivity file in the directory that this file, index.html and wordsToIgnore.js are in.
- Start a local web server from this directory. One option here: https://www.npmjs.com/package/http-server.
- Open the browser console, navigate to localhost, and wait a few minutes.
