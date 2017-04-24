const keystone = require('keystone');

exports = module.exports = function (req, res) {

	const view = new keystone.View(req, res);
	const locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'teachings';
	locals.filters = {
		bookKey: req.params.bookKey,
		lessonKey: req.params.lessonKey,
	};
	locals.data = {
		teachings: [],
		categories: [],
		books: [],
	};

	// Load Book and Teachings
	view.on('init', function (next) {
		const q = keystone.list('Teaching').model.findOne()
			.where('key', locals.filters.lessonKey)
			.populate({ path: 'books', populate: { path: 'categories' } });
		q.exec(function (err, results) {
			locals.data.teachings = results;
			next(err);
		});
	});


	// Render the view
	view.render('teaching');
};
