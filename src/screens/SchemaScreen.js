import { Schemas } from "../schema.js";
import { addSchemasToLocalStorage, getSchemasToLocalStorage, rerender } from "../utils.js";

let testSchemas = getSchemasToLocalStorage();
if (!testSchemas) {
    testSchemas = []
}

function getTable(testSchemas) {
    let html = ''
    for (let index = 0; index < testSchemas.length; index++) {
        const testSchema = testSchemas[index];
        html += `<table class="schema-table">`
        html += `<caption class="table-caption"> <a href="/#/tests/${testSchema.id}"}> ${testSchema.name}</a></caption>`
        html += `<tr>`
        html += `<td>Subject Name</td>`
        Object.values(testSchema.subjects).forEach((subjectDetails) => {
            html += `<td>${subjectDetails.subjectName}</td>`
        });
        html += `<td>Total Marks</td>`
        html += `</tr>`
        html += `<tr>`
        html += `<td>Marks</td>`
        let totalMarks = 0;
        Object.values(testSchema.subjects).forEach((subjectDetails) => {
            html += `<td>${subjectDetails.subjectMarks}</td>`
            totalMarks += parseInt(subjectDetails.subjectMarks);
        });
        html += `<td>${totalMarks}</td>`
        html += `</tr>`
        html += `</table>`
    }
    return html
}

function addNewSchemaDetails() {
    let number = document.getElementById("no-of-subject-el").value;
    let Subjects = [];
    for (let i = 0; i < number; i++) {
        const subjectDetails = {
            subjectName: document.getElementById(`subject-name-${i}`).value,
            subjectMarks: document.getElementById(`subject-marks-${i}`).value,
        }
        Subjects.push(subjectDetails);
    }
    let newTestSchema = {
        id: testSchemas.length + 1,
        name: document.getElementById("new-test-schema-name").value,
        subjects: Subjects
    }
    testSchemas.push(newTestSchema);
    addSchemasToLocalStorage(testSchemas);
    rerender(SchemaScreen);
}

function inputNewSchemaDetails() {
    let number = document.getElementById("no-of-subject-el").value;
    let subjectsDiv = document.createElement("div");
    subjectsDiv.id = "schema-add-details";
    subjectsDiv.appendChild(document.createElement("br"));
    for (let i = 0; i < number; i++) {
        let subjectDiv = document.createElement("div");
        subjectDiv.appendChild(document.createTextNode("Subject " + (i + 1)));

        subjectDiv.id = `subject-div-${i}`;

        let subjectName = document.createElement("input");
        subjectName.id = `subject-name-${i}`
        subjectName.type = "text";
        subjectName.name = "name";
        subjectName.setAttribute("placeholder", "Enter Subject Name");

        let subjectMarks = document.createElement("input");
        subjectMarks.id = `subject-marks-${i}`
        subjectMarks.type = "number";
        subjectMarks.min = 1
        subjectMarks.name = "marks";
        subjectMarks.setAttribute("placeholder", "Enter Subject Max Marks");

        subjectDiv.appendChild(subjectName);
        subjectDiv.appendChild(subjectMarks);

        subjectDiv.appendChild(document.createElement("br"));
        subjectsDiv.appendChild(subjectDiv);
    }
    let submitScehmaDetailsButton = document.createElement("button");
    submitScehmaDetailsButton.id = "schema-submit-button";
    submitScehmaDetailsButton.textContent = "Submit Details";
    subjectsDiv.appendChild(submitScehmaDetailsButton)
    document.getElementById("submit-add-schema").after(subjectsDiv);
    submitScehmaDetailsButton.addEventListener('click', addNewSchemaDetails);
}

function addNewSchema() {
    const schmeaAddButton = document.getElementById("schema-add");

    let scemhaDiv = document.createElement("div");
    scemhaDiv.id = "schema-add-meta"
    // Create an input element for test schema name
    let Name = document.createElement("input");
    Name.setAttribute("type", "text");
    Name.setAttribute("name", "Test Name");
    Name.setAttribute("placeholder", "Test Name");
    Name.id = "new-test-schema-name";

    // Create an input element for test schema subjects
    let Subjects = document.createElement("input");
    Subjects.setAttribute("type", "number");
    Subjects.setAttribute("min", 1);
    Subjects.setAttribute("name", "Total No of Subjects");
    Subjects.setAttribute("placeholder", "Total No of Subjects");
    Subjects.id = "no-of-subject-el"

    // Create a submit button
    let s = document.createElement("button");
    s.id = "submit-add-schema"
    s.textContent = "Add Schema";
    s.addEventListener('click', inputNewSchemaDetails)

    scemhaDiv.append(Name);

    scemhaDiv.append(Subjects);

    scemhaDiv.append(s);
    schmeaAddButton.after(scemhaDiv)
}

const SchemaScreen = {
    after_render: () => {
        const schmeaAddButton = document.getElementById("schema-add");
        schmeaAddButton.addEventListener('click', addNewSchema, { once: true });
    },
    render: () => {
        return `
        <div>
            <div>
                <button id="schema-add"> Add New Schema</button>
            </div>
            <div>
                <div id="availabe-schema"> 
                    Availabe Schema
                </div>
                <div class="table">
                    ${getTable(testSchemas)}
                </div>
            </div>
        </div>
        `;
    },

}
export default SchemaScreen;