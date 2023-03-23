import {useState, useEffect} from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";

function EventList(){
    const pageChange=(page)=>{
        axios.get('http://localhost/jeju/location_list_react',{
            params:{
                page:page
            }
        }).then(response=>{
            console.log(response.data)
            setLocationList(response.data)
        })
        axios.get('http://localhost/jeju/location_page_react',{
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

    const [locationList, setLocationList] = useState([])
    const [curpage, setCurpage] = useState(1)
    const [totalpage, setTotalpage] = useState(0)
    const [startpage, setStartpage] = useState(0)
    const [endpage, setEndpage] = useState(0)
    useEffect(()=>{
        axios.get('http://localhost/jeju/location_list_react',{
            params:{
                page:curpage
            }
        }).then(response=>{
            console.log(response.data)
            setLocationList(response.data)
        })
    },[])
    useEffect(()=>{
        axios.get('http://localhost/jeju/location_page_react',{
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

    let html = locationList.map((location, index)=>
        <li className={index%4==0?'one_quarter first':'one_quarter'}>
            <NavLink to={"/jeju/event_detail/"+location.no}><img src={location.poster} title={location.title}/></NavLink>
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

    return(
        <div className="wrapper row3">
            <main className="hoc container clear">
                <div className="content">
                    <div id="gallery">
                        <figure>
                            <header className="heading">제주 이벤트 & 관광</header>
                            <ul className="nospace clear">
                                {html}
                            </ul>
                        </figure>
                    </div>
                    <nav className="pagination">
                        <ul>
                            {row}
                        </ul>
                    </nav>
                </div>
                <div className="clear"></div>
            </main>
        </div>
    )
}
export default EventList;