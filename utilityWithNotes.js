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