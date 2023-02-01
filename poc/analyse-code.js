const fs = require('fs');
const path = require('path');
const util = require('util');
var Promise = require('bluebird');

const readFile = util.promisify(fs.readFile);
const readDir = util.promisify(fs.readdir);
const isDir = (entryPath) => fs.statSync(entryPath).isDirectory();
const excludeList = [ '.git', 'node_modules', '.gitignore' ];
const filter = (fn) => (arr) => arr.filter(fn);
const filterExcludeList = (exList) => (entry) => !exList.includes(entry);

const readRecursive = (folderPath) => {
	return readDir(folderPath).then(filter(filterExcludeList(excludeList))).then((entries) => {
		let folders = entries.map((f) => path.join(folderPath, f)).filter((f) => isDir(f));
		let files = entries.map((f) => path.join(folderPath, f)).filter((f) => !isDir(f));

		return Promise.all(folders.map((f) => readRecursive(f)))
			.then((entries) => [ ...files, ...entries ])
			.then((entries) => entries.flat(12));
	});
};

readRecursive('../../')
	.then((files) =>
		Promise.map(
			files,
			(f) =>
				readFile(f).then((buf) => buf.toString()).then((text) => text.split('\n')).then((lines) => ({
					file: f,
					lines: lines.length,
					commentedlines: lines.filter((l) => l.startsWith('//')).length,
					emptyLines: lines.filter((l) => !l.trim()).length
				})),
			{ concurrency: 5 }
		)
	)
	.then((data) => console.log(data));
