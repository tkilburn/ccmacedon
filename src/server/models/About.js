var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * About Model
 * ==========
 */

var About = new keystone.List('About', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	sortable: true,
});

About.add({
	title: { type: String, required: true },
	description: { type: Types.Html, wysiwyg: true }
});

About.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

About.defaultColumns = 'title';
About.register();
