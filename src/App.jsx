import { useState, useEffect, useMemo, useCallback } from "react";

const SB_URL="https://pdvwndkhbpprxssevbfv.supabase.co";
const SB_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkdnduZGtoYnBwcnhzc2V2YmZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwOTE4NTgsImV4cCI6MjA4OTY2Nzg1OH0.1HmyUinQfWsubaIo0rAJaDpL_jtlt8xIq1o_ZSVN4OU";

async function db(path, opts={}) {
  const h={apikey:SB_KEY,Authorization:"Bearer "+SB_KEY,"Content-Type":"application/json"};
  if(opts.method==="PATCH"||opts.method==="POST") h["Prefer"]="return=representation";
  try {
    const r=await fetch(SB_URL+"/rest/v1/"+path,{...opts,headers:h});
    const t=await r.text();
    return t?JSON.parse(t):[];
  } catch(e){console.error("DB:",e);return null;}
}

const PH=[
"+5492302478883","+5492302576304","+5492302502183","+5492302558826",
"+5492302557959","+5492302545231","+5492302605157","+5491138783069",
"+5491136298101","+5493385463930","+5492302572958","+5492302614304",
"+5492954648869","+5492302696370","+5492954610690",
];

const LOGO='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAACNCAYAAAAzZr2oAAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAAA6aUlEQVR4nO2deZwdVZn3v+dU1V17X5LupLtJAoEskDgQEkAIy4xOULYoiTICCrKMIA7KNuBgJw6IgOgLCoHga5C4kI4oSgLMvCABxiDLCEgSgXQIIUunO+n0dvtuVXXO+0ct995ekoAg4/vm4dOku27dquf86jnPfk7BB0xa68gHfY//r0lrLT5sHg7QATpAB+hvjbTmgO58H0iO/pEWra2te/n8AB2gA3SADtABOkAH6AAdoAN0gEamv5VobV986r8KF++BPmyAhdaaRYsWienTp4v169eH/EyfPl2vX79eAyxevFjt7SJBxDnSNQAWLFighBDwITyIvxrAWmuxaNEigR+eb9iwQa9cudLdz+9KgEWLFrF48WIAWoFF2sNLCLHXBxCQ/yCCaylACyE+UNA/MID9RLtYtGiRHA1MrbWxZMmS2r6+vkYhRJNpmi2WZTUB9UCVlGKs1pjRaKReKS20UrgIpACERgqJFFJnMpldhmG4juN0CSH6tNZdjuNs11pvj8fjW8vKxLYvfnHMLiEWDuMhAH369Onal/T3FfD3FWCttVi5cqUEWLiwdDBr166Nr1v3x0n5vDs9m7WPtCxrejQaPcw0zbGWZVUkk0kqKiqIx+OYEYuIaWGaJqZpIoTAMAyEIREYACgcUBrXcUGA4ypc28FxbGzbJp1OkxpMk0lnyOTSqfTgYIedt98G1kUikdeUUq81N8ffOPPMCweK+SyScrUv1bQ/9BcDPBqoa9eujb/88guHu6480XGc46LR6N8lE8mWmtoaEYlEicViJBJxIpEIQgiElK6UUkshQArQIED4utP7VwrQEgEoXE+jao2QQiMkaDRaobVGCAFCCtfVUmlH2HaeXCZLLpcnm82xa1cXff19Ox3bWS+lfiYWizxXV9fw4vz584+J+SyScrUv1bQ/9BcDPBqoa9eujb/88guHu6480XGc46LR6N8lE8mWmtoaEYlEicViJBJxIpEIQgiElK6UUkshQArQIED4utP7VwrQEgEoXE+jao2QQiMkaDRaobVGCAFCCtfVUmlH2HaeXCZLLpcnm82xa1cXff19Ox3bWS+lfiYWizxXV9fw4vz584+J+SyScrUv1bQ/9BcDPBqoa9eujb/88guHu6480XGc46LR6N8lE8mWmtoaEYlEicViJBJxIpEIQgiElK6UUkshQArQIED4utP7VwrQEgEoXE+jao2QQiMkaDRaobVGCAFCCtfVUmlH2HaeXCZLLpcnm82xa1cXff19Ox3bWS+lfiYWizxXV9fw4vz584+J+SyScrUv1bQ/9BcDPBqoa9eujb/88guHu6480XGc46LR6N8lE8mWmtoaEYlEicViJBJxIpEIQgiElK6UUkshQArQIED4utP7VwrQEgEoXE+jao2QQiMkaDRaobVGCAFCCtfVUmlH2HaeXCZLLpcnm82xa1cXff19Ox3bWS+lfiYWizxXV9fw4vz584+J';
const FH="'Oswald',sans-serif";

const PHASE_LABELS={
  "round_of_32":"16avos",
  "round_of_16":"8vos",
  "quarter_finals":"Cuartos",
  "semi_finals":"Semis",
  "third_place":"3er Puesto",
  "final":"Final",
};

