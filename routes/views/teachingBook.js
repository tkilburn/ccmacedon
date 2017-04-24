const keystone = require('keystone');

exports = module.exports = function (req, res) {

	const view = new keystone.View(req, res);
	const locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'teachings';
	locals.filters = {
		bookKey: req.params.bookKey,
	};
	locals.data = {
		teachings: [],
	};

	// Load Book and Teachings
	view.on('init', function (next) {
		const q = keystone.list('TeachingBook').model.aggregate([
			{ $match: { key: locals.filters.bookKey } },
			{
				$lookup:
				{
					from: 'teachingcategories',
					localField: 'categories',
					foreignField: '_id',
					as: 'categories',
				},
			},
			{ $unwind: '$categories' },
			{
				$lookup:
				{
					from: 'teachings',
					localField: '_id',
					foreignField: 'books',
					as: 'teachings',
				},
			},
			{ $unwind: '$teachings' },
			{ $sort: { 'teachings.sortOrder': 1 } },
			{ $group: {
				_id: '$_id',
				key: { $first: '$key' },
				name: { $first: '$name' },
				category: { $first: '$categories.name' },
				sortOrder: { $first: '$sortOrder' },
				teachings: { $push: '$teachings' },
			} },
		]);
		q.exec(function (err, results) {
			locals.data.teachings = results;
			next(err);
		});
	});

	// Render the view
	view.render('teachingBook');
};
