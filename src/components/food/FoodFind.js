import {useEffect, useState} from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";

function FoodFind(){
    const [ss, setSs] = useState('제주')
    const [fdata, setFdata] = useState([])
    const [curpage, setCurpage] = useState(1)
    const [totalpage, setTotalpage] = useState(0)

    useEffect(()=>{
        axios.get('http://localhost/jeju/food_find_react',{
            params:{
                page:curpage,
                title:ss
            }
        }).then(response=>{
            console.log(response.data)
            setFdata(response.data)
            setCurpage(response.data[0].curpage)
            setTotalpage(response.data[0].totalpage)
        })
    },[])

    const dataChange=(e)=>{
        setSs(e.target.value)
    }
    const dataKeyDown=(e)=>{
        setCurpage(1)
        if(e.keyCode==13){
            axios.get("http://localhost/jeju/food_find_react",{
                params:{
                    page:curpage,
                    title:ss
                }
            }).then(response=>{
                console.log(response.data)
                setFdata(response.data)
                setCurpage(response.data[0].curpage)
                setTotalpage(response.data[0].totalpage)
            })
        }
    }
    const findData=()=>{
        setCurpage(1)
        axios.get('http://localhost/jeju/food_find_react',{
            params:{
                page:curpage,
                title:ss
            }
        }).then(response=>{
            console.log(response.data)
            setFdata(response.data)
            setCurpage(response.data[0].curpage)
            setTotalpage(response.data[0].totalpage)
        })
    }
    const prev=()=>{
        const page = curpage>1?curpage-1:curpage
        setCurpage(page)
        axios.get("http://localhost/jeju/food_find_react",{
            params:{
                page:page,
                title:ss
            }
        }).then(response=>{
            console.log(response.data)
            setFdata(response.data)
        })
    }
    const next=()=>{
        const page = curpage<totalpage?curpage+1:curpage
        setCurpage(page)
        axios.get("http://localhost/jeju/food_find_react",{
            params:{
                page:page,
                title:ss
            }
        }).then(response=>{
            console.log(response.data)
            setFdata(response.data)
        })
    }

    let html = fdata.map((food, index)=>
        <li className="one_third">
            <article><NavLink to={"/jeju/food_detail/"+food.no}><img src={food.poster} style={{"width":"100%","height":"250px"}} /></NavLink>
                <h6 className="heading">{food.type}</h6>
            </article>
        </li>
    )

    return(
        <div className="wrapper row3">
            <main className="hoc container clear">
                <div className="content">
                    <div className="sectiontitle">
                        <h6 className="heading font-x2">맛집 검색</h6>
                    </div>
                    <div className={"inline"} style={{"height":"80px"}}>
                        <input type={"text"} size={"30"} className={"input-sm"} style={{"height":"40px"}}
                               onChange={dataChange} value={ss} onKeyDown={dataKeyDown} />
                        <input type={"button"} value="검색" className={"btn btn-sm btn-primary"}
                               onClick={findData} />
                    </div>
                    <ul className="nospace group elements elements-three">
                        {html}
                    </ul>
                    <div style={{"height":"50px"}}></div>
                    <div className={"text-center"}>
                        <button className={"btn btn-sm btn-primary"} onClick={prev}>이전</button> &nbsp;
                        {curpage} page / {totalpage} pages
                        &nbsp; <button className={"btn btn-sm btn-primary"} onClick={next}>다음</button>
                    </div>
                </div>
                <div className="clear"></div>
            </main>
        </div>
    )
}
export default FoodFind;