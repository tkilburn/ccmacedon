var keystone = require('keystone');

/**
 * TeachingCategory Model
 * ==================
 */

var TeachingCategory = new keystone.List('TeachingCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	sortable: true,
});

TeachingCategory.add({
	name: { type: String, required: true },
});

TeachingCategory.relationship({ ref: 'Teaching', path: 'teachings', refPath: 'categories' });

TeachingCategory.register();
