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

// not in use for this demo
function siblings(selector) {
	var element = document.querySelector(selector)
	var childElements = Array.from(element.parentNode.children)
	return childElements.filter(function(child) {
		return child !== element
	})
}

/* --------------------- */


// element = DOM element interacted with
// query = DOM element we're looking for
function closest(element, query) {
	while (element !== document) {
		if (element.matches(query)) {
			return element
		}
		// element operating on moves up DOM tree
		element = element.parentNode
	}
	return null
}

// selctor = parent DOM element
// eventName = 'click' / user action
// targetSelector: child element of slector to run function(listener) on
// listener: function to call

// create function called delegate 
function delegate(selector, eventName, targetSelector, listener) {
	// get DOM element(selector) add event listener (user action, declare function)
	document.querySelector(selector).addEventListener(eventName, function (event) {
		// call closest 'function' (above) where
		// element = event.target
		// query = targetSelector
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

	delegate('#container', 'click', 'li.list-thing', function(event){
		console.log(event.target.textContent);
		event.target.remove();
		if ( !$archiveList() ) {
			$container.innerHTML += archiveTemplate;
		};
		$archiveList().innerHTML += `<li class="archive-thing">${event.target.textContent}</li>`;
		return null;
	});


	delegate('form', 'click', '#new-thing-button', function(event){
		event.preventDefault();
		render($newThing.value, $myList);
	})


	function render(data, into) {
		event.preventDefault();
		if(data.length>0){
			into.innerHTML += `<li class="list-thing">${data}</li>`;
		};
		
		$newThing.value = '';
		return null;
	}


})()
