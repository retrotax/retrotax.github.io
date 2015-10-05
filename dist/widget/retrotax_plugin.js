/*
 @licstart  The following is the entire license notice for the
 JavaScript code in this page.
 Copyright (C) 2014 Center for Rights in Action
 Copyright (C) 2014 Jeff Lyon
 The JavaScript code in this page is free software: you can
 redistribute it and/or modify it under the terms of the GNU
 General Public License (GNU GPL) as published by the Free Software
 Foundation, either version 3 of the License, or (at your option)
 any later version. The code is distributed WITHOUT ANY WARRANTY;
 without even the implied warranty of MERCHANTABILITY or FITNESS
 FOR A PARTICULAR PURPOSE. See the GNU GPL for more details.
 As additional permission under GNU GPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.
 @licend  The above is the entire license notice
 for the JavaScript code in this page.
 */

(function () { // :)
    Element.prototype.remove = function () {
        this.parentElement.removeChild(this);
    }
    NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
        for (var i = 0, len = this.length; i < len; i++) {
            if (this[i] && this[i].parentElement) {
                this[i].parentElement.removeChild(this[i]);
            }
        }
    }


    /**
     --------------------------------------------------------------------------------
     CONFIGURATION OPTIONS
     --------------------------------------------------------------------------------
     These are default configuration values for the widget. You can override any of
     these by pre-defining an object named _retrotax_options and setting the appropriate
     properties as desired.
     --------------------------------------------------------------------------------
     */
    if (typeof window._retrotax_options != "undefined")
        var _retrotax_options = window._retrotax_options;

// The _retrotax_options object is created if it isn't already defined by you
    if (typeof _retrotax_options == "undefined")
        _retrotax_options = {};

    if (typeof _retrotax_options.iframe_base_path == "undefined")
        _retrotax_options.iframe_base_path = 'http://plugin-paulcommons.rhcloud.com/widget/iframe';

    if (typeof _retrotax_options.username == "undefined")
        _retrotax_options.username = false;

    if (typeof _retrotax_options.apikey == "undefined")
        _retrotax_options.apikey = false;

    if (typeof _retrotax_options.clientid == "undefined")
        _retrotax_options.clientid = false;

    if (typeof _retrotax_options.companyid == "undefined")
        _retrotax_options.companyid = false;

    if (typeof _retrotax_options.locationid == "undefined")
        _retrotax_options.locationid = false;

    if (typeof _retrotax_options.animation == "undefined")
        _retrotax_options.animation = 'modal';

    if (typeof _retrotax_options.framework == "undefined")
        _retrotax_options.framework = 'bootstrap';

// How long to delay before showing the widget
    if (typeof _retrotax_options.delay == "undefined")
        _retrotax_options.delay = 0;

// If set to true, we will log stuff to the console
    if (typeof _retrotax_options.debug == "undefined")
        _retrotax_options.debug = false;

// If set to true, we will log errors externally
//if (typeof _retrotax_options.ajax_logging == "undefined")
//	_retrotax_options.ajax_logging = false;

// If set to true, we will log errors externally
//if (typeof _retrotax_options.ajax_logging_url == "undefined")
//	_retrotax_options.ajax_logging_url = 'http://plugin_logs.retrotax.co';

// who to email logs to - always emails tech@retro so this is in addition to
//if (typeof _retrotax_options.ajax_logging_email == "undefined")
//	_retrotax_options.ajax_logging_email = false;

if (typeof _retrotax_options.prepopulate_by == "undefined")
	_retrotax_options.prepopulate_by = false; //id,name,string

if (typeof _retrotax_options.populated_fields == "undefined" || !_retrotax_options.prepopulate_by)
	_retrotax_options.populated_fields ={
		firstname:'',
		lastname:'',
		middleinitial:'',
		city:'',
		state:'',
		zip:'',
		address:'',
		address2:'',
		dob:'' //mm/dd/yyyy
	};

if (typeof _retrotax_options.plugin_type == "undefined")
	_retrotax_options.plugin_type = 'demo';

if (typeof _retrotax_options.button_text == "undefined")
	_retrotax_options.button_text = 'Open RetroTax Screening Plugin';

if (typeof _retrotax_options.button_text_error == "undefined")
	_retrotax_options.button_text_error = 'Error - Something went wrong.';

if (typeof _retrotax_options.button_class == "undefined")
	_retrotax_options.button_class = '';

if (typeof _retrotax_options.button_class_error == "undefined")
	_retrotax_options.button_class_error = '';

if (typeof _retrotax_options.logo == "undefined")
	_retrotax_options.logo = true;

if (typeof _retrotax_options.callback_url == "undefined")
	_retrotax_options.callback_url = false;

if (typeof _retrotax_options.hide_fields == "undefined")
	_retrotax_options.hide_fields = false;

if (typeof _retrotax_options.whitelist_code == "undefined")
	_retrotax_options.whitelist_code = false;

if (typeof _retrotax_options.prequal == "undefined" || !_retrotax_options.prequal)
	_retrotax_options.prequal = {
                email_to:'',
                email_cc:'',
                partner_name:'',
                partner_organization:'',
                partner_website:'',
                closing_text:'',
                intro_text:'',
                logo_url:'',
                logo_width:'',
                logo_height:'',
                retrotax_contact:'',
                ask_ssn:false
    };


_retrotax_options.w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
_retrotax_options.h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

//console.log(_retrotax_options.w);
//console.log(_retrotax_options.h);

//var elements=window.document.body.getElementsByClassName('retrotax');
//console.log(elements);

    var iframeIndex = 0;
    var iframeCount = 0;
    var _bftn_animations = {

        // MODAL ANIMATION
        modal: {

            // Default options: Override these with _retrotax_options object (see above)
            options: {
                modalAnimation: 'modal',
                fastAnimation: true
            },

            // init copies the _retrotax_options properties over the default options
            init: function (options) {
                for (var k in options) this.options[k] = options[k];
                return this;
            },
            reload: function () {
                var iframe = getElementById('_bftn_iframe');
                //console.log(iframe);
                iframe.style.display = 'none';
                //console.log(iframe);
                return this;
            },
            // what to do when the animation starts
            start: function () {
                var css = '#_bftn_iframe { position: fixed; left: 0px; top: 0px; \
				width: 100%; height: 100%; z-index: 100001; }'

                _retrotax_util.injectCSS('_bftn_iframe_css', css);

                //if(document.getElementById('_bftn_iframe') !== undefined){
                var iframe = _retrotax_util.createIframe(this.options.modalAnimation);
                //console.log(_retrotax_options.populated_fields);
                if (this.options.prepopulate_by !== false) {
                    //console.log("going into switch");
                    switch (this.options.prepopulate_by) {
                        case 'id':
                            for (var index in _retrotax_options.populated_fields) {
                                if (_retrotax_options.populated_fields.hasOwnProperty(index)) {
                                    var field = _retrotax_options.populated_fields[index];
                                    //console.log(field);
                                    //console.log((document.getElementById(field) != null )); // || document.getElementById(field) != ''
                                    if (field) _retrotax_options.populated_fields[index] = (document.getElementById(field) != null) ? document.getElementById(field).value : '';
                                }
                            }
                            break;
                        case 'name':
                            //TODO add to documentation that if its an ats then we hide CCL input fields, authorization, esign, etc and we assume CCL IDs are provided
                            for (var index in _retrotax_options.populated_fields) {
                                if (_retrotax_options.populated_fields.hasOwnProperty(index)) {
                                    var field = _retrotax_options.populated_fields[index];
                                    if (field) _retrotax_options.populated_fields[index] = (document.getElementsByName(field)[0] != 'undefined' ) ? document.getElementsByName(field)[0].value : '';
                                }
                            }
                            break;
                        default:
                        //Default to string / user-supplied e.g. server side
                    }
                }
                if (this.options.debug)console.log("_retrotax_options being passed to IFRAME: " + this.options);

                //setTimeout(function() {bftn_util.bindIframeCommunicator(iframe, this);}, 50);
                _retrotax_util.bindIframeCommunicator(iframe, this);
                //}
            },

            // what to do when the animation stops
            stop: function () {
                _retrotax_util.destroyIframe();
            }
        }


    }

    /**
     --------------------------------------------------------------------------------
     UTILITY FUNCTIONS
     --------------------------------------------------------------------------------
     */
    var urlIndex = 0;
    var _retrotax_util = {

        lastFramework: "",

        lastIframe:{},

        // Inject CSS styles into the page
        injectCSS: function (id, css) {
            var style = document.createElement('style');
            style.type = 'text/css';
            style.id = id;
            if (style.styleSheet) style.styleSheet.cssText = css;
            else style.appendChild(document.createTextNode(css));
            document.head.appendChild(style);
        },

        // Create the iframe used to display the animation
        createIframe: function (animation) {
            //console.log(window.frames[0]);
            var iframeDocument = document.getElementById('_bftn_iframe');
            if (_retrotax_util.lastFramework != _retrotax_options.framework) {
                if (iframeDocument != undefined)
                    iframeDocument.parentNode.removeChild( iframeDocument );
                _retrotax_util.lastFramework = _retrotax_options.framework;
                var iframe = document.createElement('iframe');
                iframe.id = '_bftn_iframe';
                iframe.src = _retrotax_options.iframe_base_path + '/' + _retrotax_options.framework + '.html'; //+urlIndex;
                iframe.frameBorder = 0;
                iframe.allowTransparency = true;
                iframe.style.display = 'none';
                document.body.appendChild(iframe);
                //console.log(window.frames[0]);
                return iframe;
            }
            else
                return iframeDocument;
        },

        // Destroy the iframe used to display the animation
        destroyIframe: function () {
            var iframe = document.getElementById('_bftn_iframe');
            console.log(iframe);
            //iframe.remove();
            iframe.style.display = 'none';
            //document.body.appendChild(iframe);
            var css = '#_bftn_iframe { position: fixed; left: -5000px; top: -5000px; \
				width: 100%; height: 100%; z-index: 10001; }'

            _retrotax_util.injectCSS('_bftn_iframe_css', css);
        },

        // Sends / receives event messages to the iframe (IE9+)
        // Necessary because the iframe lives on a different domain and we can't
        // just call Javascript functions to/from it due to XSS protections.
        sendMessage : function (requestType, data, iframe) {
            data || (data = {});
            data.requestType = requestType;
            data.BFTN_WIDGET_MSG = true;
            data.HOST_NAME = this.getHostname();
            console.log("SEND MESSAGE");
            console.log(iframe);
            data = JSON.stringify(data);
            iframe.contentWindow.postMessage(data, '*');
        },

        bindIframeCommunicator: function (iframe, animation) {
            this.lastIframe = iframe;
            var method = window.addEventListener ? "addEventListener" : "attachEvent";
            var eventer = window[method];
            var messageEvent = method == "attachEvent" ? "onmessage" : "message";
            if (iframe.className == "oldIframe") {
                iframe.style.display = 'block';
                _retrotax_util.sendMessage('putAnimation', animation.options, iframe);
            }
            eventer(messageEvent, function (e) {
                var data = JSON.parse(e.data);
                iframe = _retrotax_util.lastIframe;
                if (!data || !data.BFTN_IFRAME_MSG)
                    return;

                delete data.BFTN_IFRAME_MSG;

                switch (data.requestType) {
                    case 'getAnimation':
                        iframe.style.display = 'block';
                        _retrotax_util.sendMessage('putAnimation', animation.options, iframe);
                        break;
                    case 'stop':
                        iframe.className = "oldIframe";
                        animation.stop();
                        break;
                }
            }, false);
        },

        // Get the hostname of the web page. Used to track stats for leaderboards
        getHostname: function () {
            var hostname = window.location.host.replace('www.', '');
            return hostname;
        },

        // If _retrotax_options.debug is on, then console.log some stuff
        log: function () {
            if (_retrotax_options.debug)
                console.log.apply(console, arguments);
        }
    }
    /**
     --------------------------------------------------------------------------------
     MAIN FUNCTIONALITY (called once the page is ready)
     --------------------------------------------------------------------------------
     */
    var readyRetrotax = function () {
        //Throw user-friendly error if uname or apikey were not supplied
        if (!_retrotax_options.apikey || !_retrotax_options.username || _retrotax_options.apikey.length != 32 || _retrotax_options.username == '') {
            if (_retrotax_options.debug) {
                console.log("Username or API Key Provided are empty, not provided, or not equal to 32 chars (apikey)");
            }
            ;
            var errorElement = document.getElementById('retrotax_plugin_trigger');
            errorElement.setAttribute('class', _retrotax_options.button_class_error);
            errorElement.innerHTML = _retrotax_options.button_text_error;
            return false;
        }
        var animation = _bftn_animations[_retrotax_options.animation];
        setTimeout(function () {
            animation.init(_retrotax_options).start();
        }, _retrotax_options.delay);
    }

    var bindRetroTaxBtn = function () {
        var myEl = document.getElementById('retrotax_plugin');
        if (typeof(myEl) != 'undefined' && myEl != null) {
            //assume compatible but test user agent for shitty browsers
            var compatible = true;
            //Note: userAgent in FF2.0.0.13 WinXP returns: Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13
            // userAgent in FF35 Win7 returns: Mozilla/5.0 (Windows NT 6.1; WOW64; rv:35.0) Gecko/20100101 Firefox/35.0

            if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)) { //test for Firefox/x.x or Firefox x.x (ignoring remaining digits);
                var ffversion = new Number(RegExp.$1) // capture x.x portion and store as a number
                if (ffversion >= 35) {
                    if (_retrotax_options.debug) {
                        console.log("You're using FF 35 or above");
                    }
                    ;
                } else if (ffversion >= 5) {
                    if (_retrotax_options.debug) {
                        console.log("You're using FF 5.x or above");
                    }
                    ;
                } else if (ffversion >= 4) {
                    if (_retrotax_options.debug) {
                        console.log("You're using FF 4.x or above");
                    }
                    ;
                } else if (ffversion >= 3) {
                    if (_retrotax_options.debug) {
                        console.log("You're using FF 3.x or above");
                    }
                    ;
                } else if (ffversion >= 2) {
                    if (_retrotax_options.debug) {
                        console.log("You're using FF 2.x");
                    }
                    ;
                } else if (ffversion >= 1) {
                    if (_retrotax_options.debug) {
                        console.log("You're using FF 1.x");
                    }
                    ;
                }
            }


            //userAgent in IE7 WinXP returns: Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; .NET CLR 2.0.50727)
            //userAgent in IE11 Win7 returns: Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko

            if (navigator.userAgent.indexOf('MSIE') != -1)
                var detectIEregexp = /MSIE (\d+\.\d+);/ //test for MSIE x.x
            else // if no "MSIE" string in userAgent
                var detectIEregexp = /Trident.*rv[ :]*(\d+\.\d+)/ //test for rv:x.x or rv x.x where Trident string exists

            if (detectIEregexp.test(navigator.userAgent)) { //if some form of IE
                var ieversion = new Number(RegExp.$1) // capture x.x portion and store as a number
                if (ieversion >= 12) {
                    if (_retrotax_options.debug) {
                        console.log("You're using IE12 or above");
                    }
                    ;
                } else if (ieversion >= 11) {
                    if (_retrotax_options.debug) {
                        console.log("You're using IE11 or above");
                    }
                    ;
                } else if (ieversion >= 10) {
                    if (_retrotax_options.debug) {
                        console.log("You're using IE10 or above");
                    }
                    ;
                } else if (ieversion >= 9) {
                    if (_retrotax_options.debug) {
                        console.log("You're using IE9 or above");
                        //alert('123');
                    }

                    ;
                    //var bbb = document.getElementById('ulLeft');
                    //var left = bbb.offsetLeft;
                    //left = parseInt(offsetLeft);
                    //bbb.offsetLeft = (left + 12) + '%';
                } else {
                    //TODO  make IE9 compatible
                    compatible = false;
                }
            }

            if (_retrotax_options.debug) {
                console.log("Compatible Browser: " + compatible);
            }
            ;

            var div = document.getElementById('retrotax_plugin');
            if (compatible) {
                if(document.getElementById('head_color') != null) {
                    var headColor = document.getElementById('head_color');
                    headColor.addEventListener('change', function() {
                        //todo: send ot iframe
                        console.log(headColor.value);
                        _retrotax_options.head_color = headColor.value;
                    });
                }
                if(document.getElementById('panel_color') != null) {
                    var panelColor = document.getElementById('panel_color');
                    panelColor.addEventListener('change', function() {
                        //todo: send to iframe
                        console.log(panelColor.value);
                        _retrotax_options.panel_color = panelColor.value;
                    });
                }
                if(document.getElementById('text_color') != null) {
                    var textColor = document.getElementById('text_color');
                    textColor.addEventListener('change', function() {
                        //todo: send to iframe
                        console.log(textColor.value);
                        _retrotax_options.text_color = textColor.value;
                    });
                }
                if(document.getElementById('error_color') != null) {
                    var errorColor = document.getElementById('error_color');
                    errorColor.addEventListener('change', function() {
                        //todo: send to iframe
                        console.log(errorColor.value);
                        _retrotax_options.error_color = errorColor.value;
                    });
                }
                if(document.getElementById('inputWidth') != null) {

                    var input_Width = document.getElementById('inputWidth');
                    input_Width.addEventListener('change', function() {
                        //todo: send to iframe
                        _retrotax_options.inputWidth = input_Width.value;
                        console.log("Input changed" + input_Width.value);
                        // if($(input_Width).val() < 35){
                        //   alert('fuck');
                        //   console.log($('.btnNo').width());
                        // }
                    });
                }
                if (document.getElementById('retrotax_plugin_trigger') != null) {
                    var existing_retro_trigger = document.getElementById('retrotax_plugin_trigger');
                    existing_retro_trigger.addEventListener('click', function (e) {
                        e.preventDefault();
                        readyRetrotax();
                    }, false);
                } else {
                    var newButton = document.createElement('button');
                    newButton.id = "retrotax_plugin_trigger";
                    newButton.setAttribute('class', _retrotax_options.button_class);
                    newButton.innerHTML = _retrotax_options.button_text;
                    newButton.addEventListener('click', function (e) {
                        e.preventDefault();
                        readyRetrotax();
                    }, false);
                    div.appendChild(newButton);
                }
            } else {
                if (document.getElementById('retrotax_plugin_trigger') != null) {
                    var oldlink = document.getElementById('retrotax_plugin_trigger');
                    oldlink.delete();
                }
                var newlink = document.createElement('a');
                newlink.id = "retrotax_plugin_trigger";
                newlink.setAttribute('target', '_blank');
                newlink.setAttribute('class', _retrotax_options.button_class);
                newlink.innerHTML = _retrotax_options.button_text;
                newlink.setAttribute('href', 'http://tcid.retrotax.co/users/authenticateh?u=' + _retrotax_options.username + '&h=' + _retrotax_options.apikey);
                div.appendChild(newlink);
            }
        }
    }

    document.addEventListener("DOMContentLoaded", function (event) {
        bindRetroTaxBtn();
    });

})(); // :)
