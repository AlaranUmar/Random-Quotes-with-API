
    function getQuote(newquote = false) {
        if (newquote) {
            document.querySelectorAll(".quotecont").forEach(q => q.remove())
        }
        const url = `https://dummyjson.com/quotes/random`
        const request = new XMLHttpRequest()
        request.open("GET", url)
        request?.send()

        const req = fetch(url)
        const res = req.then((r) => r.json())

        request.addEventListener("load", function () {
            const data = JSON.parse(this.responseText)
            const name = data.author
            const quote = data.quote
            html = `
                <div class="quotecont card shadow-sm p-3 " quote="${quote}" name="${name}">
                    <div class="card-body" >
                        <h5 class="card-title">"${quote}"</h5>
                        <h6 class="card-subtitle">- ${name}</h6>
                        <i class="bi bi-bookmark-fill text-primary bookmark-icon"></i>
                    </div>
                </div>`
            h2.insertAdjacentHTML("afterend", html)
            Currentbookmark = {name, quote }
            showBookmarks()

        })
    }
    const icon = document.querySelector(".bookmark-icon")
    icon?.addEventListener("click", function () {
        Bookmarks.push(Currentbookmark)
        localStorage.setItem("Bookmarks", JSON.stringify(Bookmarks))
        icon.classList.remove("bi-bookmark-fill")
        icon.classList.add("bi-bookmark");
        icon.classList.add("nopointerevent");
        alert("Bookmark added!")
        showBookmarks()
    })

    let Bookmarks = JSON.parse(localStorage.getItem("Bookmarks")) || [];
    const h2 = document.querySelector("h2")
    const quotecont = document.querySelector(".quotecont")
    const btn = document.querySelector(".btn")
    const sidebar = document.querySelector(".sidebar")
    const bookmarklist = document.querySelector(".bookmarklist")
    const bookmarkcancle = document.querySelector(".bookmarkcancle")
    const bookmarkshow = document.querySelector(".bookmarkshow")

    let Currentbookmark = null
    btn.addEventListener("click", () => getQuote(true))
    bookmarkcancle.addEventListener("click", function () {
        sidebar.classList.add("hidden")
    })
    bookmarkshow.addEventListener("click", function () {
        sidebar.classList?.remove("hidden")
    })
    showBookmarks()




setInterval(() => getQuote(true), 30000)
function showBookmarks() {
        //     <div class="card listed">
            //     <p>Nelson mandela. The future</p>
    // </div>
    bookmarklist.innerHTML = " "
    Bookmarks.forEach(e => {
        const cont = document.createElement("li")
        cont.classList.add("card","listed")
        const p = document.createElement("p")
        p.classList.add("ellipsis")
        p.innerHTML = `
        <span class="fw-bold text-primary text-uppercase lh-sm" name="${e.name}" quote="${e.quote}">${e.name.split(" ")[0]}:</span><br>
        ${e.quote}
        `
        cont.appendChild(p)
        bookmarklist.appendChild(cont)
    })
}
const listed = document.querySelectorAll(".listed")
listed.forEach(e => {
    e.addEventListener("click", function () {
        listed.forEach(f => f.classList.remove("active"))
        e.classList.add("active")
        const quote_name = e.querySelector("p").querySelector("span")
        let quote_ = quote_name.getAttribute("quote")
        let name_ = quote_name.getAttribute("name")
        html = `
            <div class="quotecont card shadow-sm p-3 " quote="${quote_}" name="${name_}">
                <div class="card-body" >
                    <h5 class="card-title">"${quote_}"</h5>
                    <h6 class="card-subtitle">- ${name_}</h6>
                    <i class="bi bi-bookmark text-primary bookmark-icon nopointerevent"></i>
                </div>
            </div>`
        document.querySelector(".quotecont")?.remove()


        h2.insertAdjacentHTML("afterend", html)
    }
    )
    
})
// localStorage.clear()
    