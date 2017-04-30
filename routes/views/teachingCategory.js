const keystone = require('keystone');

exports = module.exports = function (req, res) {

	const view = new keystone.View(req, res);
	const locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'teachings';
	locals.data = {
		teachingCategories: [],
	};

	// Load Teaching Categories and Books
	view.on('init', function (next) {
		const q = keystone.list('TeachingCategory').model.aggregate([
			{
				$lookup:
				{
					from: 'teachingbooks',
					localField: '_id',
					foreignField: 'categories',
					as: 'books',
				},
			},
			{ $unwind: '$books' },
			{ $sort: { 'books.sortOrder': 1 } },
			{ $group: {
				_id: '$_id',
				name: { $first: '$name' },
				slug: { $first: '$slug' },
				sortOrder: { $first: '$sortOrder' },
				books: { $push: '$books' },
			} },
			{ $sort: { sortOrder: 1 } },
		]);
		q.exec(function (err, results) {
			console.log(results);
			locals.data.teachingCategories = results;
			next(err);
		});
	});


	// Render the view
	view.render('teachingCategory');
};
