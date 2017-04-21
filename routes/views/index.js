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
	};

	// Load Announcements
	view.on('init', function (next) {
		var q = keystone.list('Announcement').model.find()
			.where('state', 'published')
			.populate('author');
		q.exec(function (err, results) {
			locals.data.announcements = results;
			next(err);
		});
	});

	// Load Ministries
	view.on('init', function (next) {
		var q = keystone.list('Ministry').model.find()
			.where('state', 'published')
			.populate('author');
		q.exec(function (err, results) {
			locals.data.ministries = results;
			next(err);
		});
	});

	// Load Events
	view.on('init', function (next) {
		var q = keystone.list('Event').model.find()
			.where('state', 'published')
			.populate('author');
		q.exec(function (err, results) {
			locals.data.events = results;
			next(err);
		});
	});

	// Render the view
	view.render('index');
};
