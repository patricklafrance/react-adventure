// summary:
//         Tagged template literals that create a dynamic string template.
// description:
//         For more informations view https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals.
// returns:
//         A function that accept the dynamic values and return the formatted string.
// usage:
//         const dynamicTemplate = `Hello ${0}!`;
//         console.log(dynamicTemplate("John")); -> // Hello John!
export function template(strings, ...keys) {
    return function(...values) {
        const result = [strings[0]];

        keys.forEach((key, i) => {
            result.push(values[key], strings[i + 1]);
        });

        return result.join("");
    };
}
