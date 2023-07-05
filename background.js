const button = document.getElementById("buttonOK");
const clearButton = document.getElementById("clear");
const carousel = document.getElementById("carousel");
button.addEventListener("click", async () => {
	const hrefUser = document.getElementById("userId").value;
	const smileID = document.getElementById("smileSpam").value;
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, { hrefUser: hrefUser, smileID: smileID }, function (response) {
			console.log(response);
		});
	});
});
clearButton.addEventListener("click", async () => {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, { status: "clear" }, function (response) {
			console.log(response);
		});
	});
});
carousel.addEventListener("click", async () => {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, { action: "carousel" }, function (response) {
			console.log(response);
		});
	});
});
