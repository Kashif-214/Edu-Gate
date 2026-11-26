const courses=[
 {title:"Mathematics",desc:"Build confidence with numbers, formulas and problem-solving.",icon:"📐",color:"#edf2ff",level:"FOUNDATION"},
 {title:"Science",desc:"Explore the world through clear concepts and discoveries.",icon:"🔬",color:"#e9f8f0",level:"FOUNDATION"},
 {title:"Business Studies",desc:"Understand management, markets and entrepreneurship.",icon:"📊",color:"#fff3e5",level:"SCHOOL & COLLEGE"},
 {title:"Computer Skills",desc:"Learn digital basics, technology and practical skills.",icon:"💻",color:"#f3edff",level:"ALL LEVELS"}
];
const $=s=>document.querySelector(s);
function courseCard(c){return `<article class="course-card"><div class="course-icon" style="background:${c.color}">${c.icon}</div><div><h3>${c.title}</h3><p>${c.desc}</p><span class="course-meta">${c.level}</span></div></article>`}
function renderCourses(filter=""){const list=courses.filter(c=>(c.title+" "+c.desc).toLowerCase().includes(filter.toLowerCase()));$("#homeCourses").innerHTML=list.map(courseCard).join("")||'<p class="muted">No matching courses found.</p>';$("#allCourses").innerHTML=courses.map(courseCard).join("");}
renderCourses();$("#courseCount").textContent=courses.length;
$("#searchInput").addEventListener("input",e=>renderCourses(e.target.value));
document.querySelectorAll(".tab").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".tab").forEach(x=>x.classList.toggle("active",x===btn));document.querySelectorAll(".panel").forEach(p=>p.classList.toggle("active",p.id===btn.dataset.tab));}));
const questions=[
 {q:"Which habit helps you remember information better?",a:["Only reading once","Active recall and revision","Studying without breaks"],correct:1,why:"Correct! Trying to recall information and revisiting it helps strengthen memory."},
 {q:"What does HTML mainly provide in a web page?",a:["Page structure","Internet connection","Battery power"],correct:0,why:"Correct! HTML describes the structure and content of web pages."},
 {q:"Which is a good way to plan your study day?",a:["Do everything at once","Set a few clear priorities","Avoid taking breaks"],correct:1,why:"Correct! A few clear priorities make study time more manageable."}
];
let qi=0,chosen=false,passed=Number(localStorage.getItem("eduSmartPassed")||0);
function updatePassed(){$("#doneCount").textContent=passed;$("#profileDone").textContent=passed;}
function showQuestion(){const q=questions[qi];chosen=false;$("#questionCount").textContent=`QUESTION ${qi+1} OF ${questions.length}`;$("#questionText").textContent=q.q;$("#quizFeedback").textContent="";$("#nextQuestion").disabled=true;$("#nextQuestion").textContent=qi===questions.length-1?"Finish quiz":"Next question →";$("#answers").innerHTML=q.a.map((a,i)=>`<button class="answer" data-index="${i}">${a}</button>`).join("");document.querySelectorAll(".answer").forEach(b=>b.addEventListener("click",()=>{if(chosen)return;chosen=true;const ok=Number(b.dataset.index)===q.correct;b.classList.add(ok?"correct":"wrong");if(!ok)document.querySelectorAll(".answer")[q.correct].classList.add("correct");$("#quizFeedback").textContent=ok?q.why:"Not quite. The correct answer is highlighted.";if(ok){passed++;localStorage.setItem("eduSmartPassed",passed);updatePassed();}$("#nextQuestion").disabled=false;}));}
$("#nextQuestion").addEventListener("click",()=>{if(!chosen)return;if(qi<questions.length-1){qi++;showQuestion()}else{$("#questionText").textContent="Great effort!";$("#answers").innerHTML="";$("#questionCount").textContent="QUIZ COMPLETED";$("#quizFeedback").textContent="You completed the starter quiz. Try again to practise more.";$("#nextQuestion").textContent="Try again";$("#nextQuestion").disabled=false;$("#nextQuestion").onclick=()=>{qi=0;$("#nextQuestion").onclick=null;showQuestion();};}});
showQuestion();updatePassed();$("#year").textContent=new Date().getFullYear();
let deferredPrompt;window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;$("#installBtn").hidden=false;});$("#installBtn").addEventListener("click",async()=>{if(!deferredPrompt)return;deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;$("#installBtn").hidden=true;});
if("serviceWorker" in navigator && location.protocol!=="file:"){window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));}
