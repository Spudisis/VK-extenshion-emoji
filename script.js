let interval;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	console.log(request);
	const { hrefUser = "", smileID = 5, status, action } = request;
	if (interval) {
		clearInterval(interval);
	}
	console.log('click')
	if (status === "clear") {
		return;
	}
	const intervalCb = () => {
		checkPage(window.location.pathname);
	};

	const getLastMessage = () => {
		const getMessages = document.querySelectorAll(".im-mess-stack");
		const last = getMessages[getMessages.length - 1];
		const lastMessage = last.querySelectorAll(".im-mess");
		console.log(last);
		const newCarousel = carouselFN(lastMessage[lastMessage.length - 1]);
		interval = setInterval(() => {
			newCarousel.changeCounter();
			newCarousel.setReaction();
		}, 1000);
	};
	const setSmile = (message, smile, actionFunc) => {
		if (actionFunc !== "carouser") {
			const selectedMessageReaction = message.querySelector(".MessageReactions--selected");

			let select = false;

			if (selectedMessageReaction) {
				const selectedMessageReactionID = selectedMessageReaction.dataset.id;
				if (selectedMessageReactionID == smile) {
					select = true;
				}
			}
			if (select) {
				return;
			}
		}

		const action = message.querySelector(".im-mess--reaction");
		if (!action) {
			console.log("action not found");
			return;
		}
		action.click();
		const smileAction = message.querySelectorAll("._im_reactions_panel_item");
		console.log(smileAction);
		smileAction.forEach((elem) => {
			const elemID = elem.dataset.id;

			if (elemID == smile) {
				elem.click();
			}
		});
	};
	const carouselFN = (last) => {
		let counter = 1;
		return {
			setReaction: function () {
				console.log(counter);
				setSmile(last, counter, "carousel");
			},
			changeCounter: function () {
				if (counter == 7) {
					return (counter = 1);
				}
				return counter++;
			},
		};
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
				if (hrefMessage.href === hrefUser) {
					getUserMessage.push(elem);
				}
			});
			if (getUserMessage.length > 0) {
				runForMasMessage(getUserMessage);
			}
		}
	};

	const runForMasMessage = (masMessage) => {
		masMessage.forEach((elem) => {
			const messages = elem.querySelectorAll(".im-mess");
			messages.forEach((message) => {
				setSmile(message, smileID);
			});
		});
	};

	if (action === "carousel") {
		getLastMessage();
	}
	if (action !== "carousel") {
		if (document.readyState !== "complete") {
			window.addEventListener("load", afterWindowLoaded);
		} else {
			afterWindowLoaded();
		}
	}
});
