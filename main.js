
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




