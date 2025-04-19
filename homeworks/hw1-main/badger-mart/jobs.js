function submitApplication(e) {
    e.preventDefault(); // You can ignore this; prevents the default form submission!

    // TODO: Alert the user of the job that they applied for!
    const jobs = document.getElementsByName("job");
    let selectedJob = null;
    for (let i = 0; i < jobs.length; i++) {
        if (jobs[i].checked) {
            selectedJob = jobs[i].value;
            break;
        }
    }
    if (selectedJob) {
        alert(`Thank you for applying to be a ${selectedJob}! `)
    } else {
        alert("Please select a job! ")
    }

}