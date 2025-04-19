// This is where your JS goes!

fetch('https://cs571api.cs.wisc.edu/rest/s25/ice/chili', {
    headers: {
        "X-CS571-ID": "bid_6e9da2cd80dee1edd307865a3265f91ca2548e76c36eaa8c22321a4fa261fe68" // You may hardcode your Badger ID instead.
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

    console.log("The following are the 5-star reviews...");
    console.log(data.reviews.filter(rev => rev.rating === 5));

    console.log("The following are the main points...");
    console.log(data.recipe.map(inst => inst.split(":")[0]))

    console.log("The following are the ingredients...");
    const ingrs = data.ingredients;
    console.log(Object.keys(ingrs).map(ingr => ingrs[ingr].amount + (ingrs[ingr].unit ?? "") + " " + ingr));

    console.log("Is there some instruction to bake?");
    console.log(data.recipe.some(instr => instr.toLowerCase().includes("bake")));

    console.log("Is every review 4 or 5 stars?");
    console.log(data.reviews.every(r => r.rating === 4 || r.rating === 5));

    console.log("What is the average review rating?");
    console.log(data.reviews.reduce((acc, curr) => acc + curr.rating, 0) / data.reviews.length);

    console.log("What are the unique units of ingredients?")
    console.log(Object.keys(data.ingredients).reduce((prev, curr) => {
        const ingrInfo = data.ingredients[curr];
        const unit = ingrInfo.unit;
        if(unit && !prev.includes(unit)) {
            prev.push(unit);
        }
        return prev;
    }, []));
})
.catch(err => {
    alert("Uh oh! Something went wrong. Are you logged in with your Badger ID?")
})
