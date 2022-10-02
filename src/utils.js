
export const addSchemasToLocalStorage = (testSchemas) => {
    localStorage.setItem("testSchemas", JSON.stringify(testSchemas));
}

export const getSchemasToLocalStorage = () => {
    let testSchemas = JSON.parse(localStorage.getItem("testSchemas"));
    return testSchemas;
}

export const addTestsToLocalStorage = (testSchemas) => {
    localStorage.setItem("tests", JSON.stringify(testSchemas));
}

export const getTestToLocalStorage = () => {
    let testSchemas = JSON.parse(localStorage.getItem("tests"));
    return testSchemas;
}


export const parseRequestUrl = () => {
    const url = document.location.hash.toLowerCase();
    const request = url.split('/');
    return {
        resource: request[1],
        id: request[2],
        action: request[3],
    };
};

export const rerender = (component) => {
    document.getElementById(
        'main-container'
    ).innerHTML = component.render();
    component.after_render();
};


export const findIdInTestSchemas = (id) => {
    const testSchemas = getSchemasToLocalStorage();
    let testSchema = {};
    testSchemas.forEach(element => {
        if (String(element.id) === id) {
            testSchema = element;
            return testSchema;
        }
    });
    return testSchema;
}