window.addEventListener("load", ()=> {
    const pathName = window.location.pathname

    const redirectors = {
        fill: document.getElementById("redirectFill"),
        edit: document.getElementById("redirectEdit"),
        activate: function() {
            this.fill.href = `${pathName}/fill`
            this.edit.href = `${pathName}/edit`
        }
    }

    redirectors.activate()
})