let form =document.getElementById("github-form")
let userList = document.getElementById("user-list")
let reposlist= document.getElementById("repos-list")

// display users
let getUsers = function(e){
    e.preventDefault()
    let user = document.getElementById("search").value
    fetch(`https://api.github.com/search/users?q=${user}`,{Accept: "application/vnd.github.v3+json"}).then(res => res.json()).then(data =>{
        console.log(data.items);
        data.items.map(user=>{
            let markup = `<li><p>Username: ${user.login}</p> 
            <img src="${user.avatar_url}" alt="${user.login}">
            <p><a href="${user.html_url}">Go to Profile</a></p>
            </li>`
            userList.insertAdjacentHTML("afterbegin", markup)

            // display user repos on click of user container
            let userLi = userList.querySelector("li")
            userLi.addEventListener("click", ()=> displayRepos(user.login))

        })


    }).catch(err =>{
        alert(err.message)
    })

}

form.addEventListener("submit", getUsers)


// display user repos
let displayRepos = function(user){

    fetch(`https://api.github.com/users/${user}/repos`).then(res => res.json()).then(data => {
console.log(data);
        data.map(repo=>{
            const markup = `<li><a href="${repo.html_url}">${repo.full_name}</a></li>`
            userList.innerHTML = ""
            reposlist.insertAdjacentHTML("afterbegin", markup)

        })
    })

}