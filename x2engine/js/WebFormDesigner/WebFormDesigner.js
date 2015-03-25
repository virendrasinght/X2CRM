/*****************************************************************************************
 * X2Engine Open Source Edition is a customer relationship management program developed by
 * X2Engine, Inc. Copyright (C) 2011-2015 X2Engine Inc.
 * 
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License version 3 as published by the
 * Free Software Foundation with the addition of the following permission added
 * to Section 15 as permitted in Section 7(a): FOR ANY PART OF THE COVERED WORK
 * IN WHICH THE COPYRIGHT IS OWNED BY X2ENGINE, X2ENGINE DISCLAIMS THE WARRANTY
 * OF NON INFRINGEMENT OF THIRD PARTY RIGHTS.
 * 
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more
 * details.
 * 
 * You should have received a copy of the GNU Affero General Public License along with
 * this program; if not, see http://www.gnu.org/licenses or write to the Free
 * Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
 * 02110-1301 USA.
 * 
 * You can contact X2Engine, Inc. P.O. Box 66752, Scotts Valley,
 * California 95067, USA. or at email address contact@x2engine.com.
 * 
 * The interactive user interfaces in modified source and object code versions
 * of this program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU Affero General Public License version 3.
 * 
 * In accordance with Section 7(b) of the GNU Affero General Public License version 3,
 * these Appropriate Legal Notices must retain the display of the "Powered by
 * X2Engine" logo. If the display of the logo is not reasonably feasible for
 * technical reasons, the Appropriate Legal Notices must display the words
 * "Powered by X2Engine".
 *****************************************************************************************/

