(function ($) {
    $.fn.setProgressedUploader = function (settings) {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        var guid = s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        var createElements = function (initor) {
            var progressbar = '\
            <div id="progress-' + guid + '">\
                <div id="progressbar-' + guid + '" role="progressbar"></div>\
            </div>';

            var message = '<p id="message-' + guid + '"></p>';
            initor.after(message);
            initor.after(progressbar);
        }

        var getElements = function () {
            var elements = {
                progress: $('#progress-' + guid),
                progressbar: $('#progressbar-' + guid),
                message: $('#message-' + guid)
            };
            return elements;
        }

        var setClass = function (elements) {
            elements.progress.addClass('progress mb-3 mt-3');
            elements.progressbar.css('width', '0%');
            elements.progressbar.addClass('progress-bar progress-bar-striped progress-bar-animated');
            elements.message.addClass('text-danger');
        }

        //Occurs when page loads.
        var init = function (elements) {
            elements.progress.hide();
            if (settings.onInit) {
                settings.onInit(elements);
            }
        }

        //Occurs when user put in a file
        var getFile = function () {
            var elements = getElements();
            elements.progressbar.css('width', '0%');
            elements.progress.show();
            elements.message.html('0%');
            if (settings.onGetFile) {
                settings.onGetFile(elements);
            }
        }

        var startSubmitting = function (e) {
            e.preventDefault();
            var elements = getElements();
            if (settings.onStartSubmitting) {
                settings.onStartSubmitting(elements);
            }
            $.ajax({
                url: form.attr('action'),
                type: form.attr('method'),
                enctype: form.attr('enctype'),
                data: new FormData(form[0]),
                cache: false,
                contentType: false,
                processData: false,
                xhr: function () {
                    var myXhr = $.ajaxSettings.xhr();
                    if (myXhr.upload) {
                        myXhr.upload.addEventListener('progress', function (e) {
                            if (e.lengthComputable) {
                                elements.progressbar.css('width', 100 * e.loaded / e.total + '%');
                                elements.message.html(Math.round(e.loaded / e.total * 100) + "%");
                                if (e.loaded == e.total) {
                                    processing(elements);
                                }
                            }
                        }, false);
                    }
                    return myXhr;
                },
                success: finish,
                error: function (e) {
                    getFile();
                    if (settings.onError) {
                        settings.onError();
                    }
                }
            });
        }

        var processing = function (elements) {
            if (settings.onProcessing) {
                settings.onProcessing(elements);
            }
            elements.message.html('Please be patient while we are verifying your file...');
        }

        var finish = function (data) {
            var elements = getElements();
            getFile();
            if (settings.onFinish) {
                settings.onFinish(elements, data);
            }
        }

        createElements(this);
        var elements = getElements();
        var form = this.parents().filter("form").first();
        setClass(elements);
        init(elements);
        this.on('change', getFile);
        form.submit(startSubmitting);
    }
}(jQuery))