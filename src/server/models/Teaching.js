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
		// path: 'data/file',
		path: process.env.TEACHING_DIR,
		publicPath: '/file',
		whenExists: 'overwrite',
		generateFilename: function (file, index) {
			return file.originalname;
		},
	},
});

Teaching.add({
	title: { type: String, required: true },
	code: { type: String },
	books: { type: Types.Relationship, ref: 'TeachingBook', index: true },
	teachers: { type: Types.Relationship, ref: 'Teacher', index: true },
	date: { type: Types.Date, index: true },
	teachingUpload: { type: Types.File, storage: myStorage },
	currentSunTeaching: { type: Types.Boolean },
	currentWedTeaching: { type: Types.Boolean },
});

Teaching.defaultColumns = 'title|20%'
						+ ',books|15%'
						+ ',date|15%'
						+ ',currentSunTeaching|10%'
						+ ',currentWedTeaching|10%'
						+ ',teachers|20%';

Teaching.schema.virtual('content.full').get(() => {
	return this.content.extended || this.content.brief;
});


const resetSunTeaching = (teachingToKeep) => {
	keystone.list('Teaching').model
	.update(
		{ _id: { $ne: teachingToKeep._id }, currentSunTeaching: true },
		{ $set: { currentSunTeaching: false } },
		{ multi: true }
	).exec();
};

const resetWedTeaching = (teachingToKeep) => {
	keystone.list('Teaching').model
	.update(
		{ _id: { $ne: teachingToKeep._id }, currentWedTeaching: true },
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

Teaching.register();
