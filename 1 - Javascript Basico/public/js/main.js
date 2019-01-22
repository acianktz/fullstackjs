let exercises = [
    { url: 'https://jsbin.com/lubayer/edit?js,console', name: 'Statements' },
    { url: 'https://jsbin.com/rohowaf/edit?js,console', name: 'Hoisting' },
    { url: 'https://jsbin.com/batezix/edit?js,console', name: 'Arrays' },
    { url: 'https://jsbin.com/yacigol/edit?js,console', name: 'Objetos' },
    { url: 'https://jsbin.com/tiwigig/edit?js,console', name: 'Prototype' },
    { url: 'https://jsbin.com/geqalem/edit?js,output', name: 'DOM I' },
    { url: 'https://jsbin.com/sehutup/edit?js,console,output', name: 'DOM II' },
    { url: 'https://jsbin.com/woyipal/edit?js,console,output', name: 'Arrays y eventos' },
    { url: 'https://jsbin.com/bupoqeb/edit?js,console,output', name: 'Mario' },
    { url: 'https://jsbin.com/jofisud/edit?js,console,output', name: 'ES6' }
];

let ul = document.querySelector('ul');
exercises.forEach((ex, i) => {
    let li = document.createElement('li');
    let a = document.createElement('a');

    a.href = ex.url;
    a.target = '_blank';
    a.innerHTML = `${i + 1} - ${ex.name}`;

    li.appendChild(a);
    ul.appendChild(li);
});
