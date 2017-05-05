var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	locals.data = {
		announcements: [],
		ministries: [],
		events: [],
		sunTeaching: [],
		wedTeaching: [],
	};

	// Load Announcements
	view.on('init', function (next) {
		var q = keystone.list('Announcement').model.find()
			.sort({ important: -1, sortOrder: 1 });
		q.exec(function (err, results) {
			locals.data.announcements = results;
			next(err);
		});
	});

	// Load Ministries
	view.on('init', function (next) {
		var q = keystone.list('Ministry').model.find()
			.where('homePage', 'true')
			.sort('sortOrder');
		q.exec(function (err, results) {
			locals.data.ministries = results;
			next(err);
		});
	});

	// Load Events
	view.on('init', function (next) {
		var q = keystone.list('Event').model.find()
			.where('homePage', 'true')
			.sort('sortOrder');
		q.exec(function (err, results) {
			locals.data.events = results;
			next(err);
		});
	});

	// Load Sun Teachings
	view.on('init', function (next) {
		const q = keystone.list('Teaching').model.findOne()
			.where('currentSunTeaching', 'true')
			.populate({ path: 'books', populate: { path: 'categories' } });
		q.exec(function (err, results) {
			locals.data.sunTeaching = results;
			locals.data.sunTeaching.formattedDate = locals.data.sunTeaching.date.toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric',
			});
			next(err);
		});
	});

	// Load Wed Teachings
	view.on('init', function (next) {
		const q = keystone.list('Teaching').model.findOne()
			.where('currentWedTeaching', 'true')
			.populate({ path: 'books', populate: { path: 'categories' } });
		q.exec(function (err, results) {
			locals.data.wedTeaching = results;
			locals.data.wedTeaching.formattedDate = locals.data.wedTeaching.date.toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric',
			});
			next(err);
		});
	});


	// Render the view
	view.render('index');
};
