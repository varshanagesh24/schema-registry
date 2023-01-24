let excludeProperty = (obj, props) => props.reduce((agr, prop) => (delete agr[prop], agr), { ...obj });

let groupBy = (arr, key, excludeKey = true) =>
	arr.reduce(
		(agr, item) => (
			(agr[item[key]] = [ ...(agr[item[key]] || []), excludeKey ? excludeProperty(item, [ key ]) : item ]), agr
		),
		{}
	);

module.exports = {
	excludeProperty,
	groupBy
};
