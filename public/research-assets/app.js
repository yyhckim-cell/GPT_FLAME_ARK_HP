'use strict';
const $ = (id) => document.getElementById(id);
const GROUPS = ['공통','주관 채널','협의체 채널','자료'];
const GROUP_ICONS = {'전체':'◫','공통':'◈','주관 채널':'▣','협의체 채널':'◎','자료':'▤'};
const GROUP_DESC = {'전체':'연구에 필요한 최신 안내 및 채널 링크를 확인하세요.','공통':'전체 연구진이 함께 확인하는 공지와 일정입니다.','주관 채널':'1~5주관별 협업 채널을 확인하세요.','협의체 채널':'연구 협의체별 논의와 자료를 확인하세요.','자료':'연구개발에 필요한 공통 서식을 확인하세요.'};
let state = {role:'researcher', selectedRole:'researcher', csrf:'', links:[], adminLinks:[], filter:'전체', search:'', view:'dashboard', edit:null, confirmCallback:null, submitting:false};

async function api(path, options={}) {
  const init = {method:options.method||'GET',credentials:'same-origin',headers:{'Accept':'application/json'}};
  if (options.body !== undefined) {
    init.headers['Content-Type']='application/json';
    init.body=JSON.stringify(options.body);
  }
  if (init.method !== 'GET' && path !== '/api/research/login') init.headers['X-CSRF-Token']=state.csrf;
  const res=await fetch(path,init);
  const data=await res.json().catch(()=>({detail:'서버 오류가 발생했습니다.'}));
  if (!res.ok) throw new Error(typeof data.detail==='string'?data.detail:'요청을 처리할 수 없습니다.');
  return data;
}
function el(tag,cls,text) {const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;}
function clear(n){n.replaceChildren();}
function append(parent,...nodes){nodes.forEach(n=>parent.appendChild(n));return parent;}
function showDialog(title,message,callback=null){
  state.confirmCallback=callback;
  $('dialog-title').textContent=title;
  $('dialog-message').textContent=message;
  $('dialog-confirm').textContent=callback?'삭제 확인':'확인';
  $('dialog-backdrop').classList.remove('hidden');
  $('dialog-close').focus();
}
function closeDialog(){ $('dialog-backdrop').classList.add('hidden');state.confirmCallback=null; }
$('dialog-close').addEventListener('click',closeDialog);
$('dialog-confirm').addEventListener('click',async()=>{
  const cb=state.confirmCallback;closeDialog();
  if(cb) await cb();
});
$('dialog-backdrop').addEventListener('click',(e)=>{if(e.target===$('dialog-backdrop'))closeDialog();});
document.addEventListener('keydown',(e)=>{if(e.key==='Escape'&&!$('dialog-backdrop').classList.contains('hidden'))closeDialog();});

for(const b of document.querySelectorAll('.role-option')){
  b.addEventListener('click',()=>{
    state.selectedRole=b.dataset.role;
    document.querySelectorAll('.role-option').forEach(x=>{const active=x===b;x.classList.toggle('selected',active);x.setAttribute('aria-selected',String(active));});
    $('login-error').textContent='';
    $('login-submit-label').textContent=state.selectedRole==='admin'?'관리자 페이지 입장':'연구자 공간 입장';
    $('login-password').placeholder=state.selectedRole==='admin'?'관리자 비밀번호':'공유받은 연구자 비밀번호';
    $('login-password').focus();
  });
}
$('toggle-password').addEventListener('click',()=>{const input=$('login-password'); const b=$('toggle-password'); input.type=input.type==='password'?'text':'password';b.textContent=input.type==='password'?'보기':'숨기기';});
$('login-form').addEventListener('submit',async(e)=>{
  e.preventDefault();
  if (state.submitting) return;
  state.submitting=true;
  $('login-error').textContent='';
  const submit=document.querySelector('#login-form .main-button');
  submit.disabled=true;
  submit.setAttribute('aria-busy','true');
  $('login-submit-label').textContent='로그인 확인 중';
  document.querySelectorAll('.role-option').forEach(button=>{button.disabled=true;});
  const password=$('login-password').value;
  try{
    await api('/api/research/login',{method:'POST',body:{role:state.selectedRole,password}});
    $('login-password').value='';
    await loadSession(true);
  }catch(err){$('login-error').textContent=err.message;}
  finally {
    state.submitting=false;
    submit.disabled=false;
    submit.removeAttribute('aria-busy');
    document.querySelectorAll('.role-option').forEach(button=>{button.disabled=false;});
    $('login-submit-label').textContent=state.selectedRole==='admin'?'관리자 페이지 입장':'연구자 공간 입장';
  }
});
$('logout-btn').addEventListener('click',async()=>{
  try{await api('/api/research/logout',{method:'POST'});}
  catch(err){showDialog('로그아웃 실패',err.message);return;}
  location.replace('/research');
});

