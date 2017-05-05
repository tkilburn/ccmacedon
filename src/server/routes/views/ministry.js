const keystone = require('keystone');

exports = module.exports = function (req, res) {

	const view = new keystone.View(req, res);
	const locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'ministries';
	locals.data = {
		ministries: [],
	};

	// Load Ministries
	view.on('init', function (next) {
		const q = keystone.list('Ministry').model.find()
			.where('ministryPage', 'true')
			.sort('sortOrder');
		q.exec(function (err, results) {
			locals.data.ministries = results;
			next(err);
		});
	});

	// Render the view
	view.render('ministry');
};
