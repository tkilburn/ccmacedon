var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * TeachingBook Model
 * ==================
 */

var TeachingBook = new keystone.List('TeachingBook', {
	autokey: { path: 'slug', from: 'name', unique: true },
	sortable: true,
});

TeachingBook.add({
	name: { type: String, required: true },
	categories: { type: Types.Relationship, ref: 'TeachingCategory', index: true },
});

TeachingBook.relationship({ ref: 'Teaching', path: 'teachings', refPath: 'books' });

TeachingBook.register();
