// This is where your JS goes!

fetch('https://cs571api.cs.wisc.edu/rest/s25/ice/chili', {
    headers: {
        "X-CS571-ID": bid_f33917fdb8555977e6256d91feaf5c069fe9f6e5c945336aec5acc5db565134c // You may hardcode your Badger ID instead.
    }
})
.then(res => {
    console.log(res.status, res.statusText);
    if(res.status === 200) {
        return res.json();
    } else {
        throw new Error();
    }
})
.then(data => {
    console.log(data);
})
.catch(err => {
    alert("Uh oh! Something went wrong. Are you logged in with your Badger ID?")
})