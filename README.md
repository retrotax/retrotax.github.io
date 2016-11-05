# Tax Credit Screening Plugin
Created by RetroTax


Introduction
============
The RetroTax Plugin is configurable, easy-to-use application built for our clients, alliance partners, and partering organizations to screen job seekers, applicants, and new hires for a range of tax credits. The plugin has 3 different modes for use with On-Boarding Systems, Applicant Tracking Systems, and Pre-Qualification Screening.  The plugin takes advantage of RetroTax's API.  See API Documentation at [https://developer.retrotax-aci.com/](https://developer.retrotax-aci.com/)

![Alt text](images/material-design.png "RetroTax Plugin")

[Plugin Screenshot](https://drive.google.com/file/d/0B0LfxC9fk-YpLXU4S3Z5TXhfamc/view?usp=sharing)

----------------------------------------------------------------------------------------
Demo
============
Demo:
[http://retrotax.github.io/](http://retrotax.github.io/)

Simple HTML Example:
See simple_demo.html in repo.


----------------------------------------------------------------------------------------
Installation
============
1. Contact tech@retrotax-aci.com to request an API Key. 
2. Place `<script type="text/javascript" src="https://cdn.retrotax-aci.com/dist/retrotax_plugin.min.js">` either before the end of your `</head>` tag or at the end before your `</body>` tag (better)
3. Add `<div id="retrotax_plugin"></div>` inside the `<body>`
3. Set your configuration values (see examples below)
4. Start Screening

Hosting
============
The plugin can be hosted on your application's server or served statically from a file storage system (e.g. Amazon S3).  How you host the plugin determines the method you use to authenticate.

Authentication
============
In order for the plugin to function, you must have a RetroTax account with valid credentials.  Your credentials are authorized when they pass from the _retrotax_options config object (see sample config below) to the plugin. Retrotax TCID API's uses a token-based authentication system. Retrotax assigns an API Key for your application and also a username and password for each hiring manager. Credentials should be defined as parameters in the _retrotax_options config object:

```javascript
var _retrotax_options = {
    iframe_base_path: 'https://cdn.retrotax-aci.com/dist/widget/iframe',
    username:'demo.hiring.manager',
    password:'SecretPassword',
    api_key:'yGysmp1Prg1smu42xwlG642MT1c3K6L57VfdycUH',
    plugin_type:'obs'
}
```

----------------------------------------------------------------------------------------
Sample Config (Customized)
============

```javascript
var _retrotax_options = {
            iframe_base_path: 'https://cdn.retrotax-aci.com/dist/widget/iframe',
            delay: 1000, 
            debug: true, 
            api_key:'',
            username:'',
            password:'',
            logo:'http://yoursite.com/path/to/your/logo/pic.png',
            location_id:8557,
            button_class:"btn btn-huge btn-info",
            button_text:"Open RetroTax Screening Plugin",
            button_class_error:"btn btn-huge btn-danger",
            button_text_error:"Aw, snap! Something broke",
            plugin_type: 'obs',  
            prepopulate_by:'id',
            populated_fields: {
                first_name:'field_first_name',
                last_name:'field_last_name',
                suffix:'field_suffix',
                city:'field_city',
                state:'field_state',
                zip:'field_zipcode',
                address_line_1:'field_address',
                address_line_2:'field_address2',
                dob:'field_date_of_birth',
                ssn:'',
                email:''
            },
            head_color: 'FFFFFF',
            panel_color: 'FFFFFF',
            text_color: '000000',
            error_color: 'c0392b',
            input_width: '50'

};
```

----------------------------------------------------------------------------------------
Callback URL (in-development)
============
The plugin provides a callback-url in which we will make a POST request with the TCID response after a user has completed and saved an ATS or OBS application.  The callback URL provided must be https; otherwise, the callback url will be ignored.  You can expect to receive a similar JSON structure to this:

```javascript
{
  "employee_info": {
    "location_id": 42,
    "first_name": "foo",
    "last_name": "foo",
    "suffix": "foo",
    "address_line_1": "foo",
    "address_line_2": "foo",
    "city": "foo",
    "zip": "foo",
    "state": "foo",
    "county_id": "foo",
    "ssn": 42,
    "dob": "2016-10-18",
    "rehire": true,
    "is_applicant": true
  },
  "application_status": {
    "code": "foo",
    "description": "foo"
  },
  "zone_status": {
    "code": "foo",
    "description": "foo"
  },
  "suppl_program_status": {
    "code": "foo",
    "description": "foo"
  },
  "qualifications": [
    {
      "description": "foo",
      "max_credit": 42,
      "type": "foo"
    }
  ],
  "hiring_manager_info": {
    "occupation_id": 42,
    "starting_wage": "foo",
    "dgi": "2016-10-18",
    "dojo": "2016-10-18",
    "doh": "2016-10-18",
    "dsw": "2016-10-18"
  },
  "questionnaire": {
    "afdc": true,
    "food_stamps": true,
    "ssi": true,
    "voc_rehab": true,
    "veteran": true,
    "unemployed": true,
    "felon": true,
    "cdib": true,
    "ca_farmer": true,
    "ca_foster": true,
    "ca_cal_works": true,
    "ca_misdemeanor": true,
    "ca_wia": true,
    "sc_fib": true
  },
  "voc_rehab_info": {
    "is_agency": true,
    "dept_va": true,
    "ttw": true,
    "address_line_1": "foo",
    "address_line_2": "foo",
    "agency_name": "foo",
    "city": "foo",
    "county": "foo",
    "phone": "foo",
    "state": "foo",
    "zip": "foo"
  },
  "felon_info": {
    "conviction_date": "2016-10-18",
    "release_date": "2016-10-18",
    "is_federal_conviction": true,
    "is_state_conviction": true,
    "parole_officer_name": "foo",
    "parole_officer_phone": "foo",
    "felony_state": "foo",
    "felony_county": "foo"
  },
  "veteran_info": {
    "disabled": true,
    "branch": "foo",
    "service_start": "2016-10-18",
    "service_stop": "2016-10-18"
  },
  "foodstamps_recipient_info": {
    "city_received": "foo",
    "county_received": "foo",
    "name": "foo",
    "relationship": "foo",
    "state_received": "foo"
  },
  "afdc_recipient_info": {
    "city_received": "foo",
    "county_received": "foo",
    "name": "foo",
    "relationship": "foo",
    "state_received": "foo"
  },
  "unemployment_info": {
    "compensated": true,
    "compensation_start_date": "2016-10-18",
    "compensation_end_date": "2016-10-18",
    "unemployment_start_date": "2016-10-18",
    "unemployment_end_date": "2016-10-18"
  }
}
```
----------------------------------------------------------------------------------------

Styling
============
The configuration settings allow for minor modifications in order to allow styling similar to your existing website/application.  In doing so, we aim to take RetroTax out of the equation for the end-user as much as possible. Within the configuration JSON, the following fields can be configured. If you require additional customization, we will gladly accommodate your custom CSS stylesheets, if your provide them. Please contact us if you'd like to discuss this further.

```
  logo: 'https://yourlogo.com',
  head_color: 'FFFFFF',
  panel_color: 'FFFFFF',
  text_color: '000000',
  error_color: 'c0392b',
  input_width: '50',

```

----------------------------------------------------------------------------------------
Compatability
============
The plugin script that is embeded in your website uses vanilla javascript and not dependent upon any framework (jQuery, etc, etc)

Currently, the plugin supports IE10+ and all modern browsers; however the plugin does not provide support for IE 7,8,9. If a user is viewing from IE9 or less the plugin is converted to a direct auto-login link, but only for the OnBoarding (obs) plugin_type.  So, rather than presented with an IFRAME, the user will be directed to our Tax Credit Screening platform (TCID) within a new browser.

----------------------------------------------------------------------------------------
Security
============
* Callback URL must be made over SSL
* x-auth-token generated after authentication has an expiration of 8 hours.
* x-auth-token is restricted to the IP address that initially called /authentication


----------------------------------------------------------------------------------------
Mobile
============
Currently, the viewport must be set in the parent window (i.e. yours) in order for the plugin to be responsive on mobile devices.  To do this, ensure the following is set in the `<head>` of your document:

`<meta name="viewport" content="width=device-width, initial-scale=1">`


----------------------------------------------------------------------------------------

Reporting (ATS & PreQual)
============
Ultimately, the value of screening applicants for tax credits is the insight into whether hiring that applicant will likely result in a tax credit.  Reporting which applicants are pre-eligible can happen in one of two ways: 


1. via API Call - An API call made to view method (/api/v1/api_employees/view) will return the applicants eligibility status with a max_credit value.  This information can then be displayed on your HRIS dashboard.

![Alt text](images/dashboard_sample.png "Sample Dashboard - for ATS and PreQual Modes")

2. via Email - These are scheduled on a daily, weekly, or monthly basis.  

![Alt text](images/ats_report_sample.png "Sample Dashboard - for ATS and PreQual Modes")

----------------------------------------------------------------------------------------

Configuration
============

Parameter | Req | Default | Options | Type | Description 
--- | --- | --- | --- | --- | ---
iframe_base_path | Yes | https://cdn.retrotax-aci.com/widget/iframe | widget/iframe | String | The path to the iframe that gets injected over your page. This should not be changed unless you are testing locally. In that case, set it to 'widget/iframe'.
username | Yes | false | None | String | Your webscreen.retrotax-aci.com username. Required if authenticating from a static website
password | Yes | false | None | String | Your plugin account's webscreen.retrotax-aci.com password. Required if authenticating from a static website
x_api_key | Yes | false | None | String | Your RetroTax API key
location_id  | Yes | false | None | Int | Similar to CompanyID, providing this will associate the record to this specific location and the location's parent company. 
callback_url | No | false | None | Valid URL String | Provide a callback URL and we will return a JSON response of each ATS or OBS submission
auto_login_code | No | false | None | String | The employee-level user account's TCID auto-login id used to redirect incompatible browsers, e.g. IE9 and below
framework | No | material-design | None | String | Currently we only have one available front-end option. We aim to add other designs that fit your company requirements
delay | No | 0 | None | Int | How long to delay before showing the plugin appears
debug | No | false | None | Boolean | If set to true, we will log to the console
prepopulate_by | No | false | 'id','name','string' | String | If set to id or name the plugin will auto-populate the values in those fields to match those to our field names.  
populated_fields | No | see below | see below | Obj | The object populated by the `prepopulate_by` parameter
hide_fields | NO | false | True, False | Boolean | Whether to hide prepopulated fields from the user or display their populated values. Boolean
readonly_fields | NO | false | True, False | Boolean | Whether to hide prepopulated fields from the user or display their populated values. Boolean
language_setting | No |'en' |'en', 'sp' |String |Plugin provide multi-langulage options
hide_hm_section |No |false| True, False |Boolean| Whether to hide hiring manager fields from the user or display
hiring_manager_fields | No | see below | see below | Obj | The pre-configuratable hiring manager parameters required for on-boarding new hires in 'obs' mode
readonly_fields |No |false  |True, False| Boolean |Whether to prepopulated fields are Editable fields or Readonly fields
plugin_type | Yes | 'obs' | 'ats','obs','prequal'| String | The plugin's mode: Application Tracking System, OnBoarding System, or PreQual
button_text | No | 'Open RetroTax Screening Plugin' | Any | String | What the text displayed to the end-user should say
button_text_error | No | 'Error - Something went wrong.' | Any | String | Optionally apply error text to the element's innerHTML in case of an error
button_class | No | '' | Any | String | Optionally apply a css class to the retrotax element 
button_class_error | No | '' | Any | String | Optionally apply a css class to the retrotax element in case of an error
logo | No | 'iframe/images/retrotax_plugin_logo.png' | String IMG SRC or False | String | Defaults to RetroTax Logo. Setting to false removes the RetroTax <img>. Providing a valid URL will return that img src.
prequal | No | see below | see below | Obj | The pre-configuratable settings for plugin_type prequal
head_color | No | 'FFFFFF' | None | String | The HEX color for the modal's head
panel_color | No | 'FFFFFF' | None | String | The HEX color for the modal's panel
text_color | No | '000000' | None | String | The HEX color for the modal's text
error_color | No | 'c0392b'| None | String | The HEX color for the modal's error
input_width | No | 50 | see below | Int | The modal's input width

```javascript
 populated_fields={
    "first_name": "foo",
    "last_name": "foo",
    "suffix": "foo",
    "email":"john.doe@retrotax-aci.com",
    "address_line_1": "foo",
    "address_line_2": "foo",
    "city": "foo",
    "zip": "foo",
    "state": "foo",
    "ssn": 42,
    "dob": "2016-10-18"
};
```

```javascript
 hiring_manager_fields={
    "occupation_id": 42,
    "starting_wage": "10",
    "dgi": "2016-10-18",
    "dojo": "2016-10-18",
    "doh": "2016-10-18",
    "dsw": "2016-10-18",
    "hm_name":"foo",
    "hm_title":"foo"
};
```

```javascript
prequal={
        email_to:'',  //single valid email
        email_cc:'',  //commma delimited email list
        partner_name:'',  //The contact at your company or organization which will be used as a reference in the generated prequal PDF letter 
        partner_organization:'', //Your company or organization
        partner_website:'', //valid URL
        closing_text:'', //closing sentence in the generated prequal PDF letter
        intro_text:'', //opening sentence in the generated prequal PDF letter
        logo_url:'', //valid URL
        logo_width:'', //integer
        logo_height:'', //integer 
        retrotax_contact:'' //name of RetroTax contact e.g. john.hess@retrotax-aci.com, natalie.commons@retrotax-aci.com, alan.newcomb@retrotax-aci.com             
    };
```
----------------------------------------------------------------------------------------









