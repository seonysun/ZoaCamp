import {useEffect, useState} from "react";
import axios from "axios";

function NewsList(){
    const [newsList, setNewsList] = useState([])
    const [title, setTitle] = useState('제주')

    useEffect(()=>{
        axios.get('http://localhost/news/news_list_react',{
            params:{
                title:title
            }
        }).then(response=>{
            console.log(response.data)
            setNewsList(response.data)
        })
    },[])

    const dataChange=(e)=>{
        setTitle(e.target.value)
    }
    const dataKeyDown=(e)=>{
        if(e.keyCode==13) {
            axios.get("http://localhost/news/news_list_react", {
                params: {
                    title: title
                }
            }).then(response => {
                console.log(response.data)
                setNewsList(response.data)
            })
        }
    }
    const findData=()=>{
        axios.get('http://localhost/news/news_list_react',{
            params:{
                title:title
            }
        }).then(response=>{
            console.log(response.data)
            setNewsList(response.data)
        })
    }

    let html = newsList.map((news)=>
        <table className={"table"}>
            <tr>
                <td><a href={news.link} target={"_blank"} ><h3 style={{"color":"orange"}} dangerouslySetInnerHTML={{__html:news.title}}></h3></a></td>
                                        {/*새창*/}
            </tr>
            <tr>
                <td dangerouslySetInnerHTML={{__html:news.description}}></td>
            </tr>
            <tr>
                <td className={"text-right"}>{news.pubDate}</td>
            </tr>
        </table>
    )

    return(
        <div className="wrapper row3">
            <main className="hoc container clear">
                <div className="content">
                    <div id="gallery">
                        <figure>
                            <header className="heading inline">
                                <input type={"text"} size={"30"} className={"input-sm"}
                                       onChange={dataChange} value={title} onKeyDown={dataKeyDown} />
                                <input type={"button"} value="검색" className={"btn btn-sm btn-primary"}
                                       onClick={findData} />
                            </header>
                        </figure>
                        <table className={"table"}>
                            <tbody>
                            <tr>
                                <td>
                                    {html}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}
export default NewsList;