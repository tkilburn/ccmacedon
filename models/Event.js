var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Event Model
 * ==========
 */

var Event = new keystone.List('Event', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	sortable: true,
});

Event.add({
	title: { type: String, required: true },
	description: { type: Types.Html, wysiwyg: true },
	homePage: { type: Types.Boolean },
	eventPage: { type: Types.Boolean },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'Y', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	ericsField: { type: Types.Boolean },
});

Event.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Event.defaultColumns = 'title|10%, state|20%, author|20%, publishedDate|20%';
Event.register();
