/**
 * A utility function to make a network api call
 *
 * @param {string} apiUrl
 * @return {Promise<Object>}
 */
export function request(apiUrl) {
    return fetch(apiUrl);
}
