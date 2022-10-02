import { addTestsToLocalStorage, findIdInTestSchemas, getSchemasToLocalStorage, parseRequestUrl, rerender } from "../utils.js";

let testScore = getSchemasToLocalStorage();
if (!testScore) {
    testScore = []
}

function findTestSchema() {
    const request = parseRequestUrl();
    const testSchema = findIdInTestSchemas(request.id);

    return testSchema;
}
function getTable(testSchema) {
    // const tableEle = document.getElementById("test-table");
    // tableEle.insertRow(1);
    let totalMarks = 0;
    let html = ''
    // html += `<caption class="table-caption">${testSchema.name}</caption>`
    // html += `<tr>`
    html += `<td>Test Time</td>`
    html += `<td>Test Number</td>`
    Object.values(testSchema.subjects).forEach((subjectDetails) => {
        html += `<td>${subjectDetails.subjectName}(${subjectDetails.subjectMarks})</td>`
        totalMarks += parseInt(subjectDetails.subjectMarks);
    });
    html += `<td>Total Marks(${totalMarks}</td>`;
    for (let i = 0; i < testScore.length; i++) {
        html += `<tr>`;
        const tScore = testScore[i];
        html += `<td>${tScore.time}</td>`;
        html += `<td>${tScore.id}</td>`;
        for (let j = 0; j < tScore.subjects.length; j++) {
            const tSubject = tScore.subjects[j];
            html += `<td>${tSubject.subjectMarks}</td>`;
        }
        html += `<td>${tScore.totalMarks}</td>`;
        html += `</tr>`
    }

    return html
}

function saveNewTest(props) {
    const testSchmea = findTestSchema();
    let subjects = [];
    let totalMarks = 0;
    for (let i = 0; i < testSchmea.subjects.length; i++) {
        const subject = testSchmea.subjects[i];
        const marks = parseInt(document.getElementById(subject.subjectName).value);
        let subjectMarkDetail = {
            subjectName: subject.subjectName,
            subjectMarks: marks
        }
        totalMarks += marks;
        subjects.push(subjectMarkDetail);
    }
    let newTest = {
        id: testScore.length + 1,
        time: new Date().toLocaleString(),
        subjects: subjects,
        totalMarks: totalMarks
    }
    testScore.push(newTest);
    addTestsToLocalStorage(testScore);
    rerender(TestScreen);
}

function inputNewTestDetails(testSchema) {
    let subjectsDiv = document.createElement("div");
    subjectsDiv.setAttribute("class", "add-test-details");
    subjectsDiv.id = "test-add-details";
    subjectsDiv.appendChild(document.createElement("br"));
    for (let i = 0; i < testSchema.subjects.length; i++) {
        const subject = testSchema.subjects[i];
        const subjectDiv = document.createElement("div");

        const subjectNameDiv = document.createElement("div");
        subjectNameDiv.textContent = subject.subjectName;
        subjectDiv.appendChild(subjectNameDiv);
        const subjectDataDiv = document.createElement("div")
        let data = document.createElement("input");
        data.id = `${testSchema.subjects[i].subjectName}`
        data.type = "number";
        data.min = 0;
        data.max = subject.subjectsMarks;
        data.setAttribute("placeholder", `${testSchema.subjects[i].subjectName} Marks`);
        data.setAttribute("class", "test-subject-details");
        subjectDataDiv.appendChild(data);
        subjectDiv.appendChild(subjectDataDiv);
        subjectsDiv.appendChild(subjectDiv);
    }
    let submitScehmaDetailsButton = document.createElement("button");
    submitScehmaDetailsButton.id = "test-submit-details";
    submitScehmaDetailsButton.textContent = "Submit Details";
    subjectsDiv.appendChild(submitScehmaDetailsButton)
    document.getElementById("add-more-test-button").after(subjectsDiv);
    submitScehmaDetailsButton.addEventListener('click', saveNewTest, { once: true });
}

function addTestOptions() {
    const testSchema = findTestSchema();
    inputNewTestDetails(testSchema);
}

const TestScreen = {
    after_render: () => {
        const addMoreTestButton = document.getElementById("add-more-test-button");
        addMoreTestButton.addEventListener('click', addTestOptions, { once: true });
    },
    render: () => {
        const testSchema = findTestSchema();
        let totalMarks = 0;
        let tableHtml = `
            <h1>${testSchema.name}</h1>
                <button id = "add-more-test-button"> Add Test </button>
                <div id ="test-table-table-div">
                    <table id="test-table-table">
                        <caption class="test-table-caption">${testSchema.name}</caption>
                            ${getTable(testSchema)}
                        </table>
                </div>
        `
        return tableHtml;
    }

}

export default TestScreen;