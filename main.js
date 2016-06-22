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

// selector = parent DOM element
// eventName = 'click' / user action
// targetSelector: child element of slector to run function(listener) on
// listener: function to call

// create function called delegate 
function delegate(selector, eventName, targetSelector, listener) {
	// get DOM element(selector) add event listener (user action, declare function)
	document.querySelector(selector).addEventListener(eventName, function (event) {
		//event.preventDefault();
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

	var $archiveList = function() {
		return document.querySelector('#archive-list');
	}
	//document.querySelector('#container').innerHTML += '<h2 id="archive-head">Archive</h2><ul id="archive-list"></ul>';


	function updateList(data, removeThis){
		var listTemplate = `<li>${data.text}</li>`;
		if (data.placeIn === 'todo'){ // put in todo list
			document.getElementById('my-list').innerHTML += listTemplate;
			document.getElementById('new-thing').value = '';	
		} 
		else if (data.placeIn === 'archive'){ // put in archive
			document.getElementById('archive-list').innerHTML += listTemplate;
			removeThis.remove();
		}
		state.placeIn = '';
		state.text = '';
	}


	delegate('#my-list', 'click', 'li', function(event){
		console.log('event', event.target);
		console.log('delegate.target', event.delegateTarget);
		console.log('parentNode', event.target.parentNode);

		if ( !document.getElementById('archive-head') ) {
			var arcHead = document.createElement('h2');
				arcHead.id = 'archive-head';
				arcHead.textContent = 'Archive';
			document.getElementById('container').appendChild(arcHead);
			
			var archiveList = document.createElement('ul');
				archiveList.id = 'archive-list';
			document.getElementById('container').appendChild(archiveList)
		};
		state.text = event.target.textContent;
		state.placeIn = 'archive';
		updateList(state, event.target);	
		// stop bubble pahse as event.target has been removed from nodeList 
		event.stopPropagation(); 
		return false;
	});


	delegate('body', 'click', '#new-thing-button', function(event){
		event.preventDefault();
		if(document.getElementById('new-thing').value.length>0){
			state.placeIn = 'todo';
			state.text = document.getElementById('new-thing').value
			updateList(state);
		};
		
	})


	
	




})()




