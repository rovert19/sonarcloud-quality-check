import * as core from "@actions/core";

async function fetchProjectStatus(
    url, 
    projectKey,
    branch, 
    token
) {
    const params = new URLSearchParams({
        projectKey,
        branch
    }).toString();
    const request = new Request(`${url}?${params}`)
    
    const headers = new Headers()
    headers.append('Authorization', `Bearer ${token}`)

    const result = await fetch(request, headers)
        .then(resp => resp.json());
    
    return result;
}

function get_violated_conditions(result) {
    const violated_conditions = [];
    const conditions = result["conditions"]
    for (let condition in conditions) {
        if (condition["status"] == "ERROR") {
            violated_conditions.append(condition["metricKey"]);
        }
    }
    return violated_conditions;
}

(async () => {
    try {
        const url = 'https://sonarcloud.io/api/qualitygates/project_status';
        const projectKey = core.getInput("sonar-project-key");
        const token = core.getInput("sonar-token");
        const branch = core.getInput("branch");
    
        const result = await fetchProjectStatus(
            url, 
            projectKey,
            branch,
            token
        );

        const violated_conditions = get_violated_conditions(result);

        core.setOutput("project-status", result.projectStatus.status);
        
        let resultMessage = `Fallo en la validación de código. No cumple las siguientes condiciones: ${violated_conditions.join(',')}`;
        if (result.projectStatus.status === "ERROR") {
            console.error(resultMessage);
            core.setFailed(resultMessage);
        } 
    } catch(error) {
        console.error("Unexpected error")
        core.setFailed("Unexpected error");
    }
}) ()
