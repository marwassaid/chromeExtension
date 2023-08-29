let Leads=[] 
const btnEl=document.getElementById("input-btn")
const inputEl=document.getElementById("input-el")
const ulEl=document.getElementById("ul-el")
const leadFromLocalStorage=JSON.parse(localStorage.getItem("myLead")) //get the item that is stored in LS then parse it to array
const deleteBtn=document.getElementById("delete-btn")
const tabBtn=document.getElementById("tab-btn")

if(leadFromLocalStorage){  
    Leads=leadFromLocalStorage
render(Leads)
}
 
tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        Leads.push(tabs[0].url)
        localStorage.setItem("myLead",JSON.stringify(Leads))
        render(Leads) 
    })
})

function render(myLead){
let listItem=""
for(let i=0;i<myLead.length;i++){
listItem+=`
    <li>
        <a href='${myLead[i]}'  target='_blank'> 
          ${myLead[i]}    
        </a>
     </li> `
} 
    ulEl.innerHTML=listItem
}  
btnEl.addEventListener("click",function(){
    Leads.push(inputEl.value) // pushing the input value entered to the array
    inputEl.value=""   // This is to clear the previous input field value
    localStorage.setItem("myLead",JSON.stringify(Leads) ) // saving myleads array to local Storage    
render(Leads)
}) 

deleteBtn.addEventListener("dblclick",function() {
    Leads=[] 
    localStorage.clear() 
    render(Leads) 

})




