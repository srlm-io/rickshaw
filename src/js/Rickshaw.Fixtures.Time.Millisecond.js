Rickshaw.namespace('Rickshaw.Fixtures.Time.Millisecond');

Rickshaw.Fixtures.Time.Millisecond = function() {

	
	var self = this;

	this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	this.units = [
		{
			name: 'decade',
			seconds: 86400 * 365.25 * 10 *1000,
			formatter: function(d) {
				d = new Date(d.getTime()/1000);
				return (parseInt(d.getUTCFullYear() / 10, 10) * 10);
			}
		}, {
			name: 'year',
			seconds: 86400 * 365.25 *1000,
			formatter: function(d) {
				d = new Date(d.getTime()/1000);
				return d.getUTCFullYear();
			}
		}, {
			name: 'month',
			seconds: 86400 * 30.5 *1000,
			formatter: function(d) {
				d = new Date(d.getTime()/1000);
				return self.months[d.getUTCMonth()];
			}
		}, {
			name: 'week',
			seconds: 86400 * 7 *1000,
			formatter: function(d) {
				d = new Date(d.getTime()/1000);
				return self.formatDate(d);
			}
		}, {
			name: 'day',
			seconds: 86400 *1000,
			formatter: function(d) {
				d = new Date(d.getTime()/1000);
				return d.getUTCDate();
			}
		}, {
			name: '6 hour',
			seconds: 3600 * 6 *1000,
			formatter: function(d) {
				d = new Date(d.getTime()/1000);
				return self.formatTime(d);
			}
		}, {
			name: 'hour',
			seconds: 3600 *1000,
			formatter: function(d) {
				d = new Date(d.getTime()/1000);
				return self.formatTime(d);
			}
		}, {
			name: '15 minute',
			seconds: 60 * 15 *1000,
			formatter: function(d) {
				d = new Date(d.getTime()/1000);
				return self.formatTime(d);
			}
		}, {
			name: 'minute',
			seconds: 60 *1000,
			formatter: function(d) {
				d = new Date(d.getTime()/1000);
				return d.getUTCMinutes();
			}
		}, {
			name: '15 second',
			seconds: 15 *1000,
			formatter: function(d) {
				d = new Date(d.getTime()/1000);
				return d.getUTCSeconds() + 's';
			}
		}, {
			name: 'second',
			seconds: 1 *1000,
			formatter: function(d) {
				d = new Date(d.getTime()/1000);
				return d.getUTCSeconds() + 's';
			}
		}, {
			name: 'decisecond',
			seconds: 1 / 10 *1000,
			formatter: function(d) {
				d = new Date(d.getTime()/1000);
				return d.getUTCMilliseconds() + 'ms';
			}
		}, {
			name: 'centisecond',
			seconds: 1 / 100 *1000,
			formatter: function(d) {
				d = new Date(d.getTime()/1000);
				return d.getUTCMilliseconds() + 'ms';
			}
		}
	];

	this.unit = function(unitName) {
		return this.units.filter(function(unit) {
			return unitName == unit.name;
		}).shift();
	};

	this.formatDate = function(d) {
		return d3.time.format('%b %e')(d);
	};

	this.formatTime = function(d) {
		return d.toUTCString().match(/(\d+:\d+):/)[1];
	};
	// SRLM: Did some modifications on these functions to try and bring them
	// up to milliseconds, but haven't tried anything out.
	this.ceil = function(time, unit) {

		var date, floor, year;

		if (unit.name == 'month') {

			date = new Date(time);

			floor = Date.UTC(date.getUTCFullYear(), date.getUTCMonth());
			if (floor == time)
			return time;

			year = date.getUTCFullYear();
			var month = date.getUTCMonth();

			if (month == 11) {
			month = 0;
			year = year + 1;
			} else {
			month += 1;
			}

			return Date.UTC(year, month);
		}

		if (unit.name == 'year') {

			date = new Date(time);

			floor = Date.UTC(date.getUTCFullYear(), 0);
			if (floor == time)
			return time;

			year = date.getUTCFullYear() + 1;

			return Date.UTC(year, 0);
		}

		return Math.ceil(time / unit.seconds) * unit.seconds;
	};
};
