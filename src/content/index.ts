import axios from "axios";
import fetchAdapter from '@vespaiach/axios-fetch-adapter';


(() => {

    var isUpdated = false;
    function updateNewsSection() {
        chrome.runtime.sendMessage({query: `from:RuneScape maintenance` }, function(response) {
            if (response?.data?.data) {
                const recentTweet = response?.data.data[0];
                const articleList = document.getElementById("newsSection");
    
                if (articleList && !isUpdated) {
                    const articleHtml = 
                    `
                    <article>
                    <figure>
                    <a href="https://twitter.com/RuneScape/status/${recentTweet.id}">
                        <img alt="Maintenance Plugin" title="Server Maintenance" src="https://cdn.runescape.com/assets/img/external/news/2022/03/PatchNoteThumb.jpg"/>
                    </a>
                    </figure>
                    <div class="copy">
                        <a href="https://twitter.com/RuneScape/status/${recentTweet.id}"><h4>${recentTweet.text}</h4></a>
                    </div>
                    </article>
                    `;
                
                    articleList.insertAdjacentHTML("afterbegin", articleHtml);
                    isUpdated = true;
                }
                else {
                    console.log(`Did not find articleList ${articleList}`);
                }
            }
        });
    }

    window.addEventListener('load', updateNewsSection);
})();

