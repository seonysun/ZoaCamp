import {useState, useEffect} from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";

function CampList(){
    const [campList, setCampList] = useState([])
    const [curpage, setCurpage] = useState(1)
    const [totalpage, setTotalpage] = useState(0)
    const [startpage, setStartpage] = useState(0)
    const [endpage, setEndpage] = useState(0)

    useEffect(()=>{
        axios.get('http://localhost/camping/list_react',{
            params:{
                page:curpage
            }
        }).then(response=>{
            console.log(response.data)
            setCampList(response.data)
        })
    },[])
    useEffect(()=>{
        axios.get('http://localhost/camping/camping_page_react',{
            params:{
                page:curpage
            }
        }).then(response=>{
            console.log(response.data)
            setCurpage(response.data.curpage)
            setTotalpage(response.data.totalpage)
            setStartpage(response.data.startpage)
            setEndpage(response.data.endpage)
        })
    },[])

    const pageChange=(page)=>{
        axios.get('http://localhost/camping/list_react',{
            params:{
                page:page
            }
        }).then(response=>{
            console.log(response.data)
            setCampList(response.data)
        })
        axios.get('http://localhost/camping/camping_page_react',{
            params:{
                page:page
            }
        }).then(response=>{
            console.log(response.data)
            setCurpage(response.data.curpage)
            setTotalpage(response.data.totalpage)
            setStartpage(response.data.startpage)
            setEndpage(response.data.endpage)
        })
    }

    let html = campList.map((camp, index)=>
        <li className="one_third">
            <article><NavLink to={"/camp/camp_detail/"+camp.cno}><img src={camp.image} style={{"width":"100%","height":"250px"}} /></NavLink>
                <h6 className="heading">{camp.name}</h6>
                <p>{camp.address}</p>
            </article>
        </li>
    )

    let row = []
    if(startpage>1){
        row.push(<li><a href="#" onClick={()=>pageChange(startpage-1)}>&laquo; Previous</a></li>)
    }
    for(let i=startpage;i<=endpage;i++){
        if(i==curpage){
            row.push(<li className={"current"}><strong>{i}</strong></li>)
        }else{
            row.push(<li><a href="#" onClick={()=>pageChange(i)}>{i}</a></li>)
        }
    }
    if(endpage<totalpage){
        row.push(<li><a href="#" onClick={()=>pageChange(endpage+1)}>Next &raquo;</a></li>)
    }

    //쿠키 가져오기
    let cookie=document.cookie.split(";")
    let cc=[]
    for(let i=cookie.length-1;i>=cookie.length-8;i--)
    {
        let a=cookie[i]
        let b=a.substring(a.indexOf("=")+1)
        cc.push(b.trim())
    }
    let cook=cc.map((mm, index)=>
        <li className={index%4==0?'one_quarter first':'one_quarter'}>
            <img src={mm} style={{"height":"200px","width":"300px"}}/>
        </li>
    )

    return(
        <div className="wrapper row3">
            <main className="hoc container clear">
                <div className="sectiontitle">
                    <h6 className="heading font-x2">캠핑장 찾기</h6>
                </div>
                <ul class="nospace group elements elements-three">
                    {html}
                </ul>
                <div style={{"height":"50px"}}></div>
                <nav className="pagination">
                    <ul>
                        {row}
                    </ul>
                </nav>
                <div style={{"height":"50px"}}></div>
                <div className="content">
                    <div id="gallery">
                        <figure>
                            <header className="heading">최근 본 항목</header>
                            <ul className="nospace clear">
                                {cook}
                            </ul>
                        </figure>
                    </div>
                </div>
                <div className="clear"></div>
            </main>
        </div>
    )
}
export default CampList;