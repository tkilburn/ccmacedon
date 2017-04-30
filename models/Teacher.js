var keystone = require('keystone');

/**
 * Teacher Model
 * ==================
 */

var Teacher = new keystone.List('Teacher', {
	autokey: { path: 'slug', from: 'name', unique: true },
});

Teacher.add({
	name: { type: String, required: true },
});

Teacher.relationship({ ref: 'Teaching', path: 'teachings', refPath: 'teachers' });

Teacher.register();