x2.WebFormDesigner = (function() {

    /*
    Base prototype. Should not be instantiated. 
    */

    function WebFormDesigner (argsDict) {
        var that = this;

        // properties that can be set with constructor arguments
        var defaultArgs = {
            translations: [], // used for various web form text
            iframeSrc: '', 
            externalAbsoluteBaseUrl: '', // used for specifying web form generation script source
            saveUrl: '', // used to save the web form settings
            savedForms: {}, // used to cache previously viewed forms
            fields: [],
            colorfields: [],
            deleteFormUrl: '',
            listId: null
        };
        auxlib.applyArgs (this, defaultArgs, argsDict);

        $(document).on ('ready', function () {
            that._init ();
        });
    }


    /*
    Public static methods
    */

    /*
    Private static methods
    */

    WebFormDesigner.sanitizeInput = function (value) {
        return encodeURIComponent(value.replace(/(^[ ]*)|([ ]*$)|([^a-zA-Z0-9#,])/g, ''));
    }

    /*
    Public instance methods
    */

    /*
    Private instance methods
    */
    WebFormDesigner.prototype._saveForm = function (json) {
        var that = this;
        $.ajax({
            url: that.saveUrl,
            type: 'POST',
            data: json,
            success: function (data, status, xhr) {
                that.saved (data, status, xhr);
            }
        });
    }

    /*
    Set up form submission behavior.
    */
    WebFormDesigner.prototype._setUpFormSubmission = function () {
        var that = this;
        $('#web-form-submit-button').on('click', function(evt) {
            evt.preventDefault ();
            that._refreshForm ();

            var formJSON = auxlib.formToJSON ($('#web-form-designer-form'));
            formJSON.name = $('#web-form-name').val();
            that._saveForm(formJSON);

            return false;
        });

        $('#generate').click(function(){
            $('#web-form-submit-button').click();
        });

        /*********************************
        * Resets form and saves as a new Form
        ********************************/
        $('#web-form-new-button').click(function(){
            that._updateFields ({
                params: that.defaultJSON,
                name: $('#web-form-new-name').val()
            });
            

            // Wipe inputs
            $('#web-form-designer-form :input')
             .not(':button, :submit, :reset, [type="hidden"]')
             .val('')
             .removeAttr('checked')
             .removeAttr('selected');

            $('#web-form-submit-button').click();
            $('#new-field').slideToggle();
        });
    };

    /*
    Sets up the web form designer
    */
    WebFormDesigner.prototype._init = function () {
        var that = this;

        // set up embedded code container behavior
        $('#embedcode').focus(function() {
            $(this).select();
        });
        $('#embedcode').mouseup(function(e) {
            e.preventDefault();
        });
        $('#embedcode').focus();

        // instantiate color pickers
        $.each(that.colorfields, function(i, field) {
            var selector = '#' + field;
            x2.colorPicker.setUp ($(selector));
            $(selector).on ('change', function () { that.updateParams (); });
        });
        
        // set up form field behavior
        $.each(that.fields, function(i, field) {
            $('#'+field).on('change', function () { that.updateParams (); });
        });

        // set up save web form button behavior
        $('#web-form-save-button').click(function(e) {

            // check form empty input
            if ($.trim($('#web-form-name').val()).length === 0) { // invalid, show errors
                $('#web-form-name').addClass('error');
                $('[for="web-form-name"]').addClass('error');
                $('#web-form-save-button').after('<div class="errorMessage">'+
                    that.translations.nameRequiredMsg+'</div>');
                e.preventDefault(); //has no effect
                return false;
            } else { // name validated, remove error messages
                $('#web-form-name').removeClass('error');
                $('[for="web-form-name"]').removeClass('error');
                $('#web-form-save-button').next('.errorMessage').remove ();
            }
        });

        that._setUpFormSubmission ();

        // set up saved form selection behavior
        $('#saved-forms').on('change', function() {
            var id = $(this).val();
            that._showHideDeleteButton ();

            // clear old form, populate form with saved input
            that._clearFields();
            if (id != 0) {
                var match = $.grep(that.savedForms, function(el, i) {
                    return id == el.id;
                });
                that._updateFields(match[0]);
                $('#web-form-inner').show();
            } else {
                that._updateFields({
                    params: that.defaultJSON,
                });
                
                
                $('#web-form-inner').hide();
            }

            // update iframe and embedded code
            that.updateParams();
            // $('#embedcode').focus();  
            $.each(that.colorfields, function(i, field) {
                if ($('#'+field).val () === '') {
                    x2.colorPicker.addCheckerImage ($('#'+field));
                } else {
                    x2.colorPicker.removeCheckerImage ($('#'+field));
                }
            });

            // extra behaviors set in child prototype
            that._afterSavedFormsChange ();

            
        });

        // set up iframe resizing behavior
        $('#iframe_example').data('src',that.iframeSrc);
        $('#iframe_example').resizable({
            start: function(event, ui) {

            },
            stop: function(event, ui) {
                that.updateParams();
                //$(this).removeAttr('style');
            },
            helper: 'ui-resizable-helper',
            resize: function(event, ui) {
            //    $('#iframe_example').width(ui.size.width);
            //    $('#iframe_example').height(ui.size.height);
            //    $('#iframe_example iframe').attr('width', ui.size.width);
            //    $('#iframe_example iframe').attr('height', ui.size.height);
            },
        });

        // set up reset form button behavior
        $('#reset-form').on('click', function(evt) {
            evt.stopPropagation ();
            $("#saved-forms").val("0").change();
            return false;
        });

        that._afterInit ();

        that.updateParams();


        that._showHideDeleteButton ();

        that._setUpFormButtons ();
        that._setUpFormDeletion ();

        // Get the default form 
        this.defaultJSON = auxlib.formToJSON ($('#web-form-designer-form'));

        this.formName = '';

        

        that._setUpTabs();

    };

    // Finds all the tab containers in the view files, and creates 
    // tabs out of them. 
    WebFormDesigner.prototype._setUpTabs = function () {
        var that = this;
        var tabs = $('#webform-tabs');
        var ul = tabs.find('ul').first();

        $('.webform-tab').each(function(){
            var title = $(this).data('title');
            var id = '#' + $(this).attr('id');
            var li = $('<li></li>').appendTo(ul);

            $('<a></a>').
            attr('href', id).
            html(title).
            appendTo(li);

        });

        // Tabs can be appended to accross view files
        $('.webform-tab-content').each(function(){
            var id = $(this).data('tab');
            $(this).appendTo('#'+id+' .tab-content');
        });

        

        tabs.tabs();
    }

    WebFormDesigner.prototype._showHideDeleteButton = function () {
        if ($('#saved-forms').val () === '0') {
            $('#delete-form').addClass ('disabled');
        } else {
            $('#delete-form').removeClass ('disabled');
        }
    };

    WebFormDesigner.prototype._setUpFormButtons = function () {
        var buttons = $('#webform-buttons');
        var that = this;

        buttons.find('#save-as').click(function(){
            $('#web-form-name').val(that.formName);
            $('#web-form #save-field').slideToggle();

            if($('#web-form #new-field').is(':visible')) {
                $('#web-form #new-field').slideToggle();
            }
        });

        buttons.find('#new-form').click(function(){
            $('#web-form-new-name').val('');
            $('#web-form #new-field').slideToggle();

            if($('#web-form #save-field').is(':visible')) {
                $('#web-form #save-field').slideToggle();
            }
        });

        $('#clipboard').click(function(){
            $('#embedcode').focus();
            $('#copy-help').show();
            setTimeout(function(){
                $('#copy-help').hide();
            }, 2000);
        });
    }

    /**
     * Sets up behavior of 'Delete Form' button
     */
    WebFormDesigner.prototype._setUpFormDeletion = function () {
        var that = this; 
        $('#delete-form').on ('click', function (evt) {
            var formId = $('#saved-forms').val ();
            auxlib.destroyErrorFeedbackBox ($('#saved-forms'));
            $.ajax ({
                url: that.deleteFormUrl,
                type: 'GET',
                data: {
                    id: formId, 
                },
                dataType: 'json',
                success: function (data) {
                    if (data[0]) {
                        $('#saved-forms').find ('[value="' + formId + '"]').remove();
                        $('#saved-forms').change();
                        x2.topFlashes.displayFlash(data[1], 'success');
                    } else {
                        x2.topFlashes.displayFlash(data[1], 'error');
                    }

                }
            });
        });
    };

    // override in child prototype
    WebFormDesigner.prototype._afterSavedFormsChange = function () {};

    // override in child prototype
    WebFormDesigner.prototype._afterInit = function () {};


    /*
    Generates a new iframe with the user-set dimensions and with GET parameters corresponding
    to the current form input.
    */
    WebFormDesigner.prototype.updateParams = function (iframeContainer) {
        var that = this;

        if ($(iframeContainer).data ('ignoreChange')) {
            return;
        }
        var params = [];
        if (that.listId !== null) {
            params.push('lid='+that.listId);
        }

        $.each(that.fields, function(i, field) {
            var value = WebFormDesigner.sanitizeInput($('#'+field).val());
            if (value.length > 0) { params.push(field+'='+value); }
        });

        /* send iframe height to iframe contents view so that iframe contents can be set to correct
        height on iframe load */
        var iframeHeight = $('#iframe_example').height ();
        params.push ('iframeHeight=' + (Math.floor (iframeHeight)));

        var query = this._generateQuery(params);

        var iframeWidth;
        if ($('#iframe_example').find ('iframe').length) {
            iframeWidth = $('#iframe_example').width ();
        } else {
            iframeWidth = 200;
        }

        /* 
        */
        var embedCode = '<iframe name="web-form-iframe" src="' + that.iframeSrc + query +
            '" frameborder="0" allowtransparency="true" scrolling="0" width="' + iframeWidth +  '" height="' + 
            iframeHeight + '"></iframe>';

        if ($('#saved-forms').val() != 0) {
            $('#embedcode').val(embedCode);
        } else {
            $('#embedcode').val('');
        }

        $('#iframe_example').children ('iframe').remove ();
        $('#iframe_example').append (embedCode);
    };

    /*
    Generates a GET parameter string from the given paramaters array
    */
    WebFormDesigner.prototype._generateQuery = function (params) {
        var query = '';
        var first = true;

        for (var i = 0; i < params.length; i++) {
            if (params[i].search(/^[^=]+=[^=]+$/) != -1) {
                if (first) {
                    query += '?'; first = false;
                } else {
                    query += '&';
                }

                query += params[i];
            }
        }

        

        query = this._appendToQuery (query);

        return query;
    };

    

    /**
     * Use to refresh form data before submission
     */
    WebFormDesigner.prototype._refreshForm = function () {
         
    };

    // override in child prototype
    WebFormDesigner.prototype._appendToQuery = function (query) {
        return query;
    };

    /*
    Clear form inputs.
    */
    WebFormDesigner.prototype._clearFields = function () {
        var that = this;
        $('#web-form-name').val('');
        $.each(that.fields, function(i, field) {
            $('#'+field).val('');
        });
    };

    /*
    Populate form with form settings
    */
    WebFormDesigner.prototype._updateFields = function (form) {
        var that = this;

        that.DEBUG && console.log ('_updateFields');
        that.DEBUG && console.log (form.params);
        $('#web-form-name').val(form.name);
        that.formName = form.name;
        if (form.params) {
            $.each(form.params, function(key, value) {
                if ($.inArray(key, that.fields) != -1) {
                    $('#'+key).val(value);
                }
                if ($.inArray(key, that.colorfields) != -1) {
                    $('#'+key).spectrum ("set", $('#'+key).val ());
                }
            });
        }

        this._updateExtraFields (form);
        this._updateCustomFields (form);
    };

    // override in child prototype
    WebFormDesigner.prototype._updateExtraFields = function (form) {
        return;
    };

    

    

    

    // override in child prototype
    WebFormDesigner.prototype._updateCustomFields = function (form) {
         
    };

    // override in child prototype
    WebFormDesigner.prototype._beforeSaved = function () {};

    /*
    Called on ajax success. Form saved successfully. Alert user and cache the form.
    */
    WebFormDesigner.prototype.saved = function (data, status, xhr) {
        var that = this;

        this._beforeSaved ();
        var newForm = $.parseJSON(data);
        if (typeof newForm.errors !== "undefined") { return; }
        this._cacheSavedForm (newForm);
        that.updateParams();
        $('#web-form-save-button').removeClass ('highlight');
        x2.topFlashes.displayFlash(that.translations.formSavedMsg, 'success');
        that._showHideDeleteButton ();

        if ($('#save-field').is(':visible')) {
            $('#save-field').slideToggle();
        } 
        if (!$('#web-form-inner').is(':visible')) {
            $('#web-form-inner').show();
        }
    }

    /*
    Cache saved forms on client for fast access on form switch
    */
    WebFormDesigner.prototype._cacheSavedForm = function (newForm) {
        var that = this;

        newForm.params = $.parseJSON(newForm.params);
        var index = -1;
        $.each(that.savedForms, function(i, el) {
            if (newForm.id == el.id) {
                index = i;
            }
        });
        if (index != -1) {
            that.savedForms.splice(index, 1, newForm);
        } else {
            that.savedForms.push(newForm);
            $('#saved-forms').append('<option value="'+newForm.id+'">'+newForm.name+'</option>');
        }
        $('#saved-forms').val(newForm.id);
    }

    return WebFormDesigner;
})();
