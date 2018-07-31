//获取当前访问地址
let getLocation = function() {
    let location_href,
        target_href = 'https://www.2100pool.com';
    
    if(window.location.href.indexOf('/#') > 0) {
        location_href = window.location.href.split('/#')[0];
        if(target_href == location_href) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

export default {
    getLocation
}