var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Ministry Model
 * ==========
 */

var Ministry = new keystone.List('Ministry', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	sortable: true,
});

Ministry.add({
	title: { type: String, required: true },
	time: { type: String },
	description: { type: Types.Html, wysiwyg: true },
	homePage: { type: Types.Boolean },
	ministryPage: { type: Types.Boolean },
});

Ministry.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Ministry.defaultColumns = 'title|20%, homePage|20%, ministryPage|20%';
Ministry.register();
