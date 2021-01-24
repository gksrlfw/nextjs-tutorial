
function repAll() {
    //replaceAll prototype 선언
    String.prototype.replaceAll = function(org, dest) {
        return this.split(org).join(dest);
    }

    //replaceAll 사용
    var str = "Hello World";

    console.log(str.replace(/o/g, ''));
    str = str.replaceAll("o","");
    console.log(str);
}

let users = [
    { id: 11, name: 'Adam', age: 23, group: 'editor' },
    { id: 47, name: 'John', age: 28, group: 'admin' },
    { id: 85, name: 'William', age: 34, group: 'editor' },
    { id: 97, name: 'Oliver', age: 28, group: 'admin' }
];


function filterTest() {
    // filter: 통과한 요소들만 모아 새로운 배열을 만들어준다
    let res = users.filter(user => user.age === 28);
    let res2 = users.filter(user => user.name.includes('oil'));
    let res3 = users.map(user => user.age);
    console.log(res, res3);
}

filterTest()

function someTest() {
    let hasAdmin = users.some(user => user.group === 'admin');
}

function reduceTest() {
    let nested = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    let flat = [].concat.apply([], nested);
    let res = [];
    nested.forEach(nest => {
        res = [...res, ...nest];
    });
    console.log(res);
}


// let a = [2,1,3];

// a.sort()
// a.reverse();

// console.log(a.every(x => x<4));

// console.log(a);


let str = 'abc'
console.log(str.replace(/abc/))