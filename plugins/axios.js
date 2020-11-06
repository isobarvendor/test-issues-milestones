/** rewrite axios interceptors  from @/Shared/api/providers
 *  this should be a shared Module
 *
 */

export default function({$axios,redirect,app}) {

    $axios.onResponse(response => {
        return Promise.resolve(response);
    })

}
