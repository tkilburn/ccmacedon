const keystone = require('keystone');

exports = module.exports = function (req, res) {

	const view = new keystone.View(req, res);
	const locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'events';
	locals.data = {
		events: [],
	};

	// Load Events
	view.on('init', function (next) {
		const q = keystone.list('Event').model.find()
			.where('eventPage', 'true')
			.sort('sortOrder');
		q.exec(function (err, results) {
			locals.data.events = results;
			next(err);
		});
	});

	// Render the view
	view.render('event');
};
