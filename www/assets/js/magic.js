let clickCount = 0;

document.addEventListener("DOMContentLoaded", function() {
	const snailcat = document.getElementById("navigating-snailcat");

	function handleClick() {
		clickCount++;

		if (clickCount === 3) {
			console.log("niuuummmmmmmmm!!!");
			snailcat.style.animation = "spin 0.3s linear infinite";
			alert("Hail To The Snailcat!");
			setTimeout(() => {
				window.location.href = "/snailcats-lair/basement.html";
			}, 3000);
		}
	}

	// Add a click event listener to the snailcat image
	snailcat.addEventListener("click", handleClick);
});