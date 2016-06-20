/* DOM Manipulation: Independent Practice

To complete this excercise, you must meet the following requirements:

- When the user clicks the "#new-thing-button" button, add whatever is in the input box to the "#my-list" list.
- Only add an item if the input box is not blank.
- Clear the input box when the user clicks the button.

Your code must use these features:

- Event delegation (Utilities: http://bit.ly/js1-utilities )
- Separate State from DOM
- Use a View Template

Here are some bonus tasks to push your DOM knowledge!
- Bonus tasks:
  - When a list item is archived, change its background colour to "green"
  - Add a link to each item to delete it completely
  - Instead of deleting it completely, move it to a second list called "Archive"

*/
// delegate function from remote file
function siblings(selector) {
  var element = document.querySelector(selector)
  var childElements = Array.from(element.parentNode.children)
  return childElements.filter(function(child) {
    return child !== element
  })
}

function closest(element, query) {
  while (element !== document) {
    if (element.matches(query)) {
      return element
    }
    element = element.parentNode
  }
  return null
}

function delegate(selector, eventName, targetSelector, listener) {
  document.querySelector(selector).addEventListener(eventName, function (event) {
    var closestMatch = closest(event.target, targetSelector)
    if (closestMatch) {
      event.delegateTarget = closestMatch
      listener(event)
    }
  })
}



(function() {

 	var container = document.querySelector('#container');
 	var state = {};

 	var archiveTemplate = '<h2>Archive</h2><ul id="archive-list"></ul>'

 	var listTemplate = function(param){
 		return '<li class="list-thing">' + param + '</li>'
 	}





 	delegate('#my-list', 'click', 'li', function(event){
 		console.log(event.target.textContent);
 		event.target.remove();
 		

 		if ( !document.querySelector('#archive-list') ) {
 			document.querySelector('#container').innerHTML += archiveTemplate;
 		};

 		document.getElementById('archive-list').innerHTML+=listTemplate(event.target.textContent);

 
 	});






 	document.getElementById('new-thing-button').addEventListener('click', function(event){
 		event.preventDefault();
 		var newText = document.getElementById('new-thing').value;

 		if(newText.length >0){
 			document.getElementById('my-list').innerHTML += listTemplate(newText);
 		}

 		document.getElementById('new-thing').value = '';
 	});


 	







 	function render(data, into) {
 	}


})()
