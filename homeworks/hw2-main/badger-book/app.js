fetch("https://cs571api.cs.wisc.edu/rest/s25/hw2/students", {
	headers: {
		"X-CS571-ID": CS571.getBadgerId()
	}
})
	.then(res => res.json())
	.then(data => {
		stuInfo = data;
		console.log(data[0].name)
		console.log(data.length)
		console.log(typeof data)
		document.getElementById("num-results").innerText = data.length;
		buildStudents(data)
	})

function buildStudents(studs) {
	// TODO This function is just a suggestion! I would suggest calling it after
	//      fetching the data or performing a search. It should populate the
	//      index.html with student data by using createElement and appendChild.
	const studentNode = document.getElementById("students");
	studentNode.innerHTML = "";
	for (let i = 0; i < studs.length; i++) {
		const students = document.createElement("div")
		students.className = "col-12 col-md-6 col-lg-4 col-xl-3 mb-4";
		students.classList.add("student-card");
		const studentName = document.createElement("h2");
		studentName.innerText = studs[i].name.first + " " + studs[i].name.last;
		students.appendChild(studentName)

		const studentMajor = document.createElement("strong");
		studentMajor.innerText = studs[i].major;
		students.appendChild(studentMajor);

		const studentCredits = document.createElement("p");
		studentCredits.innerText = `${studs[i].name.first} is taking ${studs[i].numCredits} credits`;
		if (studs[i].fromWisconsin) {
			studentCredits.innerText += " and is from Wisconsin. "
		}
		students.appendChild(studentCredits);

		const studentInterests = document.createElement("p");
		studentInterests.innerText = `They have ${studs[i].interests.length} including...`;
		students.appendChild(studentInterests);
		const ul = document.createElement("ul")
		const numInterests = studs[i].interests.length;
		for (let j = 0; j < numInterests; j++) {
			const li = document.createElement("li");
			const a = document.createElement("a");
			a.href = "#";
			a.innerText = studs[i].interests[j];
			a.style.textDecoration = "none";
			a.style.color = "black";
			a.addEventListener("click", (e) => {
				const selectedText = e.target.innerText;
				document.getElementById("search-name").value = "";
				document.getElementById("search-major").value = "";
				document.getElementById("search-interest").value = selectedText;
				handleSearch()
			})
			li.appendChild(a)
			ul.appendChild(li);
		}
		students.appendChild(ul);
		studentNode.appendChild(students);
	}
}

function handleSearch(e) {
	e?.preventDefault(); // You can ignore this; prevents the default form submission!

	// TODO Implement the search
	const inputName = document.getElementById("search-name").value.toLowerCase();
	const inputMajor = document.getElementById("search-major").value.toLowerCase();
	const inputInterest = document.getElementById("search-interest").value.toLowerCase();
	const num = stuInfo.length
	let numRes = 0;
	let res = []
	for (let i = 0; i < num; i++) {
		const name = (stuInfo[i].name.first + stuInfo[i].name.last).toLowerCase();
		const major = stuInfo[i].major.toLowerCase();
		const interest = stuInfo[i].interests;
		let flag = false;
		for (let j = 0; j < interest.length; j++) {
			if (interest[j].includes(inputInterest)) {
				flag = true
			}
		}
		if (name.includes(inputName) && major.includes(inputMajor) && flag) {
			res.push(stuInfo[i])
			numRes++;
		}
	}
	console.log(res)
	document.getElementById("num-results").innerText = numRes;
	buildStudents(res)
}

document.getElementById("search-btn").addEventListener("click", handleSearch);

