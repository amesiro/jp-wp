import $ from "jquery";

class Search {
	// 1. describe and create/initiate our object
	constructor() {
		this.addSearchHTML();
		this.resultsDiv = $("#search-overlay__results");
		this.openButton = $(".js-search-trigger");
		this.closeButton = $(".search-overlay__close");
		this.searchOverlay = $(".search-overlay");
		this.searchField = $("#search-term");
		this.events();
		this.isOverlayOpen = false;
		this.isSpinnerVisible = false;
		this.previousValue;
		this.typingTimer;
	}

	// 2. events
	events() {
		this.openButton.on("click", this.openOverlay.bind(this));
		this.closeButton.on("click", this.closeOverlay.bind(this));
		$(document).on("keydown", this.keyPressDispatcher.bind(this));
		this.searchField.on("keyup", this.typingLogic.bind(this));
	}

	// 3. methods (function, action...)
	openOverlay() {
		this.searchOverlay.addClass("search-overlay--active");
		$("body").addClass("body-no-scroll");
		this.searchField.val("");
		setTimeout(() => {
			this.searchField[0].focus();
		}, 301);
		this.isOverlayOpen = true;
	}

	closeOverlay() {
		this.searchOverlay.removeClass("search-overlay--active");
		$("body").removeClass("body-no-scroll");
		this.isOverlayOpen = false;
	}

	keyPressDispatcher(e) {
		if (
			e.keyCode == 83 &&
			!this.isOverlayOpen &&
			!$("input, textarea").is(":focus")
		) {
			this.openOverlay();
		}

		if (e.keyCode == 27 && this.isOverlayOpen) {
			this.closeOverlay();
		}
	}

	typingLogic() {
		if (this.searchField.val() != this.previousValue) {
			clearTimeout(this.typingTimer);
			if (this.searchField.val()) {
				if (!this.isSpinnerVisible) {
					this.resultsDiv.html('<div class="spinner-loader"></div>');
					this.isSpinnerVisible = true;
				}
				this.typingTimer = setTimeout(this.getResults.bind(this), 750);
			} else {
				this.resultsDiv.html("");
				this.isSpinnerVisible = false;
			}
		}
		this.previousValue = this.searchField.val();
	}

	getResults() {
        $.getJSON(`${universityData.root_url}/wp-json/university/v1/search?term=${this.searchField.val()}`, (results) => {
            this.resultsDiv.html(`
                <div class="row">
                    <div class="one-third">
                        <h2 class="search-overlay__section-title">General Information</h2>
                        ${results.generalInfo.length ? '<ul class="link-list min-list">' : "<p>No general information matches that search."}
                            ${results.generalInfo.map((item) => `<li><a href="${item.permalink}">${item.title}</a>${item.postType == 'post' ? ` by ${item.authorName}` : ''}</li>`).join("")}
                        ${results.generalInfo.length ? "</ul>" : "</p>"}
                    </div>
                    <div class="one-third">
                        <h2 class="search-overlay__section-title">Programs</h2>
                        ${results.programs.length ? '<ul class="link-list min-list">' : `<p>No programs match that search. <a href="${universityData.root_url}/programs">View all programs</a>`}
                            ${results.programs.map((item) => `<li><a href="${item.permalink}">${item.title}</a></li>`).join("")}
                        ${results.programs.length ? "</ul>" : "</p>"}

                        <h2 class="search-overlay__section-title">Professors</h2>
                        ${results.professors.length ? '<ul class="professor-cards">' : `<p>No professors match that search.`}
                            ${results.professors.map((item) => `
                                <li class="professor-card__list-item">
                                    <a class="professor-card" href="${item.permalink}">
                                        <img class="professor-card__image" src="${item.image}" alt="">
                                        <span class="professor-card__name">${item.title}</span>
                                    </a>
                                </li>
                            `).join("")}
                        ${results.professors.length ? "</ul>" : "</p>"}
                    </div>
                    <div class="one-third">
                        <h2 class="search-overlay__section-title">Campuses</h2>
                        ${results.campuses.length ? '<ul class="link-list min-list">' : `<p>No general campuses match that search. <a href="${universityData.root_url}/campuses">View all campuses</a>`}
                            ${results.campuses.map((item) => `<li><a href="${item.permalink}">${item.title}</a></li>`).join("")}
                        ${results.campuses.length ? "</ul>" : "</p>"}

                        <h2 class="search-overlay__section-title">Events</h2>
                        ${results.events.length ? '' : `<p>No general events match that search. <a href="${universityData.root_url}/events">View all campuses</a>`}
                            ${results.events.map((item) => `
                            <div class="event-summary">
                                <a class="event-summary__date t-center" href="${item.permalink}">
                                    <span class="event-summary__month">${item.month}</span>
                                    <span class="event-summary__day">${item.day}</span>
                                </a>
                                <div class="event-summary__content">
                                    <h5 class="event-summary__title headline headline--tiny">
                                        <a href="${item.permalink}">${item.title}</a>
                                    </h5>
                                    <p>${item.description}<a href="${item.permalink}" class="nu gray">Learn more</a>
                                    </p>
                                </div>
                            </div>
                            `).join("")}
                        
                    </div>
                </div>
            `);
            this.isSpinnerVisible = false;
        })

        // 已經新開API了 這個可以保留做參考
        // $.when(
        //     $.getJSON(`${universityData.root_url}/wp-json/wp/v2/posts?search=${this.searchField.val()}`),
        //     $.getJSON(`${universityData.root_url}/wp-json/wp/v2/pages?search=${this.searchField.val()}`)
        // ).then((posts, pages) => {
        //     var combinedResults = posts[0].concat(pages[0]);
		// 	this.resultsDiv.html(`
        //         <h2 class="search-overlay__section-title">General Information</h2>
        //         ${combinedResults.length ? '<ul class="link-list min-list">' : "<p>No general information matches that search."}
        //             ${combinedResults.map((item) => `<li><a href="${item.link}">${item.title.rendered}</a>${item.authorName ? ` by ${item.authorName}` : ''}</li>`).join("")}
        //         ${combinedResults.length ? "</ul>" : "</p>"}
        //     `);
		// 	this.isSpinnerVisible = false;
        // }, () => {
        //     this.resultsDiv.html('<p>Unexpected error; please try again.</p>')
        // });
	}

	addSearchHTML() {
		$("body").append(`
            <div class="search-overlay">
                <div class="search-overlay__top">
                    <div class="container">
                        <i class="fa fa-search search-overlay__icon" aria-hidden="true"></i>
                        <input type="text" autocomplete="off" class="search-term" placeholder="What are you looking for???" id="search-term">
                        <i class="fa fa-window-close search-overlay__close" aria-hidden="true"></i>
                    </div>
                </div>

                <div class="container">
                    <div id="search-overlay__results"></div>
                </div>
            </div>
        `);
	}
}

export default Search;