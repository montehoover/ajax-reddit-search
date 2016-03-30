// Set up the page when it loads.
$(function() {
  // attach the form submission to the search function
  $("#search-form").on('submit', search);
});

function search(event) {
  event.preventDefault();
  clearSearchResults(); // Clear previous search results.

  var userQuery = $(this).children('#query').val()
  console.log("searching for:", userQuery);
  $.get('https://www.reddit.com/search.json', {
    q: userQuery
  }).done(displayResults);
}

function displayResults(response) {
  var results = response.data.children;
  results.forEach(addSearchResult);
}

function clearSearchResults() {
  $("#results").html("");
}

// Adds a single result object to the page.
function addSearchResult(result) {
  // Create a list item to contain the search result link
  var li = document.createElement("li");

  // create an anchor tag
  var link = document.createElement("a");
  link.href = result.data.url; // reset the value of the the href
  link.textContent = result.data.title; // set the value of the text in the link

  // put the link inside the list item.
  $(li).append(link);

  // add the list item to the list of search results
  $("#results").append(li);
}
