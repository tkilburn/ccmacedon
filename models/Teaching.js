var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Teaching Model
 * ==========
 */

var Teaching = new keystone.List('Teaching', {
	map: { name: 'title' },
	autokey: { from: 'title', path: 'key', unique: true },
});

var myStorage = new keystone.Storage({
	adapter: keystone.Storage.Adapters.FS,
	fs: {
		path: 'data/file',
		publicPath: '/file',
		generateFilename: function (file, index) {
			return file.originalname;
		},
	},
});

Teaching.add({
	title: { type: String, required: true },
	books: { type: Types.Relationship, ref: 'TeachingBook', index: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'Y', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	teachingUpload: { type: Types.File, storage: myStorage },
});

Teaching.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Teaching.defaultColumns = 'title|20%, books|20%, state|20%, author|20%, publishedDate|20%';
Teaching.register();