const fmtD=function(u){try{return new Date(u).toLocaleString("es-AR",{timeZone:"America/Argentina/Buenos_Aires",weekday:"short",day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit",hour12:false})}catch(e){return""}};
const isPast=function(u){return new Date(u)<new Date()};
function calcP(ph,pa,ah,aa){var pR=ph>pa?"H":ph<pa?"A":"D",aR=ah>aa?"H":ah<aa?"A":"D";var r=0,e=0,g=0;if(pR===aR){r=2;if(ph===ah&&pa===aa)e=3;else{if(ph===ah)g++;if(pa===aa)g++;}}else{if(ph===ah)g++;if(pa===aa)g++;}return{r:r,e:e,g:g,t:r+e+g};}

function Fl(props){
  var t=props.t;var sz=props.size||28;
  if(!t||!t.flag_url)return <div style={{width:sz,height:Math.round(sz*.66),background:"#1f2d42",borderRadius:3,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:7,color:"#6b7a94",flexShrink:0}}>TBD</div>;
  return <img src={t.flag_url} alt={t.code||""} style={{width:sz,height:Math.round(sz*.66),objectFit:"cover",borderRadius:3,border:"1px solid rgba(255,255,255,0.12)",display:"block",flexShrink:0}}/>;
}

function SaveIcon(){return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>;}
function SearchIcon(props){return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={props.on?"#fff":"#6b7a94"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;}
function Toast(props){return <div style={{position:"fixed",bottom:20,left:"50%",transform:"translateX(-50%)",background:"#22c55e",color:"#fff",padding:"8px 20px",borderRadius:50,fontSize:12,fontWeight:600,zIndex:999,boxShadow:"0 4px 16px rgba(0,0,0,.5)",whiteSpace:"nowrap"}}>{props.m}</div>;}

// ─── BRACKET COMPONENT ───────────────────────────────────────────────────────
function BracketCard({home, away, w}){
  w=w||130;
  const cardStyle={background:"#131927",border:"1px solid #1f2d42",borderRadius:6,overflow:"hidden",width:w,flexShrink:0};
  const rowStyle={display:"flex",alignItems:"center",gap:4,padding:"4px 6px",minHeight:22};
  const row1={...rowStyle,borderBottom:"1px solid #1f2d42"};
  function TeamRow({team, style}){
    if(!team||!team.name){
      return <div style={style}><div style={{width:16,height:11,background:"#1f2d42",borderRadius:2,flexShrink:0}}></div><span style={{fontSize:10,color:"#4a5568",fontStyle:"italic",flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>Por definir</span>{team&&team.goals!=null?<span style={{fontSize:11,fontWeight:800,fontFamily:FH,color:"#d4af37",minWidth:10,textAlign:"right"}}>{team.goals}</span>:null}</div>;
    }
    return <div style={style}>
      {team.flag?<img src={team.flag} alt="" style={{width:16,height:11,objectFit:"cover",borderRadius:2,flexShrink:0,border:"1px solid rgba(255,255,255,0.1)"}} onError={function(e){e.target.style.display="none"}}/>:<div style={{width:16,height:11,background:"#1f2d42",borderRadius:2,flexShrink:0}}></div>}
      <span style={{fontSize:10,fontWeight:600,flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",color:"#e8ecf4"}}>{team.name}</span>
      {team.goals!=null?<span style={{fontSize:11,fontWeight:800,fontFamily:FH,color:"#d4af37",minWidth:10,textAlign:"right"}}>{team.goals}</span>:null}
    </div>;
  }
  return <div style={cardStyle}>
    <TeamRow team={home} style={row1}/>
    <TeamRow team={away} style={rowStyle}/>
  </div>;
}

function KnockoutBracket({matches, teams}){
  const [bracketView, setBracketView]=useState("full");

  function T(id){return id?teams.find(function(t){return t.id===id})||null:null;}

  function matchToSlot(m){
    if(!m) return {home:null,away:null};
    var ht=T(m.team_home_id), at=T(m.team_away_id);
    return {
      home: ht?{name:ht.name,flag:ht.flag_url,goals:m.home_goals}:null,
      away: at?{name:at.name,flag:at.flag_url,goals:m.away_goals}:null,
    };
  }

  var r32=matches.filter(function(m){return m.phase==="round_of_32"}).sort(function(a,b){return a.phase_order-b.phase_order});
  var r16=matches.filter(function(m){return m.phase==="round_of_16"}).sort(function(a,b){return a.phase_order-b.phase_order});
  var qf=matches.filter(function(m){return m.phase==="quarter_finals"}).sort(function(a,b){return a.phase_order-b.phase_order});
  var sf=matches.filter(function(m){return m.phase==="semi_finals"}).sort(function(a,b){return a.phase_order-b.phase_order});
  var fin=matches.find(function(m){return m.phase==="final"});
  var third=matches.find(function(m){return m.phase==="third_place"});

  // Phase filter view
  if(bracketView!=="full"){
    var phaseMap={"r32":"round_of_32","r16":"round_of_16","qf":"quarter_finals","sf":"semi_finals","final":"final"};
    var phaseMatches=matches.filter(function(m){return m.phase===phaseMap[bracketView]});
    return <div>
      <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:12}}>
        {[["full","Completo"],["r32","16avos"],["r16","8vos"],["qf","Cuartos"],["sf","Semis"],["final","Final"]].map(function(x){
          return <button key={x[0]} onClick={function(){setBracketView(x[0])}} style={{background:bracketView===x[0]?"#d4af37":"#131927",border:bracketView===x[0]?"1px solid #d4af37":"1px solid #1f2d42",color:bracketView===x[0]?"#000":"#6b7a94",padding:"5px 10px",borderRadius:5,fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:FH}}>{x[1]}</button>;
        })}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {phaseMatches.map(function(m){
          var s=matchToSlot(m);
          return <div key={m.id} style={{background:"#131927",border:"1px solid #1f2d42",borderRadius:8,padding:"10px 12px"}}>
            <div style={{fontSize:9,color:"#6b7a94",marginBottom:6}}>{PHASE_LABELS[m.phase]||m.phase} · {fmtD(m.kickoff_at)}</div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{display:"flex",alignItems:"center",gap:5,flex:1,justifyContent:"flex-end"}}>
                <span style={{fontSize:12,fontWeight:600,color:"#e8ecf4"}}>{s.home?s.home.name:<span style={{color:"#4a5568",fontStyle:"italic"}}>Por definir</span>}</span>
                {s.home&&s.home.flag?<img src={s.home.flag} style={{width:22,height:15,objectFit:"cover",borderRadius:2,border:"1px solid rgba(255,255,255,0.1)"}} alt="" onError={function(e){e.target.style.display="none"}}/>:<div style={{width:22,height:15,background:"#1f2d42",borderRadius:2}}></div>}
              </div>
              <div style={{minWidth:50,textAlign:"center"}}>
                {m.home_goals!=null?<span style={{fontSize:18,fontWeight:800,fontFamily:FH,color:"#d4af37"}}>{m.home_goals} - {m.away_goals}</span>:<span style={{fontSize:10,color:"#4a5568"}}>vs</span>}
              </div>
              <div style={{display:"flex",alignItems:"center",gap:5,flex:1}}>
                {s.away&&s.away.flag?<img src={s.away.flag} style={{width:22,height:15,objectFit:"cover",borderRadius:2,border:"1px solid rgba(255,255,255,0.1)"}} alt="" onError={function(e){e.target.style.display="none"}}/>:<div style={{width:22,height:15,background:"#1f2d42",borderRadius:2}}></div>}
                <span style={{fontSize:12,fontWeight:600,color:"#e8ecf4"}}>{s.away?s.away.name:<span style={{color:"#4a5568",fontStyle:"italic"}}>Por definir</span>}</span>
              </div>
            </div>
          </div>;
        })}
        {phaseMatches.length===0&&<div style={{color:"#4a5568",textAlign:"center",fontSize:12,padding:20}}>Fase aún no disponible</div>}
      </div>
    </div>;
  }

  // Full bracket SVG
  const CARD_W=130, CARD_H=42, GAP=30;
  const COL=CARD_W+GAP;
  const SVG_H=820, LBL=20, OY=LBL;
  function cy(round,idx){var slots={r32:SVG_H/8,r16:SVG_H/4,qf:SVG_H/2,sf:SVG_H};return slots[round]*idx+slots[round]/2+OY;}

  const colX={lr32:0,lr16:COL,lqf:COL*2,lsf:COL*3,fin:COL*4,rsf:COL*4+CARD_W+GAP*2,rqf:COL*4+CARD_W+GAP*2+COL,rr16:COL*4+CARD_W+GAP*2+COL*2,rr32:COL*4+CARD_W+GAP*2+COL*3};
  const TW=colX.rr32+CARD_W;
  const LC="rgba(100,120,160,0.4)";

  function Line({x1,y1,x2,y2}){return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={LC} strokeWidth="1.5"/>;}
  function PairConn({x1,ya,yb,x2,yt,dir}){
    var mid=(ya+yb)/2;
    var mx=dir==="r"?x1+GAP*0.55:x1-GAP*0.55;
    return <g><Line x1={x1} y1={ya} x2={mx} y2={ya}/><Line x1={x1} y1={yb} x2={mx} y2={yb}/><Line x1={mx} y1={ya} x2={mx} y2={yb}/><Line x1={mx} y1={mid} x2={x2} y2={yt}/></g>;
  }
  function Lbl({x,text}){return <text x={x+CARD_W/2} y={12} textAnchor="middle" fontSize="9" fontWeight="600" fill="#6b7a94" fontFamily="sans-serif" letterSpacing="0.07em" textTransform="uppercase">{text}</text>;}

  // build slots
  var leftSlots=r32.slice(0,8);
  var rightSlots=r32.slice(8,16);

  function ForeignCard({x,y,slot,w}){
    var s=slot||{home:null,away:null};
    return <foreignObject x={x} y={y-CARD_H/2} width={w||CARD_W} height={CARD_H}>
      <BracketCard home={s.home} away={s.away} w={w||CARD_W}/>
    </foreignObject>;
  }

  // Build r16/qf/sf TBD slots
  var lr16slots=[0,1,2,3].map(function(i){return r16[i]?matchToSlot(r16[i]):{home:null,away:null};});
  var lqfslots=[0,1].map(function(i){return qf[i]?matchToSlot(qf[i]):{home:null,away:null};});
  var lsfslot=sf[0]?matchToSlot(sf[0]):{home:null,away:null};
  var rsfslot=sf[1]?matchToSlot(sf[1]):{home:null,away:null};
  var rqfslots=[0,1].map(function(i){return qf[i+2]?matchToSlot(qf[i+2]):{home:null,away:null};});
  var rr16slots=[0,1,2,3].map(function(i){return r16[i+4]?matchToSlot(r16[i+4]):{home:null,away:null};});
  var finSlot=fin?matchToSlot(fin):{home:null,away:null};
  var thirdSlot=third?matchToSlot(third):{home:null,away:null};

  return <div>
    <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:10}}>
      {[["full","Completo"],["r32","16avos"],["r16","8vos"],["qf","Cuartos"],["sf","Semis"],["final","Final"]].map(function(x){
        return <button key={x[0]} onClick={function(){setBracketView(x[0])}} style={{background:bracketView===x[0]?"#d4af37":"#131927",border:bracketView===x[0]?"1px solid #d4af37":"1px solid #1f2d42",color:bracketView===x[0]?"#000":"#6b7a94",padding:"5px 10px",borderRadius:5,fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:FH}}>{x[1]}</button>;
      })}
    </div>
    <div style={{overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
      <svg width={TW} height={SVG_H+LBL} xmlns="http://www.w3.org/2000/svg">
        {/* Labels */}
        <Lbl x={colX.lr32} text="16AVOS"/>
        <Lbl x={colX.lr16} text="8VOS"/>
        <Lbl x={colX.lqf} text="CUARTOS"/>
        <Lbl x={colX.lsf} text="SEMIS"/>
        <Lbl x={colX.fin} text="FINAL"/>
        <Lbl x={colX.rsf} text="SEMIS"/>
        <Lbl x={colX.rqf} text="CUARTOS"/>
        <Lbl x={colX.rr16} text="8VOS"/>
        <Lbl x={colX.rr32} text="16AVOS"/>

        {/* LEFT R32 cards */}
        {leftSlots.map(function(m,i){return <ForeignCard key={"lr32_"+i} x={colX.lr32} y={cy("r32",i)} slot={matchToSlot(m)}/>;}) }
        {/* LEFT R16 */}
        {lr16slots.map(function(s,i){return <ForeignCard key={"lr16_"+i} x={colX.lr16} y={cy("r16",i)} slot={s}/>;}) }
        {/* LEFT QF */}
        {lqfslots.map(function(s,i){return <ForeignCard key={"lqf_"+i} x={colX.lqf} y={cy("qf",i)} slot={s}/>;}) }
        {/* LEFT SF */}
        <ForeignCard x={colX.lsf} y={cy("sf",0)} slot={lsfslot}/>
        {/* FINAL */}
        <ForeignCard x={colX.fin} y={cy("sf",0)} slot={finSlot} w={CARD_W}/>
        {/* THIRD */}
        <rect x={colX.fin} y={cy("sf",0)+CARD_H/2+10} width={CARD_W} height={CARD_H+8} rx="5" fill="#131927" stroke="#1f2d42" strokeWidth="0.5"/>
        <text x={colX.fin+CARD_W/2} y={cy("sf",0)+CARD_H/2+22} textAnchor="middle" fontSize="8" fill="#6b7a94" fontFamily="sans-serif" letterSpacing="0.06em">3ER PUESTO · 18 JUL</text>
        <foreignObject x={colX.fin} y={cy("sf",0)+CARD_H/2+24} width={CARD_W} height={CARD_H}>
          <BracketCard home={thirdSlot.home} away={thirdSlot.away} w={CARD_W}/>
        </foreignObject>
        {/* RIGHT SF */}
        <ForeignCard x={colX.rsf} y={cy("sf",0)} slot={rsfslot}/>
        {/* RIGHT QF */}
        {rqfslots.map(function(s,i){return <ForeignCard key={"rqf_"+i} x={colX.rqf} y={cy("qf",i)} slot={s}/>;}) }
        {/* RIGHT R16 */}
        {rr16slots.map(function(s,i){return <ForeignCard key={"rr16_"+i} x={colX.rr16} y={cy("r16",i)} slot={s}/>;}) }
        {/* RIGHT R32 */}
        {rightSlots.map(function(m,i){return <ForeignCard key={"rr32_"+i} x={colX.rr32} y={cy("r32",i)} slot={matchToSlot(m)}/>;}) }

        {/* LEFT CONNECTORS */}
        {[[0,1,0],[2,3,1],[4,5,2],[6,7,3]].map(function(arr,i){
          return <PairConn key={"lc32_"+i} x1={colX.lr32+CARD_W} ya={cy("r32",arr[0])} yb={cy("r32",arr[1])} x2={colX.lr16} yt={cy("r16",arr[2])} dir="r"/>;
        })}
        {[[0,1,0],[2,3,1]].map(function(arr,i){
          return <PairConn key={"lc16_"+i} x1={colX.lr16+CARD_W} ya={cy("r16",arr[0])} yb={cy("r16",arr[1])} x2={colX.lqf} yt={cy("qf",arr[2])} dir="r"/>;
        })}
        <PairConn x1={colX.lqf+CARD_W} ya={cy("qf",0)} yb={cy("qf",1)} x2={colX.lsf} yt={cy("sf",0)} dir="r"/>
        <Line x1={colX.lsf+CARD_W} y1={cy("sf",0)} x2={colX.fin} y2={cy("sf",0)}/>

        {/* RIGHT CONNECTORS */}
        {[[0,1,0],[2,3,1],[4,5,2],[6,7,3]].map(function(arr,i){
          return <PairConn key={"rc32_"+i} x1={colX.rr32} ya={cy("r32",arr[0])} yb={cy("r32",arr[1])} x2={colX.rr16+CARD_W} yt={cy("r16",arr[2])} dir="l"/>;
        })}
        {[[0,1,0],[2,3,1]].map(function(arr,i){
          return <PairConn key={"rc16_"+i} x1={colX.rr16} ya={cy("r16",arr[0])} yb={cy("r16",arr[1])} x2={colX.rqf+CARD_W} yt={cy("qf",arr[2])} dir="l"/>;
        })}
        <PairConn x1={colX.rqf} ya={cy("qf",0)} yb={cy("qf",1)} x2={colX.rsf+CARD_W} yt={cy("sf",0)} dir="l"/>
        <Line x1={colX.rsf} y1={cy("sf",0)} x2={colX.fin+CARD_W} y2={cy("sf",0)}/>

        {/* Final date label */}
        <rect x={colX.fin} y={cy("sf",0)-CARD_H/2-14} width={CARD_W} height={12} rx="3" fill="#185FA5"/>
        <text x={colX.fin+CARD_W/2} y={cy("sf",0)-CARD_H/2-5} textAnchor="middle" fontSize="8" fontWeight="600" fill="#ffffff" fontFamily="sans-serif" letterSpacing="0.07em">FINAL · 19 JUL</text>
      </svg>
    </div>
  </div>;
}
// ─── END BRACKET ─────────────────────────────────────────────────────────────

export default function App(){
  var _s=useState,_e=useEffect,_m=useMemo,_c=useCallback;
  var s1=_s("login"),vw=s1[0],setVw=s1[1];
  var s2=_s(null),me=s2[0],setMe=s2[1];
  var s3=_s([]),teams=s3[0],setTeams=s3[1];
  var s4=_s([]),matches=s4[0],setMatches=s4[1];
  var s5=_s([]),players=s5[0],setPlayers=s5[1];
  var s6=_s([]),preds=s6[0],setPreds=s6[1];
  var s7=_s(""),toast=s7[0],setToast=s7[1];
  var s8=_s("all"),sg=s8[0],setSg=s8[1];
  var s9=_s({}),ed=s9[0],setEd=s9[1];
  var s10=_s(false),ok=s10[0],setOk=s10[1];
  var s11=_s(""),lp=s11[0],setLp=s11[1];
  var s12=_s(""),rn2=s12[0],setRn2=s12[1];
  var s13=_s(""),rp2=s13[0],setRp2=s13[1];
  var s14=_s(""),cp=s14[0],setCp=s14[1];
  var s15=_s(null),exp=s15[0],setExp=s15[1];
  var s16=_s(""),errMsg=s16[0],setErrMsg=s16[1];
  var s17=_s(""),loginPin=s17[0],setLoginPin=s17[1];
  var s18=_s(""),regPin=s18[0],setRegPin=s18[1];

  var fl=function(m){setToast(m);setTimeout(function(){setToast("")},2500)};

  var load=_c(async function(){
    var res=await Promise.all([
      db("teams?order=group_id,name"),
      db("matches?order=match_number"),
      db("players?order=name"),
      db("predictions"),
    ]);
    if(!res[0]||!res[1]){setErrMsg("Error cargando datos. Reintentá.");return;}
    setTeams(res[0]||[]);setMatches(res[1]||[]);setPlayers(res[2]||[]);setPreds(res[3]||[]);
    setErrMsg("");setOk(true);
    var sid=localStorage.getItem("prode_sid");
    if(sid&&res[2]){var p=(res[2]||[]).find(function(x){return x.id===sid});if(p){setMe(p);setVw("home");}}
  },[]);

  _e(function(){load()},[load]);

  var T=function(id){return teams.find(function(t){return t.id===id})||{name:"TBD",code:"?",flag_url:null}};
  var GROUPS=_m(function(){var gs=[];teams.forEach(function(t){if(t.group_id&&gs.indexOf(t.group_id)===-1)gs.push(t.group_id)});return gs.sort()},[teams]);

  var doLogin=async function(){
    var ph=lp.trim();if(!ph)return fl("Ingresá teléfono");
    var pin=loginPin.trim();if(!pin||pin.length<4)return fl("Ingresá tu PIN (4 dígitos)");
    var p=players.find(function(x){return x.phone===ph});
    if(!p)return fl("Teléfono no registrado");
    if(!p.pin)return fl("Todavía no te registraste. Tocá Registrate.");
    if(p.pin!==pin)return fl("PIN incorrecto");
    setMe(p);localStorage.setItem("prode_sid",p.id);setVw("home");
  };
  var doReg=async function(){
    var nm=rn2.trim(),ph=rp2.trim(),pin=regPin.trim();
    if(!nm||!ph||!pin)return fl("Completá nombre, teléfono y PIN");
    if(pin.length<4)return fl("El PIN debe tener al menos 4 dígitos");
    if(PH.indexOf(ph)===-1)return fl("Número no autorizado");
    var existing=players.find(function(x){return x.phone===ph});
    if(existing&&existing.pin)return fl("Ya registrado. Usá Entrar.");
    if(existing){await db("players?id=eq."+existing.id,{method:"PATCH",body:JSON.stringify({name:nm,pin:pin})});var updated=Object.assign({},existing,{name:nm,pin:pin});setMe(updated);localStorage.setItem("prode_sid",updated.id);await load();setVw("home");fl("¡Bienvenido!");return;}
    var r=await db("players",{method:"POST",body:JSON.stringify({name:nm,phone:ph,pin:pin})});
    if(r&&r[0]){setMe(r[0]);localStorage.setItem("prode_sid",r[0].id);await load();setVw("home");fl("¡Bienvenido!");}
    else fl("Error al registrar");
  };
  var doOut=function(){setMe(null);localStorage.removeItem("prode_sid");setVw("login")};

  var firstKick=_m(function(){if(!matches.length)return null;var gm=matches.filter(function(m){return m.phase==="groups"});if(!gm.length)return null;return gm.reduce(function(a,b){return b.kickoff_at<a?b.kickoff_at:a},gm[0].kickoff_at)},[matches]);
  var canCh=firstKick&&!isPast(firstKick);
  var doChamp=async function(){
    if(!cp)return;
    await db("players?id=eq."+me.id,{method:"PATCH",body:JSON.stringify({champion_pick:cp,champion_pick_at:new Date().toISOString()})});
    setMe(Object.assign({},me,{champion_pick:cp}));fl("🏆 Campeón guardado");await load();
  };

  var myP=_m(function(){if(!me)return{};var m={};preds.filter(function(p){return p.player_id===me.id}).forEach(function(p){m[p.match_id]=p});return m},[preds,me]);

  var doEd=function(mid,f,v){setEd(function(p){var n=Object.assign({},p);n[mid]=Object.assign({},n[mid]||{});n[mid][f]=Math.max(0,Math.min(20,parseInt(v)||0));return n})};
  var doSave=async function(mid){
    var e=ed[mid];if(!e||e.h==null||e.a==null)return fl("Completá ambos goles");
    var m=matches.find(function(x){return x.id===mid});if(isPast(m.kickoff_at))return fl("Partido ya empezó");
    var existing=myP[mid];
    if(existing){await db("predictions?id=eq."+existing.id,{method:"PATCH",body:JSON.stringify({predicted_home_goals:e.h,predicted_away_goals:e.a})});}
    else{await db("predictions",{method:"POST",body:JSON.stringify({player_id:me.id,match_id:mid,predicted_home_goals:e.h,predicted_away_goals:e.a})});}
    fl("✅ Guardado");setEd(function(p){var n=Object.assign({},p);delete n[mid];return n});await load();
  };

  var stand=_m(function(){
    var done=matches.filter(function(m){return m.home_goals!=null});
    return players.map(function(p){
      var pp=preds.filter(function(x){return x.player_id===p.id});
      var t=0,r=0,e=0,g=0;
      done.forEach(function(m){
        var pr=pp.find(function(x){return x.match_id===m.id});if(!pr)return;
        var pts=calcP(pr.predicted_home_goals,pr.predicted_away_goals,m.home_goals,m.away_goals);
        t+=pts.t;if(pts.r)r++;if(pts.e)e++;if(pts.g&&!pts.e)g++;
      });
      return Object.assign({},p,{t:t,r:r,e:e,g:g});
    }).sort(function(a,b){return b.t-a.t||b.e-a.e||a.name.localeCompare(b.name)});
  },[players,preds,matches]);

  var gm=_m(function(){var o={};matches.filter(function(m){return m.phase==="groups"}).forEach(function(m){if(!o[m.group_id])o[m.group_id]=[];o[m.group_id].push(m)});return o},[matches]);
  var finM=_m(function(){return matches.filter(function(m){return m.home_goals!=null}).sort(function(a,b){return b.match_number-a.match_number})},[matches]);
  var knockoutMatches=_m(function(){return matches.filter(function(m){return m.phase!=="groups"})},[matches]);

  var renderMatch=function(m,showSave){
    var ht=T(m.team_home_id),at=T(m.team_away_id);
    var pr=myP[m.id];var e=ed[m.id]||{};var lk=isPast(m.kickoff_at);var dn=m.home_goals!=null;
    var pt=null;if(dn&&pr)pt=calcP(pr.predicted_home_goals,pr.predicted_away_goals,m.home_goals,m.away_goals);
    var phaseLabel=m.phase==="groups"?"Grupo "+(m.group_id||""):(PHASE_LABELS[m.phase]||m.phase);
    return(
      <div key={m.id} style={{background:dn?"#1a2235":"#131927",borderRadius:10,padding:"10px 12px",marginBottom:7,border:pt&&pt.e?"2px solid #d4af37":pt&&pt.r?"2px solid #2d7af6":"1px solid #1f2d42",position:"relative"}}>
        {pt&&pt.e>0?<div style={{position:"absolute",top:0,right:0,background:"#d4af37",color:"#000",fontSize:8,fontWeight:800,padding:"1px 8px",borderRadius:"0 10px 0 8px"}}>EXACTO +{pt.t}</div>:null}
        {pt&&!pt.e&&pt.r>0?<div style={{position:"absolute",top:0,right:0,background:"#2d7af6",color:"#fff",fontSize:8,fontWeight:800,padding:"1px 8px",borderRadius:"0 10px 0 8px"}}>RESULTADO +{pt.t}</div>:null}
        {pt&&!pt.r&&pt.g>0?<div style={{position:"absolute",top:0,right:0,background:"#4a5568",color:"#fff",fontSize:8,fontWeight:800,padding:"1px 8px",borderRadius:"0 10px 0 8px"}}>PARCIAL +{pt.t}</div>:null}
        <div style={{fontSize:9,color:"#6b7a94",marginBottom:6,display:"flex",justifyContent:"space-between"}}><span>#{m.match_number} · {phaseLabel}</span><span>{fmtD(m.kickoff_at)}</span></div>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <div style={{display:"flex",alignItems:"center",gap:5,flex:1,justifyContent:"flex-end",minWidth:0}}><span style={{fontSize:12,fontWeight:600,textAlign:"right",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{ht.name}</span><Fl t={ht} size={28}/></div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",minWidth:70}}>
            {dn?<div style={{display:"flex",gap:5,alignItems:"center"}}><span style={{fontSize:20,fontWeight:800,fontFamily:FH}}>{m.home_goals}</span><span style={{fontSize:12,color:"#6b7a94"}}>-</span><span style={{fontSize:20,fontWeight:800,fontFamily:FH}}>{m.away_goals}</span></div>
            :lk?(pr?<div style={{display:"flex",gap:4,opacity:.65,alignItems:"center",background:"#1a2235",padding:"3px 8px",borderRadius:5}}><span style={{fontSize:15,fontWeight:700,fontFamily:FH}}>{pr.predicted_home_goals}</span><span style={{fontSize:10,color:"#6b7a94"}}>-</span><span style={{fontSize:15,fontWeight:700,fontFamily:FH}}>{pr.predicted_away_goals}</span><span style={{fontSize:9}}>🔒</span></div>:<span style={{fontSize:9,color:"#6b7a94",fontStyle:"italic"}}>Sin pron. 🔒</span>)
            :<div style={{display:"flex",alignItems:"center",gap:3}}><input type="number" min={0} max={20} value={e.h!=null?e.h:(pr?pr.predicted_home_goals:"")} onChange={function(x){doEd(m.id,"h",x.target.value)}} style={ni} placeholder="-"/><span style={{fontWeight:700,color:"#6b7a94",fontSize:12}}>-</span><input type="number" min={0} max={20} value={e.a!=null?e.a:(pr?pr.predicted_away_goals:"")} onChange={function(x){doEd(m.id,"a",x.target.value)}} style={ni} placeholder="-"/></div>}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:5,flex:1,minWidth:0}}><Fl t={at} size={28}/><span style={{fontSize:12,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{at.name}</span></div>
          {showSave&&!dn&&!lk?<button onClick={function(){doSave(m.id)}} title="Guardar" style={{background:"#22c55e",border:"none",borderRadius:6,cursor:"pointer",padding:"5px 8px",display:"flex",alignItems:"center",flexShrink:0,marginLeft:2}}><SaveIcon/></button>:null}
        </div>
        {dn&&pr?<div style={{fontSize:9,color:"#4ade80",textAlign:"center",marginTop:3}}>Tu pronóstico: {pr.predicted_home_goals} - {pr.predicted_away_goals}</div>:null}
      </div>
    );
  };

  var renderResult=function(m){
    if(m.home_goals==null)return null;
    var ht=T(m.team_home_id),at=T(m.team_away_id);var isE=exp===m.id;
    var phaseLabel=m.phase==="groups"?"Grupo "+(m.group_id||""):(PHASE_LABELS[m.phase]||m.phase);
    var ppData=players.map(function(p){
      var pr=preds.find(function(x){return x.player_id===p.id&&x.match_id===m.id});
      if(!pr)return Object.assign({},p,{pr:null,pt:null});
      return Object.assign({},p,{pr:pr,pt:calcP(pr.predicted_home_goals,pr.predicted_away_goals,m.home_goals,m.away_goals)});
    }).sort(function(a,b){return(b.pt?b.pt.t:0)-(a.pt?a.pt.t:0)});
    return(
      <div key={m.id} style={{background:"#131927",borderRadius:10,marginBottom:8,border:"1px solid #1f2d42",overflow:"hidden"}}>
        <div style={{padding:"10px 12px",display:"flex",alignItems:"center",gap:6}}>
          <div style={{display:"flex",alignItems:"center",gap:5,flex:1,justifyContent:"flex-end",minWidth:0}}><span style={{fontSize:12,fontWeight:600,textAlign:"right",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{ht.name}</span><Fl t={ht} size={26}/></div>
          <div style={{display:"flex",gap:5,alignItems:"center",minWidth:60,justifyContent:"center"}}><span style={{fontSize:20,fontWeight:800,fontFamily:FH}}>{m.home_goals}</span><span style={{fontSize:12,color:"#6b7a94"}}>-</span><span style={{fontSize:20,fontWeight:800,fontFamily:FH}}>{m.away_goals}</span></div>
          <div style={{display:"flex",alignItems:"center",gap:5,flex:1,minWidth:0}}><Fl t={at} size={26}/><span style={{fontSize:12,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{at.name}</span></div>
          <button onClick={function(){setExp(isE?null:m.id)}} style={{background:isE?"#2d7af6":"#1a2235",border:"none",borderRadius:6,cursor:"pointer",padding:"5px 7px",flexShrink:0,display:"flex",alignItems:"center"}}><SearchIcon on={isE}/></button>
        </div>
        <div style={{fontSize:8,color:"#6b7a94",padding:"0 12px 6px",marginTop:-4}}>#{m.match_number} · {phaseLabel} · {fmtD(m.kickoff_at)}</div>
        {isE?<div style={{borderTop:"1px solid #1f2d42",padding:"8px 12px",background:"#0d1117"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 60px 50px",gap:4,marginBottom:4}}><span style={{fontSize:9,fontWeight:700,color:"#6b7a94"}}>JUGADOR</span><span style={{fontSize:9,fontWeight:700,color:"#6b7a94",textAlign:"center"}}>PRON.</span><span style={{fontSize:9,fontWeight:700,color:"#6b7a94",textAlign:"center"}}>PTS</span></div>
          {ppData.map(function(p){return <div key={p.id} style={{display:"grid",gridTemplateColumns:"1fr 60px 50px",gap:4,padding:"4px 0",borderBottom:"1px solid #1a2235",alignItems:"center"}}>
            <span style={{fontSize:11,fontWeight:p.id===(me?me.id:null)?700:400,color:p.id===(me?me.id:null)?"#2d7af6":"#e8ecf4"}}>{p.name}</span>
            <span style={{fontSize:11,textAlign:"center",color:p.pr?"#e8ecf4":"#4a5568",fontFamily:FH,fontWeight:600}}>{p.pr?p.pr.predicted_home_goals+" - "+p.pr.predicted_away_goals:"—"}</span>
            <span style={{textAlign:"center",fontSize:12,fontWeight:800,fontFamily:FH,color:p.pt?(p.pt.e?"#d4af37":p.pt.r?"#2d7af6":p.pt.g?"#9ca3af":"#4a5568"):"#4a5568"}}>{p.pt?(p.pt.t>0?"+"+p.pt.t:"0"):"—"}</span>
          </div>})}
        </div>:null}
      </div>
    );
  };

  if(errMsg)return(<div style={rt}><style>{CSS}</style><div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",padding:32,textAlign:"center"}}><div style={{fontSize:48,marginBottom:16}}>⚠️</div><p style={{color:"#6b7a94",fontSize:14,marginBottom:16}}>{errMsg}</p><button onClick={function(){setErrMsg("");load()}} style={{padding:"10px 30px",background:"#2d7af6",border:"none",borderRadius:7,color:"#fff",fontWeight:700,cursor:"pointer"}}>Reintentar</button></div></div>);

  if(!ok)return(<div style={rt}><style>{CSS}</style><div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",gap:14}}><img src={LOGO} alt="Leyendas" style={{width:70,height:70,objectFit:"contain"}}/><p style={{color:"#6b7a94",fontSize:13}}>Cargando Prode Leyendas 2026...</p></div></div>);

  if(vw==="login"||vw==="register")return(
    <div style={rt}><style>{CSS}</style>
    <div style={{maxWidth:340,margin:"0 auto",padding:"50px 20px"}}>
      <div style={{textAlign:"center",marginBottom:24}}>
        <img src={LOGO} alt="Leyendas" style={{width:90,height:90,borderRadius:12,marginBottom:8,objectFit:"contain"}}/>
        <h1 style={{fontFamily:FH,fontSize:28,fontWeight:900,background:"linear-gradient(135deg,#d4af37,#2d7af6)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>PRODE LEYENDAS</h1>
        <p style={{fontFamily:FH,fontSize:18,color:"#d4af37",letterSpacing:5}}>2026</p>
        <p style={{fontSize:11,color:"#6b7a94",marginTop:4}}>Mundial USA · México · Canadá</p>
      </div>
      {vw==="login"?(<div>
        <label style={lb}>Tu teléfono (con código de país)</label>
        <input type="tel" value={lp} onChange={function(e){setLp(e.target.value)}} placeholder="+549..." style={fi}/>
        <label style={{fontSize:10,fontWeight:600,color:"#6b7a94",display:"block",marginBottom:4,marginTop:10}}>Tu PIN</label>
        <input type="password" inputMode="numeric" maxLength={6} value={loginPin} onChange={function(e){setLoginPin(e.target.value.replace(/\D/g,""))}} placeholder="4 dígitos" style={fi} onKeyDown={function(e){if(e.key==="Enter")doLogin()}}/>
        <button onClick={doLogin} style={pb}>Entrar</button>
        <p style={{textAlign:"center",marginTop:14,fontSize:12,color:"#6b7a94"}}>¿Primera vez? <span onClick={function(){setVw("register")}} style={{color:"#2d7af6",cursor:"pointer",fontWeight:700}}>Registrate</span></p>
      </div>):(<div>
        <label style={lb}>Tu nombre</label>
        <input value={rn2} onChange={function(e){setRn2(e.target.value)}} placeholder="Ej: Juan" style={fi}/>
        <label style={{fontSize:10,fontWeight:600,color:"#6b7a94",display:"block",marginBottom:4,marginTop:10}}>Tu teléfono</label>
        <input type="tel" value={rp2} onChange={function(e){setRp2(e.target.value)}} placeholder="+549..." style={fi}/>
        <label style={{fontSize:10,fontWeight:600,color:"#6b7a94",display:"block",marginBottom:4,marginTop:10}}>Elegí un PIN (4 dígitos mínimo)</label>
        <input type="password" inputMode="numeric" maxLength={6} value={regPin} onChange={function(e){setRegPin(e.target.value.replace(/\D/g,""))}} placeholder="Ej: 1234" style={fi}/>
        <button onClick={doReg} style={pb}>Registrarme</button>
        <p style={{textAlign:"center",marginTop:14,fontSize:12,color:"#6b7a94"}}>¿Cuenta? <span onClick={function(){setVw("login")}} style={{color:"#2d7af6",cursor:"pointer",fontWeight:700}}>Entrá</span></p>
      </div>)}
    </div>{toast?<Toast m={toast}/>:null}</div>
  );

  var predCount=Object.keys(myP).length;
  var finCount=finM.length;
  var mySt=stand.find(function(x){return x.id===(me?me.id:null)});

  return(
    <div style={rt}><style>{CSS}</style>
    <header style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",borderBottom:"1px solid #1f2d42",background:"rgba(10,14,23,.96)",position:"sticky",top:0,zIndex:50}}>
      <div style={{display:"flex",alignItems:"center",gap:7}}><img src={LOGO} alt="Leyendas" style={{width:32,height:32,borderRadius:4,objectFit:"contain"}}/><div><div style={{fontFamily:FH,fontSize:16,fontWeight:800,color:"#d4af37",lineHeight:1}}>PRODE LEYENDAS 2026</div><div style={{fontSize:9,color:"#6b7a94"}}>{me?me.name:""}</div></div></div>
      <button onClick={doOut} style={{background:"none",border:"1px solid #1f2d42",color:"#6b7a94",fontSize:10,cursor:"pointer",padding:"3px 10px",borderRadius:5}}>Salir</button>
    </header>
    <nav style={{display:"flex",gap:2,padding:"5px 8px",borderBottom:"1px solid #1f2d42",overflowX:"auto",background:"#0a0e17"}}>
      {[["home","🏠 Inicio"],["pred","🔮 Pronósticos"],["results","📊 Resultados"],["stand","🏆 Tabla"],["bracket","⚽ Cruces"],["rules","📋 Reglas"]].map(function(x){return <button key={x[0]} onClick={function(){setVw(x[0])}} style={{background:vw===x[0]?"#131927":"none",border:"none",color:vw===x[0]?"#d4af37":"#6b7a94",fontSize:11,padding:"7px 9px",cursor:"pointer",borderRadius:6,fontWeight:vw===x[0]?700:400,whiteSpace:"nowrap"}}>{x[1]}</button>})}
    </nav>
    <main style={{padding:"10px 12px 80px",maxWidth:980,margin:"0 auto",width:"100%"}}>

    {vw==="home"?<div>
      <div style={cd}><div style={ct}>🏆 ELEGÍ AL CAMPEÓN</div>
        {canCh?<div>
          {me&&me.champion_pick?<div style={{textAlign:"center",marginBottom:10}}><div style={{fontSize:12,color:"#6b7a94",marginBottom:4}}>Tu elección actual:</div><div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}><span style={{fontSize:22,fontWeight:800,fontFamily:FH,color:"#d4af37"}}>{me.champion_pick}</span></div><div style={{fontSize:9,color:"#6b7a94",marginTop:4}}>Podés cambiarlo hasta el 1° partido</div></div>:null}
          <div style={{fontSize:11,color:"#6b7a94",marginBottom:6}}>+10 pts si acertás. {me&&me.champion_pick?"Cambiá tu elección:":"Elegí antes del 1° partido:"}</div>
          <select value={cp} onChange={function(e){setCp(e.target.value)}} style={fi}><option value="">Seleccioná...</option>{teams.slice().sort(function(a,b){return a.name.localeCompare(b.name)}).map(function(t){return <option key={t.id} value={t.name}>{t.name}</option>})}</select>
          <button onClick={doChamp} style={{width:"100%",padding:"11px",background:cp?"linear-gradient(135deg,#2d7af6,#1d5bbf)":"#1f2d42",border:"none",borderRadius:7,color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",marginTop:12}}>{me&&me.champion_pick?"Cambiar Campeón":"Confirmar Campeón"}</button>
        </div>
        :me&&me.champion_pick?<div style={{textAlign:"center"}}><div style={{fontSize:12,color:"#6b7a94",marginBottom:6}}>Tu elección:</div><div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}><span style={{fontSize:22,fontWeight:800,fontFamily:FH,color:"#d4af37"}}>{me.champion_pick}</span></div><div style={{fontSize:9,color:"#ef4444",marginTop:4}}>🔒 Plazo cerrado</div></div>
        :<div style={{fontSize:11,color:"#6b7a94",textAlign:"center"}}>Plazo terminado - no elegiste campeón</div>}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:7,marginBottom:12}}>
        <div style={cd}><div style={{textAlign:"center"}}><div style={{fontSize:20}}>⚽</div><div style={{fontSize:18,fontWeight:800,fontFamily:FH,color:"#d4af37"}}>{finCount}/{matches.length}</div><div style={{fontSize:9,color:"#6b7a94"}}>Jugados</div></div></div>
        <div style={cd}><div style={{textAlign:"center"}}><div style={{fontSize:20}}>🔮</div><div style={{fontSize:18,fontWeight:800,fontFamily:FH,color:"#d4af37"}}>{predCount}</div><div style={{fontSize:9,color:"#6b7a94"}}>Pronósticos</div></div></div>
        <div style={cd}><div style={{textAlign:"center"}}><div style={{fontSize:20}}>⭐</div><div style={{fontSize:18,fontWeight:800,fontFamily:FH,color:"#d4af37"}}>{mySt?mySt.t:0}</div><div style={{fontSize:9,color:"#6b7a94"}}>Mis puntos</div></div></div>
      </div>
      <div style={cd}><div style={ct}>🏆 CLASIFICACIÓN</div>
        {stand.slice(0,5).map(function(x,i){return <div key={x.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:i<Math.min(4,stand.length-1)?"1px solid #1f2d42":"none"}}><div style={{display:"flex",alignItems:"center",gap:7}}><span style={{fontSize:14,fontWeight:800,fontFamily:FH,color:i===0?"#d4af37":"#6b7a94",width:22}}>{i+1}°</span><span style={{fontSize:12,fontWeight:x.id===(me?me.id:null)?700:400,color:x.id===(me?me.id:null)?"#2d7af6":"#e8ecf4"}}>{x.name}</span></div><span style={{fontSize:14,fontWeight:800,fontFamily:FH,color:"#d4af37"}}>{x.t}</span></div>})}
      </div>
      <div style={cd}><div style={ct}>📅 PRÓXIMOS SIN PRONÓSTICO</div>
        {matches.filter(function(m){return !isPast(m.kickoff_at)&&!myP[m.id]}).sort(function(a,b){return new Date(a.kickoff_at)-new Date(b.kickoff_at)}).slice(0,4).map(function(m){return renderMatch(m,true)})}
        {matches.filter(function(m){return !isPast(m.kickoff_at)&&!myP[m.id]}).length===0?<p style={{fontSize:11,color:"#4ade80",textAlign:"center"}}>¡Todos pronosticados!</p>:null}
      </div>
    </div>:null}

    {vw==="pred"?<div>
      <div style={{fontFamily:FH,fontSize:18,fontWeight:800,margin:"14px 0 10px"}}>🔮 Pronósticos</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:3,marginBottom:12}}>
        <button onClick={function(){setSg("all")}} style={sg==="all"?cpA:cpN}>Todos</button>
        {GROUPS.map(function(g){return <button key={g} onClick={function(){setSg(g)}} style={sg===g?cpA:cpN}>{g}</button>})}
      </div>
      {(sg==="all"?GROUPS:GROUPS.filter(function(g){return g===sg})).map(function(g){return <div key={g} style={{marginBottom:18}}>
        <div style={{fontFamily:FH,fontSize:13,fontWeight:800,color:"#d4af37",marginBottom:7,borderBottom:"2px solid #d4af37",paddingBottom:4,display:"flex",justifyContent:"space-between",alignItems:"center"}}><span>GRUPO {g}</span><div style={{display:"flex",gap:4}}>{teams.filter(function(t){return t.group_id===g}).map(function(t){return <Fl key={t.id} t={t} size={18}/>})}</div></div>
        {(gm[g]||[]).map(function(m){return renderMatch(m,true)})}
      </div>})}
    </div>:null}

    {vw==="results"?<div>
      <div style={{fontFamily:FH,fontSize:18,fontWeight:800,margin:"14px 0 10px"}}>📊 Resultados</div>
      {finM.length===0?<div style={{background:"#131927",borderRadius:10,padding:30,border:"1px solid #1f2d42",textAlign:"center"}}><div style={{fontSize:40,marginBottom:10}}>📺</div><div style={{color:"#6b7a94",fontSize:13}}>Aún no hay partidos finalizados.</div><div style={{color:"#4a5568",fontSize:11,marginTop:6}}>Los resultados se cargan en vivo durante el mundial.</div></div>:finM.map(function(m){return renderResult(m)})}
      <div style={{background:"#131927",borderRadius:10,padding:10,marginTop:8,border:"1px solid #1f2d42"}}><div style={{fontSize:10,color:"#6b7a94",textAlign:"center"}}>🔍 Tocá la lupa para ver pronósticos y puntos de todos</div></div>
    </div>:null}

    {vw==="stand"?<div>
      <div style={{fontFamily:FH,fontSize:18,fontWeight:800,margin:"14px 0 10px"}}>🏆 Tabla de Posiciones</div>
      <div style={{background:"#131927",borderRadius:10,border:"1px solid #1f2d42",overflow:"hidden"}}>
        <div style={{display:"grid",gridTemplateColumns:"28px 1fr 44px 34px 34px 34px",padding:"7px 8px",background:"#1a2235",fontWeight:700,fontSize:9,color:"#6b7a94",gap:3}}><span>#</span><span>Jugador</span><span style={{textAlign:"center"}}>PTS</span><span style={{textAlign:"center"}}>RES</span><span style={{textAlign:"center"}}>EXA</span><span style={{textAlign:"center"}}>GOL</span></div>
        {stand.map(function(x,i){return <div key={x.id} style={{display:"grid",gridTemplateColumns:"28px 1fr 44px 34px 34px 34px",padding:"7px 8px",borderBottom:"1px solid #1f2d42",background:x.id===(me?me.id:null)?"rgba(212,175,55,.06)":"transparent",gap:3}}>
          <span style={{fontWeight:800,fontFamily:FH,color:i<3?"#d4af37":"#6b7a94",fontSize:13}}>{i+1}</span>
          <div style={{display:"flex",alignItems:"center",gap:4,overflow:"hidden"}}><span style={{fontSize:12,fontWeight:x.id===(me?me.id:null)?700:400,color:x.id===(me?me.id:null)?"#2d7af6":"#e8ecf4"}}>{x.name}</span>{x.champion_pick?<span style={{fontSize:8,color:"#6b7a94"}}>🏆</span>:null}</div>
          <span style={{textAlign:"center",fontWeight:800,fontFamily:FH,fontSize:15,color:"#d4af37"}}>{x.t}</span><span style={{textAlign:"center",fontSize:11,color:"#2d7af6"}}>{x.r}</span><span style={{textAlign:"center",fontSize:11,color:"#d4af37"}}>{x.e}</span><span style={{textAlign:"center",fontSize:11,color:"#6b7a94"}}>{x.g}</span>
        </div>})}
      </div>
      <div style={{marginTop:8,padding:"6px 10px",background:"#131927",borderRadius:6,fontSize:9,color:"#6b7a94"}}>PTS=Puntos · RES=Resultados · EXA=Exactos · GOL=Gol parcial</div>
    </div>:null}

    {vw==="bracket"?<div>
      <div style={{fontFamily:FH,fontSize:18,fontWeight:800,margin:"14px 0 10px"}}>⚽ Cruces</div>
      <KnockoutBracket matches={knockoutMatches} teams={teams}/>
    </div>:null}

    {vw==="rules"?<div>
      <div style={{fontFamily:FH,fontSize:18,fontWeight:800,margin:"14px 0 10px"}}>📋 Reglas</div>
      <div style={cd}><div style={ct}>PUNTOS</div>
        <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:8}}><span style={{background:"#2d7af6",color:"#fff",fontWeight:800,fontFamily:FH,fontSize:14,minWidth:40,textAlign:"center",padding:"2px 5px",borderRadius:5}}>+2</span><span style={{fontSize:12,flex:1}}>Acertar resultado</span></div>
        <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:8}}><span style={{background:"#d4af37",color:"#000",fontWeight:800,fontFamily:FH,fontSize:14,minWidth:40,textAlign:"center",padding:"2px 5px",borderRadius:5}}>+3</span><span style={{fontSize:12,flex:1}}>Bonus exacto (ambos goles)</span></div>
        <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:8}}><span style={{background:"#4a5568",color:"#fff",fontWeight:800,fontFamily:FH,fontSize:14,minWidth:40,textAlign:"center",padding:"2px 5px",borderRadius:5}}>+1</span><span style={{fontSize:12,flex:1}}>Goles de un equipo (sin exacto)</span></div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}><span style={{background:"#d4af37",color:"#000",fontWeight:800,fontFamily:FH,fontSize:14,minWidth:40,textAlign:"center",padding:"2px 5px",borderRadius:5}}>+10</span><span style={{fontSize:12,flex:1}}>Acertar campeón</span></div>
      </div>
      <div style={cd}><div style={ct}>EJEMPLO</div>
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10,padding:"6px 10px",background:"#1a2235",borderRadius:8}}><span style={{fontWeight:700}}>Argentina 2 - 1 Argelia</span></div>
        <div style={{fontSize:11,color:"#6b7a94",lineHeight:1.8}}>✅ <strong style={{color:"#e8ecf4"}}>2-1</strong> = <strong style={{color:"#d4af37"}}>5 pts</strong> · ✅ <strong style={{color:"#e8ecf4"}}>3-0</strong> = <strong style={{color:"#2d7af6"}}>2 pts</strong> · ✅ <strong style={{color:"#e8ecf4"}}>2-0</strong> = <strong style={{color:"#2d7af6"}}>3 pts</strong> · ❌ <strong style={{color:"#e8ecf4"}}>1-1</strong> = 1 pt · ❌ <strong style={{color:"#e8ecf4"}}>0-2</strong> = 0</div>
      </div>
      <div style={cd}><div style={ct}>PLAZOS</div>
        <div style={{fontSize:11,color:"#6b7a94",lineHeight:1.8}}>🏆 Campeón: hasta inicio 1° partido<br/>⚽ Pronósticos: hasta inicio de cada partido (hora ARG)<br/>🔓 Eliminatorias: se habilitan al terminar la fase previa</div>
      </div>
    </div>:null}

    </main>
    {toast?<Toast m={toast}/>:null}
    </div>
  );
}

var CSS='@import url("https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700;800&family=Source+Sans+3:wght@300;400;600;700&display=swap");*{box-sizing:border-box;margin:0;padding:0}body{background:#0a0e17;color:#e8ecf4;font-family:"Source Sans 3",sans-serif}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none}input[type=number]{-moz-appearance:textfield}';
var rt={minHeight:"100vh",background:"#0a0e17",color:"#e8ecf4",fontFamily:"'Source Sans 3',sans-serif"};
var cd={background:"#131927",borderRadius:10,padding:14,marginBottom:10,border:"1px solid #1f2d42"};
var ct={fontFamily:"'Oswald',sans-serif",fontSize:12,fontWeight:700,color:"#d4af37",marginBottom:10,textTransform:"uppercase",letterSpacing:.8};
var lb={fontSize:10,fontWeight:600,color:"#6b7a94",display:"block",marginBottom:4};
var fi={width:"100%",padding:"10px 11px",background:"#131927",border:"1px solid #1f2d42",borderRadius:7,color:"#e8ecf4",fontSize:13,outline:"none"};
var pb={width:"100%",padding:"11px",background:"linear-gradient(135deg,#2d7af6,#1d5bbf)",border:"none",borderRadius:7,color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",marginTop:12};
var ni={width:36,height:32,textAlign:"center",fontSize:15,fontWeight:700,background:"#0a0e17",border:"2px solid #1f2d42",borderRadius:5,color:"#e8ecf4",fontFamily:"'Oswald',sans-serif",outline:"none"};
var cpN={background:"#131927",border:"1px solid #1f2d42",color:"#6b7a94",padding:"4px 9px",borderRadius:5,fontSize:10,fontWeight:600,cursor:"pointer",fontFamily:"'Oswald',sans-serif"};
var cpA={background:"#d4af37",color:"#000",borderColor:"#d4af37",padding:"4px 9px",borderRadius:5,fontSize:10,fontWeight:600,cursor:"pointer",fontFamily:"'Oswald',sans-serif",border:"1px solid #d4af37"};