async function loadSession(expectLogin = false){
  const ses=await api('/api/research/session');
  if (!ses.authenticated && expectLogin) throw new Error('로그인 세션을 유지할 수 없습니다. 브라우저의 쿠키 허용 설정을 확인한 뒤 다시 시도해 주세요.');
  if (!ses.authenticated){$('login-screen').classList.remove('hidden');$('app-screen').classList.add('hidden');return;}
  state.role=ses.role;state.csrf=ses.csrf;
  $('role-label').textContent=ses.role==='admin'?'관리자':'연구자';
  $('admin-nav-btn').classList.toggle('hidden',ses.role!=='admin');
  await loadLinks();
  $('login-screen').classList.add('hidden');$('app-screen').classList.remove('hidden');
  await showView(ses.role==='admin'&&location.pathname.replace(/\/$/,'')==='/research/admin'?'admin':'dashboard');
}
async function loadLinks(){const r=await api('/api/research/links');state.links=r.items;renderFilters();renderGroups();renderSourceTable();}
async function showView(view){
  if(view==='admin'&&state.role!=='admin')return;
  state.view=view;
  for(const v of ['dashboard','table','admin'])$(v+'-view').classList.toggle('hidden',v!==view);
  document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===view));
  if(view==='admin')await loadAdmin();
  window.scrollTo({top:0,behavior:'instant'});
}
document.querySelectorAll('[data-view]').forEach(btn=>btn.addEventListener('click',()=>showView(btn.dataset.view)));
$('search-input').addEventListener('input',(e)=>{state.search=e.target.value.trim().toLowerCase();renderGroups();});

