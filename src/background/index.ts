import axios from 'axios';
import fetchAdapter from '@vespaiach/axios-fetch-adapter';

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request && request.query) {
            const twitterQueryRequest = `https://api.twitter.com/2/tweets/search/recent?query=${encodeURIComponent(request.query)}`;

            axios.get(twitterQueryRequest,
                {
                    headers: { 
                        Authorization: "Bearer <This is just for giggles... so I didn't really care too much about security. Put your own token here at your own risk.>"
                    },
                    adapter: fetchAdapter
                }
                )
                .then(
                    function (response) {
                        sendResponse(response);
                    });
            
            return true;
        }

        return false;
    }
)


