var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Announcement Model
 * ==========
 */

var Announcement = new keystone.List('Announcement', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	sortable: true,
});

Announcement.add({
	title: { type: String, required: true },
	description: { type: Types.Textarea },
	important: { type: Types.Boolean },
	startDate: { type: Types.Date },
	endDate: { type: Types.Date },
});

Announcement.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Announcement.defaultColumns = 'title|10%, important|20%, startDate|20%, endDate|20%';
Announcement.register();
