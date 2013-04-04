/**
 * Created with IntelliJ IDEA.
 * User: wjshea
 * Date: 4/4/13
 * Time: 1:40 PM
 * To change this template use File | Settings | File Templates.
 */
function is_empty(obj) {

    // null and undefined are empty
    if (obj == null) return true;
    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length && obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    for (var key in obj) {
        if (hasOwnProperty.call(obj, key))    return false;
    }

    return true;
}