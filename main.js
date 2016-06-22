
(function() {
	var state = {};
	
	function updateList(data, removeThis){
		var listTemplate = `<li>${data.text}</li>`; //es6 template
		if (data.placeIn === 'todo'){ // put in todo list
			document.getElementById('my-list').innerHTML += listTemplate; // better alternative to += ?
			document.getElementById('new-thing').value = '';	
		}
		else if (data.placeIn === 'archive'){ // put in archive
			document.getElementById('archive-list').innerHTML += listTemplate; 
			removeThis.remove(); // remove li clicked on from DOM
		};
		state.placeIn = ''; // reset values for object keys
		state.text = '';
	};

	// delegate for clicking on li in todo list - creates and moves to archive
	delegate('#my-list', 'click', 'li', function(event){
		console.log('event', event.target); // what was clicked
		console.log('delegate.target', event.delegateTarget); // what was clicked -  from delegate function
		console.log('parentNode', event.target.parentNode); // clicked item parent

		if ( !document.getElementById('archive-head') ) { // if there is no 'archive'
			var arcHead = document.createElement('h2'); // create one
			arcHead.id = 'archive-head';
			arcHead.textContent = 'Archive';
			document.getElementById('container').appendChild(arcHead); // append to #container

			var archiveList = document.createElement('ul'); // create ul for archive
			archiveList.id = 'archive-list';
			document.getElementById('container').appendChild(archiveList) 
		};
		state.text = event.target.textContent; // set text in state object
		state.placeIn = 'archive'; // set list to put todo in 
		updateList(state, event.target);//stop bubble phase as event.target has been removed from nodeList 
		
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
	});
	
})();




