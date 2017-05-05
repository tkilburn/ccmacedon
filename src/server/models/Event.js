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
	startDate: { type: Types.Date },
	endDate: { type: Types.Date },
});

Event.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Event.defaultColumns = 'title|20%, state|20%, homePage|10%, eventPage|10%, startDate|20%, endDate|20%';
Event.register();
