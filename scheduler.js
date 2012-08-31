// 1-2-3-4, 5-8-9-12, 6-7-10-11
var games = [
	[ 1, 2 ],
	[ 1, 2 ],
	[ 1, 3 ],
	[ 1, 3 ],
	[ 1, 4 ],
	[ 1, 4 ],
	[ 1, 5 ],
	[ 1, 6 ],
	[ 1, 7 ],
	[ 1, 8 ],
	[ 1, 9 ],
	[ 1, 10 ],
	[ 1, 11 ],
	[ 1, 12 ],

	[ 2, 3 ],
	[ 2, 3 ],
	[ 2, 4 ],
	[ 2, 4 ],
	[ 2, 5 ],
	[ 2, 6 ],
	[ 2, 7 ],
	[ 2, 8 ],
	[ 2, 9 ],
	[ 2, 10 ],
	[ 2, 11 ],
	[ 2, 12 ],

	[ 3, 4 ],
	[ 3, 4 ],
	[ 3, 5 ],
	[ 3, 6 ],
	[ 3, 7 ],
	[ 3, 8 ],
	[ 3, 9 ],
	[ 3, 10 ],
	[ 3, 11 ],
	[ 3, 12 ],

	[ 4, 5 ],
	[ 4, 6 ],
	[ 4, 7 ],
	[ 4, 8 ],
	[ 4, 9 ],
	[ 4, 10 ],
	[ 4, 11 ],
	[ 4, 12 ],


	[ 5, 8 ],
	[ 5, 8 ],
	[ 5, 9 ],
	[ 5, 9 ],
	[ 5, 12 ],
	[ 5, 12 ],
	[ 5, 6 ],
	[ 5, 7 ],
	[ 5, 10 ],
	[ 5, 11 ],

	[ 8, 9 ],
	[ 8, 9 ],
	[ 8, 12 ],
	[ 8, 12 ],
	[ 8, 6 ],
	[ 8, 7 ],
	[ 8, 10 ],
	[ 8, 11 ],

	[ 9, 12 ],
	[ 9, 12 ],
	[ 9, 6 ],
	[ 9, 7 ],
	[ 9, 10 ],
	[ 9, 11 ],

	[ 12, 6 ],
	[ 12, 7 ],
	[ 12, 10 ],
	[ 12, 11 ],


	[ 6, 7 ],
	[ 6, 7 ],
	[ 6, 10 ],
	[ 6, 10 ],
	[ 6, 11 ],
	[ 6, 11 ],

	[ 7, 10 ],
	[ 7, 10 ],
	[ 7, 11 ],
	[ 7, 11 ],

	[ 10, 11 ],
	[ 10, 11 ]

];

$(document).ready(function() {
	var r;
	var temp;

	var weeks = {};

	for (var week = 1; week <= 14; week++) {
		games = shuffleGames(games);

		weeks[week] = {
			teams: {},
			games: []
		};

		for (var i = 0; i < games.length; i++) {
			var team0 = games[i][0];
			var team1 = games[i][1];

			if (weeks[week].teams[team0] == null && weeks[week].teams[team1] == null) {
				weeks[week].teams[team0] = true;
				weeks[week].teams[team1] = true;

				weeks[week].games.push(games.splice(i, 1)[0]);
				i--;
			}

			if (weeks[week].games.length == 6) {
				break;
			}
		}

		if (weeks[week].games.length < 6) {
			games = games.concat(weeks[week].games);

			if (week > 1) {
				games = games.concat(weeks[week-1].games);
			}

			if (week >= 2) {
				week -= 2;
			}
		}

		/*
		temp = null;

		while (weeks[week].length < 6) {
			if (temp == weeks[week].length) {
				console.log(teams);
				break;
			}

			temp = weeks[week].length;
			for (var i = 0; i < games.length; i++) {
				var team0 = games[i][0];
				var team1 = games[i][1];

				if (teams[team0] == null && teams[team1] == null) {
					teams[team0] = true;
					teams[team1] = true;

					weeks[week].push(games.splice(i, 1)[0]);

					break;
				}
			}
		}
		*/
	}

	for (var week = 1; week <= 14; week++) {
		var p = $('<p>');

		for (var i = 0; i < weeks[week].games.length; i++) {
			p.append($('<span>' + weeks[week].games[i][0] + ' vs. ' + weeks[week].games[i][1] + '</span><br />'));
		}

		$('body').append(p);
	}

	console.log(weeks);
});

function shuffleGames(games) {
	for (var n = 0; n < games.length; n++) {
		r = Math.floor(Math.random() * games.length);

		temp = games[n];
		games[n] = games[r];
		games[r] = temp;
	}

	return games;
}
