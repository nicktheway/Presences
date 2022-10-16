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
	} else if (pathname.startsWith("/cart")) {
		presenceData.details = "Βλέπει το Καλάθι";
		if (!prive && document.querySelectorAll(".line-item").length) {
			let itemsCount = document.querySelectorAll(".line-item").length;
			let total = document.querySelector("strong[data-e2e-testid='cart-total-cost']").textContent;

			if (itemsCount) {
				presenceData.state = `${itemsCount} ${itemsCount > 1 ? "προϊόντα" : "προϊόν"} (${total})`;
			}
		}
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
