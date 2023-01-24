let transform = (obj, props) => props.reduce((agr, prop) => ((agr[prop] = obj[prop]), agr), {});
let excludeProperty = (obj, props) => props.reduce((agr, prop) => (delete agr[prop], agr), { ...obj });

let groupBy = (arr, key, excludeKey = true) =>
	arr.reduce((agr, item) => {
		// let propValue = item[key];
		// let arr = agr[propValue] || []
		// arr = [...arr, item]
		// agr[item[key]] = arr;
		agr[item[key]] = [ ...(agr[item[key]] || []), excludeProperty(item, [ key ]) ];
		return agr;
	}, {});

let data = [
	{
		p: 1,
		a: 1,
		b: 1
	},
	{
		p: 1,
		a: 2,
		b: 1
	},
	{
		p: 1,
		a: 1,
		b: 3
	},
	{
		p: 2,
		a: 1,
		b: 4
	},
	{
		p: 2,
		a: 1,
		b: 5
	},
	{
		p: 3,
		a: 1,
		b: 1
	}
];

console.log(groupBy(data, 'p'));

console.log(transform({ p: 3, a: 1, b: 2 }, [ 'a', 'b' ]));
console.log(excludeProperty({ p: 3, a: 1, b: 2 }, [ 'p' ]));
