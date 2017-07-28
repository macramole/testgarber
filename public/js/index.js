$(function() {
    $("#btnGo").click(function() {
        document.location.href = $("#txtBlog").val() + "/";
    });
});