function renderFilters(){
  const target=$('group-filter');clear(target);
  for(const name of ['전체',...GROUPS]){
    const btn=el('button','filter-button'+(state.filter===name?' active':''));btn.type='button';
    const count = name === '전체' ? state.links.length : state.links.filter(x=>x.group_name===name).length;
    append(btn,el('span','filter-glyph',GROUP_ICONS[name]),el('span','filter-name',name),el('span','filter-count',String(count)));
    btn.setAttribute('aria-label',name+' '+count+'개');
    btn.addEventListener('click',()=>{state.filter=name;renderFilters();renderGroups();});target.appendChild(btn);
  }
}
function renderGroups(){
  const target=$('resource-groups');clear(target);
  $('content-title').textContent=state.filter==='전체'?'전체 연구 자료':state.filter;
  $('content-subtitle').textContent=GROUP_DESC[state.filter];
  let found=0;
  for(const group of GROUPS){
    if(state.filter!=='전체'&&state.filter!==group)continue;
    const items=state.links.filter(x=>x.group_name===group&&(!state.search||(x.title+' '+x.description).toLowerCase().includes(state.search)));
    if(!items.length)continue;
    found+=items.length;
    const sec=el('section');const header=el('div','resource-group-title');append(header,el('h3','',group),el('span','',items.length+'개 메뉴'));sec.appendChild(header);
    const grid=el('div','resource-grid');
    for(const item of items){
      const b=el('button','resource-card'+(item.url?'':' pending'));b.type='button';
      const glyph=group==='공통'?'◈':group==='주관 채널'?'▣':group==='협의체 채널'?'◎':'▤';
      append(b,el('span','card-icon',glyph),el('strong','',item.title),el('span','card-desc',item.description));
      const foot=el('span','card-footer');append(foot,el('span','',item.url?'노션에서 열기':'자료 준비 중'),el('span','arrow',item.url?'↗':'○'));b.appendChild(foot);
      b.addEventListener('click',()=>{if(!item.url){showDialog('소개자료 준비 중','해당 항목은 아직 연결된 자료가 없습니다. 자료 등록 후 이용할 수 있습니다.');} else {window.open(item.url,'_blank','noopener,noreferrer');}});
      grid.appendChild(b);
    }
    sec.appendChild(grid);target.appendChild(sec);
  }
  if(!found)target.appendChild(el('div','empty-group','검색 결과가 없습니다. 검색어 또는 카테고리를 변경해 주세요.'));
}
function renderSourceTable(){
  const target=$('source-table');clear(target);
  const table=el('table','source-table');
  const head=el('thead');const hr=el('tr');['카테고리','1depth','2depth','비고'].forEach(v=>hr.appendChild(el('th','',v)));head.appendChild(hr);table.appendChild(head);
  const body=el('tbody');
  for(const [group,remark] of [['공통','일정, 공지, 참석자 명단, 자료'],['주관 채널','1~5주관 연구 정보, 회의록 및 일정'],['협의체 채널','조직구조, 운영 구조, 회의록, 자료, 협의체 일정'],['자료','서비스정의서, 데이터정의서, 기관별 콘텐츠']]){
    const items=state.links.filter(x=>x.group_name===group);
    items.forEach((item,i)=>{
      const tr=el('tr');
      if(!i){const td=el('td','cat',group);td.rowSpan=items.length;tr.appendChild(td);}
      const col1=el('td');const col2=el('td');const col3=el('td');
      const isChild=(group==='주관 채널'&& /^\d주관$/.test(item.title))||(group==='협의체 채널'&&item.title!=='협의체 채널 (전체)');
      if(isChild){col1.textContent=group==='주관 채널'?'주관 채널':'협의체 채널';}else{col1.textContent=item.title;}
      if(isChild){col2.appendChild(linkOrPending(item));}else{col2.textContent='';if(item.url)col1.appendChild(linkCaption(item.url));}
      if(!item.url&&!isChild)col1.appendChild(el('span','secondary no-link','자료 준비 중'));
      if(i===0){col3.textContent=remark;col3.rowSpan=items.length;}
      tr.appendChild(col1);tr.appendChild(col2);if(i===0)tr.appendChild(col3);body.appendChild(tr);
    });
  }
  table.appendChild(body);target.appendChild(table);
}
function linkCaption(url){const a=el('a','secondary linkish','노션 링크 열기 ↗');a.href=url;a.target='_blank';a.rel='noopener noreferrer';return a;}
function linkOrPending(item){const box=el('div');box.appendChild(el('strong','',item.title));if(item.url)box.appendChild(linkCaption(item.url));else box.appendChild(el('span','secondary no-link','등록된 링크 없음'));return box;}

