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
	var state = {};
 	var $container = document.querySelector('#container');
 	var $archiveList = function() {
 		return document.querySelector('#archive-list');
 	}
 	var archiveTemplate = '<h2>Archive</h2><ul id="archive-list"></ul>';
 	var $newThing = document.getElementById('new-thing');
 	var $myList = document.getElementById('my-list')

 	console.log($archiveList())
 	delegate('#container', 'click', 'li.list-thing', function(event){
 		console.log(event.target.textContent);
 		event.target.remove();
 		if ( !$archiveList() ) {
 			$container.innerHTML += archiveTemplate;
 		};
 		$archiveList().innerHTML += `<li class="archive-thing">${event.target.textContent}</li>`

 	});



 	document.getElementById('new-thing-button').addEventListener('click', function(event){
 		event.preventDefault();
 		render($newThing.value, $myList)
 	});



 	function render(data, into) {
 		event.preventDefault();
		into.innerHTML += `<li class="list-thing">${data}</li>`;
 		
 		$newThing.value = '';
 	}


})()
