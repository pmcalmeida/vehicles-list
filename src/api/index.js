import { request } from './helpers';

/**
 * Pull vehicles information
 *
 * @return {Promise<Array.<vehicleSummaryPayload>>}
 */
export default function getData(url) {
    return request(url).then((result) => {
        if (result.status === 200) {
            return result.json();
        }
        throw new Error(result.statusText);
    });
}