// 관리자
async function loadAdmin(){
  try{const r=await api('/api/research/admin/links');state.adminLinks=r.items;renderAdminSummary();renderAdminList(); if(!state.edit)resetEditor();}
  catch(err){showDialog('관리자 페이지 오류',err.message);}
}
function renderAdminSummary(){
 const all=state.adminLinks;const data=[['등록된 전체 메뉴',all.length],['노출 중인 메뉴',all.filter(x=>x.is_visible).length],['주소 미등록',all.filter(x=>!x.url).length]];
 const root=$('admin-summary');clear(root);for(const [label,count] of data){const box=el('div','admin-kpi');append(box,el('strong','',String(count)),el('span','',label));root.appendChild(box);}
}
function renderAdminList(){
  const root=$('admin-items');clear(root);const q=$('admin-search').value.toLowerCase();
  for(const item of state.adminLinks.filter(x=>(x.title+' '+x.group_name).toLowerCase().includes(q))){
    const b=el('button','admin-item'+(state.edit===item.id?' selected':''));b.type='button';
    const copy=el('span','admin-item-copy');append(copy,el('strong','',item.title),el('span','',item.group_name+(item.url?' · 링크 등록':' · 링크 미등록')));
    append(b,el('span','admin-item-icon',GROUP_ICONS[item.group_name]||'◇'),copy);
    if(!item.is_visible)b.appendChild(el('span','item-hidden','숨김'));
    b.addEventListener('click',()=>selectEditor(item));root.appendChild(b);
  }
}
$('admin-search').addEventListener('input',renderAdminList);
function resetEditor(){
 state.edit=null;$('item-form').reset();$('edit-id').value='';$('edit-order').value='100';$('edit-visible').value='true';$('editor-title').textContent='새 메뉴 추가';$('delete-item-btn').classList.add('hidden');$('editor-status').textContent='';renderAdminList();
}
function selectEditor(item){
 state.edit=item.id;$('edit-id').value=item.id;$('edit-group').value=item.group_name;$('edit-title').value=item.title;$('edit-description').value=item.description;$('edit-url').value=item.url;$('edit-order').value=item.sort_order;$('edit-visible').value=String(item.is_visible);$('editor-title').textContent='메뉴 수정';$('delete-item-btn').classList.remove('hidden');$('editor-status').textContent='';renderAdminList();
}
$('new-item-btn').addEventListener('click',resetEditor);
$('item-form').addEventListener('submit',async(e)=>{
 e.preventDefault(); const id=Number($('edit-id').value);
 const payload={group_name:$('edit-group').value,title:$('edit-title').value.trim(),description:$('edit-description').value.trim(),url:$('edit-url').value.trim(),sort_order:Number($('edit-order').value),icon:state.adminLinks.find(item=>item.id===id)?.icon||'file',is_visible:$('edit-visible').value==='true'};
 try{
  await api(id?`/api/research/admin/links/${id}`:'/api/research/admin/links',{method:id?'PUT':'POST',body:payload});
  $('editor-status').textContent='저장이 완료되었습니다.';
  await loadLinks();await loadAdmin();
  resetEditor();
 }catch(err){$('editor-status').textContent=err.message;}
});
$('delete-item-btn').addEventListener('click',()=>{
 const id=Number($('edit-id').value);if(!id)return;
 showDialog('메뉴 삭제','이 메뉴를 목록에서 삭제할까요? 삭제한 메뉴는 연구자 화면에서 더 이상 표시되지 않습니다.',async()=>{
  try{await api(`/api/research/admin/links/${id}`,{method:'DELETE'});await loadLinks();state.edit=null;await loadAdmin();resetEditor();}
  catch(err){showDialog('삭제 실패',err.message);}
 });
});
$('password-change-form').addEventListener('submit',async(e)=>{
 e.preventDefault();const status=$('password-change-status');status.textContent='';
 try{await api('/api/research/admin/change-researcher-password',{method:'POST',body:{old_password:$('old-researcher-password').value,new_password:$('new-researcher-password').value}});status.textContent='연구자 비밀번호가 변경되었습니다.';$('password-change-form').reset();}
 catch(err){status.textContent=err.message;}
});
if (location.pathname.replace(/\/$/,'')==='/research/admin') {
  document.querySelector('.role-option[data-role="admin"]').click();
}
loadSession().catch((err)=>{document.querySelector('#login-error').textContent='서버 연결 상태를 확인해 주세요. '+err.message;});
