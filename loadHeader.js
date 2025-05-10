function loadProjectHeader(date,title,description,colour) {
    document.getElementById('project-date').innerHTML = date;
    document.getElementById('project-title').innerHTML = title;
    document.getElementById('project-description').innerHTML = description;
    document.getElementById('project-header').style.backgroundColor = colour;
}