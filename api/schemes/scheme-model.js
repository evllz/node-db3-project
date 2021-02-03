// scheme-model
const db = require('../../data/db-config');

module.exports = {
	find,
	findById,
	findSteps,
	add,
	update,
	remove,
};

async function find() {
	return await db('schemes');
}

async function findById(id) {
	return await db('schemes').where({ id }).first();
}

async function findSteps(id) {
	return await db('schemes')
		.join('steps', 'schemes.id', '=', 'steps.scheme_id')
		.where({ 'schemes.id': id })
		.select(
			'schemes.id',
			'schemes.scheme_name',
			'steps.step_number',
			'steps.instructions',
		);
}

async function add(scheme) {
	const ids = db('schemes').insert(scheme);
	return await findById(ids[0]);
}

async function update(changes, id) {
	return await db('schemes').where({ id }).update(changes);
}

async function remove(id) {
	return await db('schemes').where({ id }).del();
}
