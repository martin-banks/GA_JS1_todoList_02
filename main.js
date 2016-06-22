// delegate function from remote file

// not in use for this project
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


//////////////////////////////////////////////////////
// JS NOTES V2 ///////////////////////////////////////
//////////////////////////////////////////////////////
(function() {
	var state = {};
	var $archiveList = function() {
		return document.querySelector('#archive-list');
	};

	function updateList(data, removeThis){
		var listTemplate = `<li>${data.text}</li>`;
		if (data.placeIn === 'todo'){ // put in todo list
			document.getElementById('my-list').innerHTML += listTemplate; // better alternative to += ?
			document.getElementById('new-thing').value = '';	
		} ;
		else if (data.placeIn === 'archive'){ // put in archive
			document.getElementById('archive-list').innerHTML += listTemplate; 
			removeThis.remove();
		};
		state.placeIn = '';
		state.text = '';
	};

	// delegate for clicking on li in todo list - creates and moves to archive
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
		// stop bubble phase as event.target has been removed from nodeList 
		event.stopPropagation(); 
		return false;
	});

	// delegate for clicking on 'create new thing' button
	delegate('body', 'click', '#new-thing-button', function(event){
		event.preventDefault();
		if(document.getElementById('new-thing').value.length>0){
			state.placeIn = 'todo';
			state.text = document.getElementById('new-thing').value;
			updateList(state);
		};
	})


	
	




})()




