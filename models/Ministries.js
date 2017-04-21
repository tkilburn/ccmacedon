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
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'Y', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
});

Ministry.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Ministry.defaultColumns = 'title|10%, state|20%, author|20%, publishedDate|20%';
Ministry.register();
