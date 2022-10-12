const presence = new Presence({
	clientId: "1021419806706114610",
});

const browseTimestamp = Date.now();

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "logo",
		startTimestamp: browseTimestamp,
	};

	const pathname = window.location.pathname;
	const prive = await presence.getSetting<boolean>("privacy");
	if (pathname.startsWith("/c/")) {
		// Categories
		const categoryTitle =
			document.getElementsByClassName("page-title")[0].textContent;
		presenceData.details = "Βλέπει κατηγορία";
		presenceData.state = prive ? "" : categoryTitle;
	} else if (pathname.startsWith("/s/")) {
		// Product
		const productName =
			document.getElementsByClassName("page-title")[0].textContent;
		presenceData.details = "Βλέπει προϊόν";
		presenceData.largeImageKey = prive
			? "logo"
			: document.querySelector<HTMLAnchorElement>("#sku-details .image a").href;
		presenceData.state = prive ? "" : productName;
		presenceData.buttons = [
			{ label: "Δες το!", url: window.location.href },
		];
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
