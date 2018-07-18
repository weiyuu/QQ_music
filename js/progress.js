(function (window) {
    function Progress() {
        return new Progress.prototype.init();
    }
    Progress.prototype = {
        init:function () {

        },
    };
    Progress.prototype.init = Progress.prototype;
    window.Progress = Progress;


})(window);