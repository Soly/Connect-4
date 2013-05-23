// Connect 4 game engine
// Requires jQuery, jQueryUI, connect4.html, and style.css
$(document).ready(function() {
	

	function makeGrid() {
		for(var i = 1; i < 8; i++) {
			$('div#grid>ol').append($('<li></li>').addClass('column'));
			$('ol>li.column:nth-child(' + String(i) + ')').append($('<ol></ol>'));
			for(var j = 0; j < 6; j++) {
				$('ol>li.column:nth-child(' + String(i) + ')>ol').append($('<li></li>').addClass('hole'));
			}
		}
	
		$('li.column').hover(
		function(){
			$(this).toggleClass('hovered');
		}, function() {
			$(this).toggleClass('hovered');
		});

	}
	
	
	makeGrid();
	
	$('li.column').click(function() {
		var $color = $('#grid>.piece').hasClass('black') ? 'black' : 'red';
		console.log($color);
		
		var holes = $(this).children().children().map(function() {
			return $(this).attr("class");
		}).get();
		var nextHole = -1;
		for(var i = 0; i < holes.length; i++) {
			if(holes[i].split(' ').length > 1) {
				break;
			}
			nextHole = i+1;
		}

		//console.log(holes);
		if (nextHole > 0) {
			$(this).children().children(':nth-child(' + nextHole + ')').addClass($color);
			$('#grid>.piece').toggleClass('black').toggleClass('red');
			$('p.tred').toggleClass('inactive');
			$('p.tblack').toggleClass('inactive');
			if(checkWin($color)) {
				endGame($color);
			}
		}
	});
	
	function makeMove() {
		$currPiece = $('<div/>').addClass('piece').addClass('playing');
		$currPiece.addClass('black');
		$('p.tred').addClass('inactive');
		
		$('div').bind('mousemove', function(e){
			$('#grid').prepend($currPiece);
			if(e.pageX - 310 < 0) {
				$('.piece').css({
		  			left: -10
				});
			}
			else if(e.pageX - 310 > Number($('#grid').css('width').slice(0,length-2)) - Number($('.piece').css('width').slice(0,length-2))) {
				$('.piece').css({
		  			left: Number($('#grid').css('width').slice(0,length-2)) - Number($('.piece').css('width').slice(0,length-2))
				});
			}
			else $('.piece').css({
		  		left: e.pageX - 310,
			});

		});
	}

	function checkWin(color) {
		var holes = [];
		for(var i = 1; i < 8; i++) {
			var col = $('ol>li:nth-child('+i+')').children().children().map(function() {
				return $(this).attr("class");
			}).get();
			holes.push(col);
		}
		//console.log(holes);
		
		// horizontal
		for(var i = 0; i < 6; i++) {
			if(traverse(holes, 0, i, 1, 0) == color) {
				console.log(color + ' wins!');
				return true;
			}
		}
		// vertical
		for(var i = 0; i < 7; i++) {
			if(traverse(holes, i, 0, 0, 1) == color) {
				console.log(color + ' wins!');
				return true;
			}
		}
		// diagonals
		// corner case #1: bottom left \
		if(traverse(holes, 0, 2, 1, 1) == color) {
			console.log(color + ' wins!');
			return true;
		}
		//corner case #2: mid bottom left \
		if(traverse(holes, 0, 1, 1, 1) == color) {
			console.log(color + ' wins!');
			return true;
		}

		// \ diagonals
		for(var i = 0; i < 4; i++) {
			if(traverse(holes, i, 0, 1, 1) == color) {
				console.log(color + ' wins!');
				return true;
			}
		}

		// corner case #3: bottom left /
		if(traverse(holes, 0, 3, 1, -1) == color) {
			console.log(color + ' wins!');
			return true;
		}

		// corner case #4: mid bottom left /
		if(traverse(holes, 0, 4, 1, -1) == color) {
			console.log(color + ' wins!');
			return true;
		}

		// / diagonals
		for(var i = 0; i < 4; i++) {
			if(traverse(holes, i, 5, 1, -1) == color) {
				console.log(color + ' wins!');
				return true;
			}
		} 

	}

	function traverse(arr, starti, startj, inci, incj) {
		var count = 0;
		var i = starti;
		var j = startj;
		while((i < 7 && i >= 0) && (j < 6 && j >= 0)) {
			if(arr[i][j].indexOf('black') != -1) {
				if(count >= 0) {
					count++;
					if(count == 4) return 'black';
				}
				else count = 1;
			}			
			else if(arr[i][j].indexOf('red') != -1) {
				if(count <= 0) {
					count--;
					if(count == -4) return 'red';
				}
				else count = -1;
			}
			else count = 0;

			i+=inci;
			j+=incj;
		}
	}

	function endGame(winner) {
		$('#dialog').dialog({ dialogClass: "no-close", appendTo: "#game", modal:true });
		winner = winner[0].toUpperCase() + winner.slice(1, winner.length);
		$('#dialog').append(winner + ' wins!');

		$('#dialog').dialog({ buttons:[{text: 'New Game', click: function() {
			location.reload();
		}}]});


		$('#dialog').dialog("open");
	}


	makeMove();
	
});










