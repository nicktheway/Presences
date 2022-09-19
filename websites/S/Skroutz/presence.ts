const presence = new Presence({
	clientId: "1021419806706114610",
});

const browseTimestamp = Date.now();

presence.on("UpdateData", async () => {
	/*UpdateData is always firing, and therefore should be used as your refresh cycle, or `tick`. This is called several times a second where possible.

    It is recommended to set up another function outside of this event function which will change variable values and do the heavy lifting if you call data from an API.*/

	const presenceData: PresenceData = {
		//The large image on the presence. This can be a key of an image uploaded on the Discord Developer Portal - Rich Presence - Art Assets, or a URL to an image
		largeImageKey: "logo",
		//The small image on the presence. This can be a key of an image uploaded on the Discord Developer Portal - Rich Presence - Art Assets, or a URL to an image
		//smallImageKey: "https://mycrazywebsite.com/coolImage.png",
		//The text which is displayed when hovering over the small image
		//smallImageText: "Some hover text",
		//The upper section of the presence text
		//details: "Browsing Page Name",
		//The lower section of the presence text
		state: "Reading section A",
		//The unix epoch timestamp for when to start counting from
		startTimestamp: browseTimestamp,
		//If you want to show Time Left instead of Elapsed, this is the unix epoch timestamp at which the timer ends
		//endTimestamp: 3133700400000,
		//Optionally you can set a largeImageKey here and change the rest as variable subproperties, for example presenceData.type = "blahblah"; type examples: details, state, etc.
	};

	const pathname = window.location.pathname;
	const prive = await presence.getSetting<boolean>("privacy");
	if (pathname.startsWith("/c/")) {
		// Categories
		const categoryTitle =
			document.getElementsByClassName("page-title")[0].textContent;
		presenceData.details = "Βλέπει κατηγορία";
		presenceData.state = prive ? "HAHA" : categoryTitle;
	} else if (pathname.startsWith("/s/")) {
		// Product
		const productName =
			document.getElementsByClassName("page-title")[0].textContent;
		presenceData.details = "Βλέπει προϊόν";
		presenceData.largeImageKey = prive
			? "logo"
			: document.querySelector<HTMLAnchorElement>("#sku-details .image a").href;
		presenceData.state = prive ? "HAHA" : productName;
		presenceData.buttons = [
			{ label: "Δες το!", url: window.location.href },
		];
	}
	//Update the presence with all the values from the presenceData object
	if (presenceData.details) presence.setActivity(presenceData);
	//Update the presence with no data, therefore clearing it and making the large image the Discord Application icon, and the text the Discord Application name
	else presence.setActivity();
});
