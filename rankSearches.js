/*  
  - A Youtube "MyActivity.html" file from https://takeout.google.com/settings/takeout is required.
  - Place the MyActivity file in the directory that this file, index.html and wordsToIgnore.js are in.
  - You'll need to start a local web server from this directory. One option here: https://www.npmjs.com/package/http-server.
  - Open the browser console and navigate to localhost. Wait up to a few minutes for results if the MyHistory file is large.
*/

var rank = function(){

  var list_from_file = document.querySelector("#data-element > div");

  if(list_from_file == null){
    console.log("No file found, exiting.");
    return;
  }

  // Number of most recent events to scan for searches.
  var len = list_from_file.childElementCount;

  var searches_with_dates = [];

  var selected_data;
  var search_and_date;

  for(var i = 1; i < len + 1; i++){
    console.log("Running...("+i+"/"+len+")");
    selected_data = list_from_file.querySelector("div:nth-child("+i+") > div > div:nth-child(2)");
    if((selected_data.innerHTML.indexOf("Searched") != -1) && !(selected_data.querySelector("a") == null)){
      search_and_date = [selected_data.querySelector("a").innerHTML, Date.parse(selected_data.innerHTML.match("(?<=<br>).*")[0])];
      console.log("Match!");
      searches_with_dates.push(search_and_date);
    }
  };

  var flattened_words_with_dates = []; 

  for(var i = 0; i < searches_with_dates.length; i++){
      var words_in_search = searches_with_dates[i][0].split(/(?:,| )+/);  // regex from https://stackoverflow.com/a/650031
      var search_time_ms = searches_with_dates[i][1];

      for(var j = 0; j < words_in_search.length; j++){
        flattened_words_with_dates.push([words_in_search[j], search_time_ms]);
      }
  };

  var unique_words = [];
  var frequencies = {};
  var dates = {};

  var ignored_word_count = 0;

  for(var i = 0; i < flattened_words_with_dates.length; i++){
    var active_word = flattened_words_with_dates[i][0];
    var active_date = flattened_words_with_dates[i][1];

    if(!(words_to_ignore.includes(active_word))){   // words_to_ignore defined in external file
      if(!(unique_words.includes(active_word))){
        // Word has not appeared yet
        unique_words.push(active_word);
        frequencies[active_word] = 1;
        dates[active_word] = [active_date];
      }else{
        // Word has appeared before
        frequencies[active_word]++;
        dates[active_word].push(active_date);
      }
    }else{
      ignored_word_count++;
    }
  };

  console.log("Found "+searches_with_dates.length+" searches in "+len+" events.");
  console.log("Unique words: "+unique_words.length+"\nTotal words: "+flattened_words_with_dates.length+"\nIgnored words: "+ignored_word_count);

  var words_arr = [];

  for(var key in frequencies){
    words_arr.push([key, frequencies[key], dates[key]]);
  };

  // Sort words by frequency value
  var sorted_words = words_arr.sort(function(a, b){return b[1]-a[1]; }); // https://gist.github.com/umidjons/9614157

  console.log(sorted_words);

};

