/**
 * main.js
 *
 * main loaded module
 *
 * Created by mor on 15/05/16.
 */

// requirejs configuration
requirejs.config({
    paths: {
        'jquery'			:	'vendor/jquery/dist/jquery.min',
        'snap'			    :	'vendor/Snap.svg/dist/snap.svg-min'
    },
    shim: {}
});

requirejs([
    'app',
    'snap',
], function(App){
    App.initialize();
});