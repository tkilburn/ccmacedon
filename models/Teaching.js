var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Teaching Model
 * ==========
 */

var Teaching = new keystone.List('Teaching', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
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
	code: { type: String },
	books: { type: Types.Relationship, ref: 'TeachingBook', index: true },
	teacher: { type: Types.Relationship, ref: 'Teacher', index: true },
	currentSunTeaching: { type: Types.Boolean },
	currentWedTeaching: { type: Types.Boolean },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	teachingUpload: { type: Types.File, storage: myStorage },
});

Teaching.schema.virtual('content.full').get(() => {
	return this.content.extended || this.content.brief;
});


const resetSunTeaching = (teachingToKeep) => {
	keystone.list('Teaching').model
	.update(
		{ _id: { $ne: teachingToKeep._id }, currentSunTeaching: true, state: 'published' },
		{ $set: { currentSunTeaching: false } },
		{ multi: true }
	).exec();
};

const resetWedTeaching = (teachingToKeep) => {
	keystone.list('Teaching').model
	.update(
		{ _id: { $ne: this._id }, currentWedTeaching: true, state: 'published' },
		{ $set: { currentWedTeaching: false } },
		{ multi: true }
	).exec();
};

Teaching.schema.pre('save', function (next) {
	if (this.currentSunTeaching) {
		resetSunTeaching(this);
	}
	if (this.currentWedTeaching) {
		resetWedTeaching(this);
	}
	next();
});

Teaching.defaultColumns = 'title|20%, books|20%, state|20%, author|20%, publishedDate|20%';
Teaching.register();
