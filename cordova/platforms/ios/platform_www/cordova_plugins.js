cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-powermanagement/www/powermanagement.js",
        "id": "cordova-plugin-powermanagement.powermanagement",
        "pluginId": "cordova-plugin-powermanagement",
        "clobbers": [
            "window.powermanagement"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.2.1",
    "cordova-plugin-powermanagement": "1.0.1"
}
// BOTTOM OF METADATA
});