let interval;
let urlUser = "";
let smileID = 5;
const intervalCb = () => {
	checkPage(window.location.pathname);
};

const checkPage = (location) => {
	if (location === "/im") {
		checkMessages();
	}
};

function afterWindowLoaded() {
	const message_wrapper = document.getElementById("_im_peer_history");

	interval = setInterval(intervalCb, 1000);

	if (message_wrapper) {
		checkPage(window.location.pathname);
	}
}

const checkMessages = () => {
	const getMessages = document.querySelectorAll(".im-mess-stack");

	if (getMessages) {
		const getUserMessage = [];
		getMessages.forEach((elem) => {
			const hrefMessage = elem.querySelector(".im-mess-stack--lnk");
			if (hrefMessage.href === urlUser) {
				getUserMessage.push(elem);
			}
		});
		if (getUserMessage.length > 0) {
			setPoop(getUserMessage);
		}
	}
};

const setPoop = (masMessage) => {
	masMessage.forEach((elem) => {
		const messages = elem.querySelectorAll(".im-mess");
		messages.forEach((message) => {
			const selectedMessageReaction = message.querySelector(".MessageReactions--selected");

			let select = false;

			if (selectedMessageReaction) {
				const selectedMessageReactionID = selectedMessageReaction.dataset.id;
				if (selectedMessageReactionID == smileID) {
					select = true;
				}
			}
			if (select) {
				return;
			}

			const action = message.querySelector(".im-mess--reaction");
			if (!action) {
				return;
			}
			action.click();
			const smileAction = message.querySelectorAll("._im_reactions_panel_item");

			smileAction.forEach((elem) => {
				const elemID = elem.dataset.id;

				if (elemID == smileID) {
					elem.click();
				}
			});
		});
	});
};

document.getElementById("buttonOK").addEventListener("click", () => {
	console.log("run");
});

if (document.readyState !== "complete") {
	window.addEventListener("load", afterWindowLoaded);
} else {
	afterWindowLoaded();
}
