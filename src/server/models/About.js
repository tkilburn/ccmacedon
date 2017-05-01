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
	description: { type: Types.Html, wysiwyg: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
});

About.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

About.defaultColumns = 'title|10%, state|20%, author|20%, publishedDate|20%';
About.register();
